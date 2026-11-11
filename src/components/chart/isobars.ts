// The chart's ground: a pressure field drawn as isobars, a few pressure readings, and small wind
// arrows. The field drifts very slowly with time, and parts around the fronts and stations drawn
// over it the way air flows around an obstacle.

import type { Body, Station } from "./fronts";

type Point = { x: number; y: number };

export type FieldOptions = {
  /** Seconds since load; the field drifts with it. Pass 0 for a still chart. */
  time: number;
  /** Isobar ink and the paper behind it, as "r g b" triples. */
  ink: string;
  paper: string;
  font: string;
  /** Where each grid corner reads the pressure, from fieldWarp. */
  warp?: Float32Array;
  /** Closed outlines to leave clear of every line, arrow and reading. */
  clear?: Point[][];
};

const CELL = 6;

// Highs and lows in fractions of the field (x across, y down): broad systems stretched wider than
// they are tall, and a few small tight whorls in the open water between the stations.
const BUMPS = [
  { x: 0.87, y: 0.62, a: 5, sx: 0.16, sy: 0.09 },
  { x: 0.06, y: 0.86, a: -6, sx: 0.16, sy: 0.14 },
  { x: 0.5, y: 0.08, a: 3, sx: 0.22, sy: 0.08 },
  { x: 0.64, y: 1.0, a: -5, sx: 0.14, sy: 0.1 },
  { x: 0.28, y: 0.46, a: 3, sx: 0.16, sy: 0.08 },
  { x: 0.97, y: 0.1, a: -3.5, sx: 0.08, sy: 0.1 },
  { x: 0.74, y: 0.52, a: 3.2, sx: 0.034, sy: 0.026 },
  { x: 0.93, y: 0.8, a: -3.4, sx: 0.04, sy: 0.032 },
  { x: 0.58, y: 0.84, a: 3, sx: 0.036, sy: 0.028 },
  { x: 0.88, y: 0.15, a: -3, sx: 0.038, sy: 0.034 },
  { x: 0.22, y: 0.13, a: 2.8, sx: 0.034, sy: 0.03 },
];

// Where pressure readings sit, in fractions of the field.
const READINGS = [
  [0.255, 0.05],
  [0.72, 0.11],
  [0.02, 0.24],
  [0.965, 0.52],
  [0.56, 0.9],
];

const WIND_ARROWS = scatter(72, 11);

/**
 * Air pressure at a point of the field, in isobar steps (one line per whole step). The point is
 * first pushed around by a slow warp, which turns straight isobars into the long S-bends of a
 * real chart.
 *
 * @param x - Across the field, 0 to 1.
 * @param y - Down the field, 0 to 1.
 * @param time - Seconds since load, for the drift.
 * @param aspect - The field's width over its height, so systems keep their shape.
 * @returns The pressure, centred on 1012.
 */
export function pressure(x: number, y: number, time: number, aspect: number) {
  const drift = time * 0.03;
  const wx = 0.04 * Math.sin(3 * y + 1.5 * x + drift);
  const wy =
    0.07 * Math.sin(8 * x + 1.3 * y + 0.8 + drift * 0.8) + 0.016 * Math.sin(15 * x - 1.2 * y + 2.3 - drift);
  const u = x + wx;
  const v = y + wy;
  let p = 1012 - 36 * (v - 0.5);
  BUMPS.forEach((bump, i) => {
    const bx = bump.x + 0.012 * Math.sin(drift + i * 1.7);
    const by = bump.y + 0.015 * Math.cos(drift * 0.9 + i * 2.3);
    const dx = (u - bx) / bump.sx;
    const dy = (v - by) / (bump.sy * (aspect / 2.2));
    p += bump.a * Math.exp(-(dx * dx + dy * dy) / 2);
  });
  return p;
}

/**
 * Build where each grid corner reads the pressure so the isobars part around the drawing: a corner
 * near a front or station reads from a point pulled towards that body's centre line, so the lines
 * the body covers squeeze past its edges and run alongside it. It does not drift, so build it once
 * per size.
 *
 * @param width - Field width in pixels.
 * @param height - Field height in pixels.
 * @param bodies - The fronts' bodies, in field pixels.
 * @param stations - Discs to wrap around, in field pixels.
 * @param unit - The frame's --u in pixels, which sets how far out a body bends the lines.
 * @returns An x, y pair per grid corner, for FieldOptions.warp.
 */
