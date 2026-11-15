// A few streaks of air carried along the isobars: always something moving on the first screen,
// but sparse and faint enough that the chart's text stays easy to read.

import { windAt, type Grid } from "./isobars";

type Point = { x: number; y: number };

/** One parcel of air: where it is, where it was a frame ago, and how far through its life it is. */
type Parcel = { x: number; y: number; px: number; py: number; age: number; life: number; speed: number };

/** Parcels per square pixel of field: about a dozen on a laptop screen, four on a phone. */
const DENSITY = 1 / 95000;
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
    trail.lineWidth = 1.4;
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
      const alpha = 0.6 * Math.min(1, t * 5, (1 - t) * 5);
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
    const life = 4 + this.random() * 4;
    return {
      x,
      y,
      px: x,
      py: y,
      // Scatter the first set through their lives, so they do not all fade in together on load.
      age: scattered ? this.random() * life : 0,
      life,
      // In --u per second, so the air crosses the frame in the same time on any screen.
      speed: 3.5 + this.random() * 2.5,
    };
  }

  private random() {
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  }
}
