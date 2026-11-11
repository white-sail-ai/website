"use client";

import { useEffect, useRef } from "react";
import { arrivalTime, type RippleLink } from "@/lib/ripple";
import { drawFront, drawPulse, layoutFronts, type Front, type Inks, type Station } from "./fronts";
import { drawField, fieldWarp } from "./isobars";

/** The leader line from a step marker down to its station, and when it appears. */
type Stem = { x: number; top: number; bottom: number; ink: string; at: number };

/** A padded box around a line of chart text, cleared at the text's current opacity. */
type Knockout = { x: number; y: number; w: number; h: number; alpha: number };

const NAVY = "26 50 99";
const PAPER = "251 248 241";
// Brand gold and navy mixed 30% towards the paper, so the fronts sit back behind the title block.
const INKS: Inks = { gold: "250 204 136", navy: "94 109 142", paper: PAPER };
const PULSE_EVERY = 9;
const FIELD_REFRESH = 0.2;

type Props = { links: RippleLink[]; className?: string };

/**
 * The chart's moving layer: isobars that drift, and the ripple's fronts drawn between the stations
 * rendered as HTML around it (any element in the same parent with a data-station id).
 */
export function ChartCanvas({ links, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas?.parentElement) return;
    const chart = new Chart(canvas, links, matchMedia("(prefers-reduced-motion: reduce)").matches);
    return chart.start(canvas.parentElement);
  }, [links]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

class Chart {
  private field = document.createElement("canvas");
  private width = 0;
  private height = 0;
  private dpr = 1;
  private unit = 12.8;
  private fronts: Front[] = [];
  private stems: Stem[] = [];
  private knockouts: Knockout[] = [];
  private warp = new Float32Array(0);
  private fieldDrawnAt = -Infinity;
  private born = performance.now();
  private settle: number;

  constructor(
    private canvas: HTMLCanvasElement,
    private links: RippleLink[],
    private still: boolean,
  ) {
    this.settle = Math.max(...links.map((link) => link.start + link.duration)) + 1.5;
  }