export function fieldWarp(width: number, height: number, bodies: Body[], stations: Station[], unit: number) {
  const { cols, rows } = gridSize(width, height);
  const warp = new Float32Array(cols * rows * 2);
  for (let index = 0; index < cols * rows; index++) {
    warp[index * 2] = (index % cols) * CELL;
    warp[index * 2 + 1] = Math.floor(index / cols) * CELL;
  }
  const fall = unit * 2.4;
  const discs = stations.map((s) => ({ axis: [s], half: [s.r * 1.12] }));
  for (const body of [...bodies, ...discs]) {
    const xs = body.axis.map((p) => p.x);
    const ys = body.axis.map((p) => p.y);
    const low = { x: Math.min(...xs), y: Math.min(...ys) };
    const high = { x: Math.max(...xs), y: Math.max(...ys) };
    forCellsNear(cols, rows, low, high, Math.max(...body.half) + fall * 6, (index) => {
      const x = warp[index * 2];
      const y = warp[index * 2 + 1];
      const near = closest(body, x, y);
      if (near.d < 1e-3) return;
      const pull = (near.half * (near.d <= near.half ? 1 : Math.exp((near.half - near.d) / fall))) / near.d;
      warp[index * 2] = x - (x - near.x) * pull;
      warp[index * 2 + 1] = y - (y - near.y) * pull;
    });
  }
  return warp;
}

/** The point on a body's centre line nearest to x, y, the body's half width there, and the distance to it. */
function closest({ axis, half }: Body, x: number, y: number) {
  let best = { x: axis[0].x, y: axis[0].y, half: half[0], d: Math.hypot(x - axis[0].x, y - axis[0].y) };
  for (let k = 0; k + 1 < axis.length; k++) {
    const a = axis[k];
    const dx = axis[k + 1].x - a.x;
    const dy = axis[k + 1].y - a.y;
    const t = Math.max(0, Math.min(1, ((x - a.x) * dx + (y - a.y) * dy) / (dx * dx + dy * dy || 1)));
    const cx = a.x + dx * t;
    const cy = a.y + dy * t;
    const d = Math.hypot(x - cx, y - cy);
    if (d < best.d) best = { x: cx, y: cy, half: half[k] + (half[k + 1] - half[k]) * t, d };
  }
  return best;
}

/** Draw the whole field (isobars, readings, wind arrows) into a context sized width by height. */
export function drawField(ctx: CanvasRenderingContext2D, width: number, height: number, options: FieldOptions) {
  const aspect = width / height;
  const at = (x: number, y: number) => pressure(x / width, y / height, options.time, aspect);

  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = `rgb(${options.ink} / 0.3)`;
  const grid = sampleGrid(width, height, at, options.warp);
  traceIsobars(ctx, grid);

  ctx.fillStyle = `rgb(${options.ink} / 0.42)`;
  for (const [fx, fy, turn] of WIND_ARROWS) drawWindArrow(ctx, fx * width, fy * height, turn, grid);

  drawReadings(ctx, width, height, grid, options);
  if (options.clear?.length) clearInside(ctx, options.clear);
}

