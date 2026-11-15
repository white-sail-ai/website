"use client";

import { useEffect, useRef } from "react";
import { drawField } from "../chart/isobars";

type Props = {
  /** Isobar ink and the paper under it, as "r g b" triples. */
  ink: string;
  paper: string;
  /** Where in the field's slow drift to take the picture, so each stretch of paper differs. */
  moment?: number;
  className?: string;
};

/**
 * The hero chart's isobars carried on below it as still chart paper, drawn once per size. It does
 * not move on its own; the stylesheet may drift it slowly with the scroll.
 */
export function ChartPaper({ ink, paper, moment = 0, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const draw = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(box.width * dpr);
      canvas.height = Math.round(box.height * dpr);
      const ctx = canvas.getContext("2d");
      if (!ctx || !box.width) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawField(ctx, box.width, box.height, {
        time: moment,
        ink,
        paper,
        font: getComputedStyle(canvas).fontFamily,
      });
    };
    let width = 0;
    const sizer = new ResizeObserver(([entry]) => {
      // Phones resize on every scroll as the toolbar slides; only a change of width needs a redraw.
      if (Math.abs(entry.contentRect.width - width) < 1 && width) return;
      width = entry.contentRect.width;
      draw();
    });
    sizer.observe(canvas);
    return () => sizer.disconnect();
  }, [ink, paper, moment]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