  /** Size to the parent, draw, and keep drawing while on screen. Returns the cleanup. */
  start(parent: HTMLElement) {
    let frame = 0;
    let onScreen = true;
    const loop = (now: number) => {
      this.render((now - this.born) / 1000);
      frame = onScreen && !this.still ? requestAnimationFrame(loop) : 0;
    };
    const resize = () => {
      this.resize();
      this.fieldDrawnAt = -Infinity;
      if (!frame) this.render((performance.now() - this.born) / 1000);
    };
    const sizer = new ResizeObserver(resize);
    sizer.observe(parent);
    const watcher = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen && !frame && !this.still) frame = requestAnimationFrame(loop);
    });
    watcher.observe(this.canvas);
    document.fonts?.ready.then(resize);
    resize();
    if (!this.still) frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      sizer.disconnect();
      watcher.disconnect();
    };
  }

  private resize() {
    const box = this.canvas.getBoundingClientRect();
    this.width = box.width;
    this.height = box.height;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.unit = Math.max(9, Math.min(window.innerWidth / 100, (window.innerHeight * 16) / 900));
    for (const target of [this.canvas, this.field]) {
      target.width = Math.round(box.width * this.dpr);
      target.height = Math.round(box.height * this.dpr);
    }
    const stations = new Map<string, Station>();
    this.canvas.parentElement?.querySelectorAll<HTMLElement>("[data-station]").forEach((element) => {
      const rect = element.getBoundingClientRect();
      stations.set(element.dataset.station!, {
        x: rect.left + rect.width / 2 - box.left,
        y: rect.top + rect.height / 2 - box.top,
        r: rect.width / 2,
      });
    });
    this.fronts = layoutFronts(this.links, stations, this.unit);
    this.stems = this.measureStems(stations, box);
    const bodies = this.fronts.flatMap((front) => front.bodies);
    this.warp = fieldWarp(box.width, box.height, bodies, [...stations.values()], this.unit);
  }

  private measureStems(stations: Map<string, Station>, box: DOMRect) {
    const markers = this.canvas.parentElement?.querySelectorAll<HTMLElement>("[data-marker]") ?? [];
    return [...markers].flatMap((marker) => {
      const id = marker.dataset.marker!;
      const station = stations.get(id);
      if (!station) return [];
      const counter = marker.closest<HTMLElement>("[data-tone]")?.dataset.tone === "counter";
      return [
        {
          x: station.x,
          top: marker.getBoundingClientRect().bottom - box.top,
          bottom: station.y - station.r,
          ink: counter ? INKS.navy : INKS.gold,
          at: arrivalTime(this.links, id),
        },
      ];
    });
  }

  private drawStems(ctx: CanvasRenderingContext2D, elapsed: number) {
    ctx.lineWidth = 1.5;
    for (const stem of this.stems) {
      if (!this.still && elapsed < stem.at) continue;
      ctx.strokeStyle = `rgb(${stem.ink})`;
      ctx.beginPath();
      ctx.moveTo(stem.x, stem.top);
      ctx.lineTo(stem.x, stem.bottom);
      ctx.stroke();
    }
  }

  private render(elapsed: number) {
    const ctx = this.canvas.getContext("2d");
    if (!ctx || !this.width) return;
    if (elapsed - this.fieldDrawnAt > FIELD_REFRESH) this.drawGround(elapsed);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(this.field, 0, 0);
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.drawStems(ctx, elapsed);
    for (const front of this.fronts) {
      const { start, duration } = front.link;
      const progress = this.still ? 1 : easeInOut(clamp((elapsed - start) / duration));
      drawFront(ctx, front, progress, INKS, this.unit);
    }
    if (!this.still && elapsed >= this.settle) this.drawPulses(ctx, elapsed);
    this.clearUnderText(ctx);
  }

  private drawPulses(ctx: CanvasRenderingContext2D, elapsed: number) {
    const clock = (elapsed - this.settle) % PULSE_EVERY;
    const first = Math.min(...this.links.map((link) => link.start));
    for (const front of this.fronts) {
      const { start, duration } = front.link;
      drawPulse(ctx, front, (clock - (start - first)) / duration, INKS);
    }
  }

  // No line, gold or navy, may run under chart text: erase everything behind it.
  private clearUnderText(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    for (const { x, y, w, h, alpha } of this.knockouts) {
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, this.unit * 0.5);
      ctx.fill();
    }
    ctx.restore();
  }

  private drawGround(elapsed: number) {
    const ctx = this.field.getContext("2d");
    if (!ctx) return;
    this.fieldDrawnAt = elapsed;
    this.knockouts = measureText(this.canvas, this.unit);
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    drawField(ctx, this.width, this.height, {
      time: this.still ? 0 : elapsed,
      ink: NAVY,
      paper: PAPER,
      font: getComputedStyle(this.canvas).fontFamily,
      warp: this.warp,
      clear: this.fronts.flatMap((front) => front.bands),
    });
  }
}

/**
 * Measure every line of chart text beside the canvas (elements marked data-knockout) as padded
 * boxes in canvas pixels. A data-knockout="box" element is cleared whole, rules and all.
 *
 * @param canvas - The chart canvas; its parent holds the text.
 * @param unit - The frame's --u in pixels, which sets the padding.
 * @returns One box per line of text, carrying the text's current opacity as it fades in.
 */
function measureText(canvas: HTMLCanvasElement, unit: number): Knockout[] {
  const box = canvas.getBoundingClientRect();
  const range = document.createRange();
  const padX = unit * 0.7;
  const padY = unit * 0.35;
  const elements = canvas.parentElement?.querySelectorAll<HTMLElement>("[data-knockout]") ?? [];
  return [...elements].flatMap((element) => {
    const alpha = Number(getComputedStyle(element).opacity);
    if (!alpha) return [];
    const rects = element.dataset.knockout === "box" ? [element.getBoundingClientRect()] : textLines(element, range);
    return rects.map((rect) => ({
      x: rect.left - box.left - padX,
      y: rect.top - box.top - padY,
      w: rect.width + padX * 2,
      h: rect.height + padY * 2,
      alpha,
    }));
  });
}

/** The client rects of each line of text inside an element, tight to the words. */
function textLines(element: HTMLElement, range: Range) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const rects: DOMRect[] = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!node.textContent?.trim()) continue;
    range.selectNodeContents(node);
    rects.push(...range.getClientRects());
  }
  return rects;
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
