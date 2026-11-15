// The chart's always-moving layer: short streaks of air carried along the isobars, and gold glints
// that keep running along the ripple's fronts once they have drawn on. Both are faint enough to sit
// behind the chart's text and stations, but there is always something moving on the first screen.

import { drawPulse, type Front, type Inks } from "./fronts";
import { windAt, type Grid } from "./isobars";

type Point = { x: number; y: number };

/** One parcel of air: where it is, where it was a frame ago, and how far through its life it is. */
type Parcel = { x: number; y: number; px: number; py: number; age: number; life: number; speed: number };

/** Parcels per square pixel of field: about 110 on a laptop screen, 30 on a phone. */
const DENSITY = 1 / 11000;
/** How much of last frame's trail survives each sixtieth of a second, so streaks fade as they go. */
const TRAIL_KEEP = 0.955;

export class Wind {
  private trail = document.createElement("canvas");
  private parcels: Parcel[] = [];
  private width = 0;
  private height = 0;
  private dpr = 1;
  private seed = 7;

  /** Size the trail layer to the field and scatter a fresh set of parcels over it. */
  resize(width: number, height: number, dpr: number) {
    this.width = width;
    this.height = height;
    this.dpr = dpr;
    this.trail.width = Math.round(width * dpr);
    this.trail.height = Math.round(height * dpr);
    const count = Math.round(width * height * DENSITY);
    this.parcels = Array.from({ length: count }, () => this.spawn(true));
  }

  /**
   * Move every parcel on along the wind, add the step to the fading trail, and lay the trail over
   * the chart.
   *
   * @param ctx - The chart's context, already scaled to CSS pixels.
   * @param grid - The current pressure grid, which sets the wind.
   * @param dt - Seconds since the last frame.
   * @param ink - The streaks' ink, as an "r g b" triple.
   * @param unit - The frame's --u in pixels, which sets how fast the air moves.
   * @param clear - Outlines (the fronts' bands) the streaks stay out of.
   */
  draw(ctx: CanvasRenderingContext2D, grid: Grid, dt: number, ink: string, unit: number, clear: Point[][]) {
    const trail = this.trail.getContext("2d");
    if (!trail || !this.parcels.length) return;
    const step = Math.min(dt, 1 / 20);

    trail.setTransform(1, 0, 0, 1, 0, 0);
    trail.globalCompositeOperation = "destination-out";
    trail.fillStyle = `rgb(0 0 0 / ${1 - Math.pow(TRAIL_KEEP, step * 60)})`;
    trail.fillRect(0, 0, this.trail.width, this.trail.height);
    trail.globalCompositeOperation = "source-over";
    trail.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    trail.lineWidth = 1.6;
    trail.lineCap = "round";

    for (const parcel of this.parcels) {
      const wind = windAt(grid, parcel.x, parcel.y);
      const length = Math.hypot(wind.x, wind.y) || 1;
      const pace = parcel.speed * unit * step;
      parcel.px = parcel.x;
      parcel.py = parcel.y;
      parcel.x += (wind.x / length) * pace;
      parcel.y += (wind.y / length) * pace;
      parcel.age += step;
      const out = parcel.x < 0 || parcel.y < 0 || parcel.x > this.width || parcel.y > this.height;
      if (out || parcel.age > parcel.life) {
        Object.assign(parcel, this.spawn(false));
        continue;
      }
      // Fade in and out over the first and last fifth of a life, so no streak pops.
      const t = parcel.age / parcel.life;
      const alpha = 0.75 * Math.min(1, t * 5, (1 - t) * 5);
      trail.strokeStyle = `rgb(${ink} / ${alpha})`;
      trail.beginPath();
      trail.moveTo(parcel.px, parcel.py);
      trail.lineTo(parcel.x, parcel.y);
      trail.stroke();
    }

    if (clear.length) {
      trail.globalCompositeOperation = "destination-out";
      trail.beginPath();
      for (const outline of clear) {
        outline.forEach((p, k) => trail[k === 0 ? "moveTo" : "lineTo"](p.x, p.y));
        trail.closePath();
      }
      trail.fill();
      trail.globalCompositeOperation = "source-over";
    }

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(this.trail, 0, 0);
    ctx.restore();
  }

  private spawn(scattered: boolean): Parcel {
    const x = this.random() * this.width;
    const y = this.random() * this.height;
    const life = 2.5 + this.random() * 4;
    return {
      x,
      y,
      px: x,
      py: y,
      // Scatter the first set through their lives, so they do not all fade in together on load.
      age: scattered ? this.random() * life : 0,
      life,
      // In --u per second, so the air crosses the frame in the same time on any screen.
      speed: 5 + this.random() * 4,
    };
  }

  private random() {
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  }
}

/**
 * Keep gold running along a front after it has drawn on: a few bright glints sliding down each
 * strand at their own pace, or, on a solid mass, a ring of paper rippling out through it.
 *
 * @param time - Seconds since the front finished drawing on.
 */
export function drawFlow(ctx: CanvasRenderingContext2D, front: Front, time: number, inks: Inks) {
  if (front.mass) {
    // The mass already carries rings; send one more rippling through it every few seconds.
    drawPulse(ctx, front, (time * 0.3) % 1, inks);
    return;
  }
  const counter = front.link.tone === "counter";
  const ink = counter ? inks.navy : "250 185 91";
  const strands = front.strands;
  ctx.lineCap = "round";
  strands.forEach((strand, i) => {
    // Every strand carries two glints, offset by the golden ratio so they never line up in a row.
    const pace = counter ? 0.32 : 0.42 + 0.06 * Math.sin(i * 2.1);
    for (let glint = 0; glint < 2; glint++) {
      const phase = (time * pace + i * 0.618 + glint * 0.5) % 1;
      const fade = Math.min(1, phase * 6, (1 - phase) * 6);
      ctx.strokeStyle = `rgb(${ink} / ${0.95 * fade})`;
      ctx.lineWidth = counter ? 4 : 2.4;
      strokeSpan(ctx, strand, phase - (counter ? 0.05 : 0.09), phase);
    }
  });
  ctx.lineCap = "butt";
}

/** Stroke the stretch of a polyline between two fractions of its length. */
function strokeSpan(ctx: CanvasRenderingContext2D, points: Point[], from: number, to: number) {
  const last = points.length - 1;
  const a = Math.max(0, from) * last;
  const b = Math.min(1, to) * last;
  if (b <= a) return;
  const at = (s: number) => {
    const k = Math.min(last - 1, Math.floor(s));
    const f = s - k;
    return { x: points[k].x + (points[k + 1].x - points[k].x) * f, y: points[k].y + (points[k + 1].y - points[k].y) * f };
  };
  const start = at(a);
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  for (let k = Math.ceil(a); k < b; k++) ctx.lineTo(points[k].x, points[k].y);
  const end = at(b);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}