// Readings sit on a clear patch of paper, labelled every 2 hPa in the narrow 1008-1012 band a
// calm chart shows, whatever the drawn field's own range.
function drawReadings(ctx: CanvasRenderingContext2D, width: number, height: number, grid: Grid, options: FieldOptions) {
  ctx.font = `500 11px ${options.font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const [fx, fy] of READINGS) {
    const x = fx * width;
    const y = fy * height;
    const label = String(1010 + 2 * Math.round(((grid.values[cornerNear(grid, x, y)] - 1012) * 0.15) / 2));
    const w = ctx.measureText(label).width + 8;
    ctx.fillStyle = `rgb(${options.paper})`;
    ctx.fillRect(x - w / 2, y - 7, w, 14);
    ctx.fillStyle = `rgb(${options.ink} / 0.75)`;
    ctx.fillText(label, x, y);
  }
}

/** Erase everything drawn inside each closed outline. */
function clearInside(ctx: CanvasRenderingContext2D, outlines: Point[][]) {
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  for (const outline of outlines) {
    ctx.beginPath();
    outline.forEach((p, k) => ctx[k === 0 ? "moveTo" : "lineTo"](p.x, p.y));
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

type Grid = { values: Float32Array; cols: number; rows: number };

/** The isobar grid's columns and rows for a field of this size. */
function gridSize(width: number, height: number) {
  return { cols: Math.ceil(width / CELL) + 1, rows: Math.ceil(height / CELL) + 1 };
}

/** Sample the field at every grid corner, each reading from where the warp sends it, if there is one. */
function sampleGrid(width: number, height: number, at: (x: number, y: number) => number, warp?: Float32Array): Grid {
  const { cols, rows } = gridSize(width, height);
  const values = new Float32Array(cols * rows);
  const moved = warp?.length === values.length * 2 ? warp : undefined;
  for (let index = 0; index < values.length; index++) {
    const x = moved ? moved[index * 2] : (index % cols) * CELL;
    const y = moved ? moved[index * 2 + 1] : Math.floor(index / cols) * CELL;
    values[index] = at(x, y);
  }
  return { values, cols, rows };
}

/** The index of the grid corner nearest to x, y, kept one corner in from the edge. */
function cornerNear({ cols, rows }: Grid, x: number, y: number) {
  const i = Math.min(cols - 2, Math.max(1, Math.round(x / CELL)));
  const j = Math.min(rows - 2, Math.max(1, Math.round(y / CELL)));
  return j * cols + i;
}

/** Visit every grid corner within margin of the box from low to high, with its pixel position. */
function forCellsNear(
  cols: number,
  rows: number,
  low: Point,
  high: Point,
  margin: number,
  visit: (index: number, x: number, y: number) => void,
) {
  const i0 = Math.max(0, Math.floor((low.x - margin) / CELL));
  const i1 = Math.min(cols - 1, Math.ceil((high.x + margin) / CELL));
  const j0 = Math.max(0, Math.floor((low.y - margin) / CELL));
  const j1 = Math.min(rows - 1, Math.ceil((high.y + margin) / CELL));
  for (let j = j0; j <= j1; j++) {
    for (let i = i0; i <= i1; i++) visit(j * cols + i, i * CELL, j * CELL);
  }
}

// Marching squares: every whole hPa that crosses a cell gets a short segment through it.
function traceIsobars(ctx: CanvasRenderingContext2D, { values, cols, rows }: Grid) {
  ctx.beginPath();
  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const a = values[j * cols + i];
      const b = values[j * cols + i + 1];
      const c = values[(j + 1) * cols + i + 1];
      const d = values[(j + 1) * cols + i];
      const lo = Math.ceil(Math.min(a, b, c, d));
      const hi = Math.floor(Math.max(a, b, c, d));
      for (let level = lo; level <= hi; level++) {
        cellSegments(ctx, i * CELL, j * CELL, [a, b, c, d], level);
      }
    }
  }
  ctx.stroke();
}

/** Add the one or two segments where an isobar level crosses one grid cell. */
function cellSegments(ctx: CanvasRenderingContext2D, x: number, y: number, corners: number[], level: number) {
  const [a, b, c, d] = corners;
  const points: [number, number][] = [];
  const cross = (v1: number, v2: number) => (level - v1) / (v2 - v1);
  if (a < level !== b < level) points.push([x + cross(a, b) * CELL, y]);
  if (b < level !== c < level) points.push([x + CELL, y + cross(b, c) * CELL]);
  if (d < level !== c < level) points.push([x + cross(d, c) * CELL, y + CELL]);
  if (a < level !== d < level) points.push([x, y + cross(a, d) * CELL]);
  for (let k = 0; k + 1 < points.length; k += 2) {
    ctx.moveTo(points[k][0], points[k][1]);
    ctx.lineTo(points[k + 1][0], points[k + 1][1]);
  }
}

// A small filled triangle, turned from the local isobar's direction by its own fixed amount so the
// arrows point every which way, as gusts do on a chart.
function drawWindArrow(ctx: CanvasRenderingContext2D, x: number, y: number, turn: number, grid: Grid) {
  const index = cornerNear(grid, x, y);
  const gx = grid.values[index + 1] - grid.values[index - 1];
  const gy = grid.values[index + grid.cols] - grid.values[index - grid.cols];
  const angle = Math.atan2(gx, -gy) + turn;
  const tx = Math.cos(angle);
  const ty = Math.sin(angle);
  ctx.beginPath();
  ctx.moveTo(x + tx * 3.6, y + ty * 3.6);
  ctx.lineTo(x - tx * 2.2 - ty * 2.2, y - ty * 2.2 + tx * 2.2);
  ctx.lineTo(x - tx * 2.2 + ty * 2.2, y - ty * 2.2 - tx * 2.2);
  ctx.closePath();
  ctx.fill();
}

// Evenly spread pseudo-random points, each with its own turn, the same on every load.
function scatter(count: number, seed: number) {
  let state = seed;
  const random = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  const columns = Math.ceil(Math.sqrt(count * 2));
  const rows = Math.ceil(count / columns);
  const points: [number, number, number][] = [];
  for (let k = 0; k < count; k++) {
    const col = k % columns;
    const row = Math.floor(k / columns);
    const turn = (random() - 0.5) * 2.4 + (random() < 0.5 ? 0 : Math.PI);
    points.push([(col + 0.15 + random() * 0.7) / columns, (row + 0.15 + random() * 0.7) / rows, turn]);
  }
  return points;
}
