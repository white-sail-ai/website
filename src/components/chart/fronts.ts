// The ripple's fronts, drawn between stations the way a weather chart draws them. The strongest
// surprise is a solid gold mass with ripple rings cut through it; weaker ones are gold bundles of
// strands that thin at every link; an offsetting effect is a navy line with arrowheads.

import type { RippleLink } from "@/lib/ripple";

export type Station = { x: number; y: number; r: number };
type Point = { x: number; y: number };
type Arc = { x: number; y: number; r: number };

/**
 * The fronts' inks as "r g b" triples: gold for a surprise, navy for a counter line, and paper
 * for the rings cut through a mass.
 */
export type Inks = { gold: string; navy: string; paper: string };

type Mass = {
  /** The outline's two sides, each from the first station to the second. */
  top: Point[];
  bottom: Point[];
  /** Thin gold lines hugging the outline outside it. */
  edges: Point[][];
  /** The way the rings face, and the ring whose crest sits at any point along the axis. */
  angle: number;
  ringAt: (t: number) => Arc;
  /** The rings cut through the mass at rest. */
  rings: Arc[];
  /** The axis the draw-on clip advances along. */
  axis: { start: Point; u: Point; n: Point; span: number };
};

/** The stretch of chart a front covers, which the isobars flow around: its centre line and half its width at each point. */
export type Body = { axis: Point[]; half: number[] };

export type Front = {
  link: RippleLink;
  /** Each strand as a polyline from the first station to the second; a mass keeps its axis here. */
  strands: Point[][];
  mass?: Mass;
  /** Where the effect lands, for the arrival ring. */
  target: Station;
  /** What the isobars part around; a thin counter line has none, so they cross it. */
  bodies: Body[];
  /** Closed outlines the isobars leave clear, so no navy line shows inside gold. */
  bands: Point[][];
};

const SAMPLES = 56;

/** How far each of a mass's gold edge lines sits outside it, in --u, from inner to outer. */
const EDGE_GAPS = [0.45, 0.95, 1.5, 2.1];
/** Each edge line's opacity, fading outward. */
const EDGE_INK = [0.95, 0.8, 0.6, 0.42];

/** Lay out every link's shape between its two stations, measured in canvas pixels. */
export function layoutFronts(links: RippleLink[], stations: Map<string, Station>, unit: number): Front[] {
  return links.flatMap((link) => {
    const from = stations.get(link.via ?? link.from);
    const to = stations.get(link.to);
    if (!from || !to) return [];
    if (link.tone === "counter") {
      const line = counterLine(from, to);
      return [{ link, strands: [line], target: to, bodies: [], bands: [] }];
    }
    if (link.mass) return [{ link, ...massFront(from, to, link.spread * unit, unit), target: to }];
    return [{ link, ...strandFront(bundle(from, to, link, unit)), target: to }];
  });
}

/** A bundle's strands, with the body the isobars part around and the band cleared between its outer strands. */
function strandFront(strands: Point[][]) {
  const first = strands[0];
  const last = strands[strands.length - 1];
  return { strands, bodies: [body(first, last)], bands: [band(first, last)] };
}

/** The centre line between two polylines sampled alike, with half the gap between them at each point. */
function body(a: Point[], b: Point[]): Body {
  return {
    axis: a.map((p, k) => ({ x: (p.x + b[k].x) / 2, y: (p.y + b[k].y) / 2 })),
    half: a.map((p, k) => Math.hypot(p.x - b[k].x, p.y - b[k].y) / 2),
  };
}

/** The closed outline between two polylines that run the same way. */
function band(a: Point[], b: Point[]) {
  return [...a, ...[...b].reverse()];
}

// The direction between two stations, with a normal that points up the page so every front bows
// the same way.
function frame(from: Station, to: Station) {
  const length = Math.hypot(to.x - from.x, to.y - from.y);
  const u = { x: (to.x - from.x) / length, y: (to.y - from.y) / length };
  const flip = u.x < 0 ? -1 : 1;
  return { length, u, flip, n: { x: u.y * flip, y: -u.x * flip } };
}

// A bundle's half-width along its length: at each disc it matches the mass neck (0.37 of the
// radius), then it can swell mid-span when spread asks for more room than that neck allows.
function halfWidth(t: number, spread: number, from: Station, to: Station) {
  const neck = 0.37;
  const ends = from.r * neck * (1 - t) + to.r * neck * t;
  const gap = Math.max(0, spread - ends);
  // Stay at neck width at each disc; open into a fan only around mid-span.
  return ends + gap * Math.pow(Math.sin(Math.PI * t), 2.45);
}

// Strands pack towards the middle and ripple slightly, like flow lines rather than ribs.
function bundle(from: Station, to: Station, link: RippleLink, unit: number) {
  const { length, u, n } = frame(from, to);
  // The same inset as a mass front, so enter and leave widths line up at a shared station.
  const inset = 0.6;
  const start = { x: from.x + u.x * from.r * inset, y: from.y + u.y * from.r * inset };
  const span = length - from.r * inset - to.r * inset;
  const spread = link.spread * unit;
  return Array.from({ length: link.strands }, (_, i) => {
    const even = link.strands === 1 ? 0 : (i / (link.strands - 1)) * 2 - 1;
    const s = Math.sign(even) * Math.pow(Math.abs(even), 1.25);
    return Array.from({ length: SAMPLES }, (_, k) => {
      const t = k / (SAMPLES - 1);
      const lift = Math.sin(Math.PI * t);
      const ripple = 0.35 * unit * Math.sin(2 * Math.PI * (1.3 * t + i * 0.07)) * lift;
      const offset = s * halfWidth(t, spread, from, to) + 0.1 * spread * lift + ripple;
      return { x: start.x + u.x * span * t + n.x * offset, y: start.y + u.y * span * t + n.y * offset };
    });
  });
}

/** A point on the cubic Bezier p0 to p3 at t. */
function cubicAt(p0: Point, p1: Point, p2: Point, p3: Point, t: number) {
  const m = 1 - t;
  return {
    x: m * m * m * p0.x + 3 * m * m * t * p1.x + 3 * m * t * t * p2.x + t * t * t * p3.x,
    y: m * m * m * p0.y + 3 * m * m * t * p1.y + 3 * m * t * t * p2.y + t * t * t * p3.y,
  };
}

// The solid front starts and ends under the station discs, nearly their full height where it
// leaves, swelling into a bulb, then necking into a band that enters the next station.
function massFront(from: Station, to: Station, bulge: number, unit: number) {
  const { length, u, n } = frame(from, to);
  const start = { x: from.x + u.x * from.r * 0.6, y: from.y + u.y * from.r * 0.6 };
  const span = length - from.r * 0.6 - to.r * 0.6;
  const width = (t: number) =>
    from.r * 0.52 * (1 - t) + to.r * 0.37 * t + bulge * Math.exp(-(((t - 0.55) / (t < 0.55 ? 0.2 : 0.12)) ** 2));
  const widest = width(0.55);
  // Edge lines spread apart around the bulb and close up along the band, like flow lines.
  const side = (sign: number, gap: number) =>
    Array.from({ length: SAMPLES }, (_, k) => {
      const t = k / (SAMPLES - 1);
      const offset = sign * (width(t) + gap * (0.55 + (0.45 * width(t)) / widest));
      return { x: start.x + u.x * span * t + n.x * offset, y: start.y + u.y * span * t + n.y * offset };
    });
  const edges = EDGE_GAPS.flatMap((gap) => [side(1, gap * unit), side(-1, gap * unit)]);
  const outer = edges.slice(-2);
  // Every ring is the same wavefront moved along: one radius, sized to the bulb, so the rings
  // stay parallel and never cross; the outline clips each to the mass's height where it is.
  const r = widest * 1.12;
  const ringAt = (t: number) => {
    const back = span * t - r;
    return { x: start.x + u.x * back, y: start.y + u.y * back, r };
  };
  const mass: Mass = {
    top: side(1, 0),
    bottom: side(-1, 0),
    edges,
    angle: Math.atan2(u.y, u.x),
    ringAt,
    rings: Array.from({ length: 11 }, (_, k) => ringAt(0.26 + k * 0.042)),
    axis: { start, u, n, span },
  };
  return { strands: [side(0, 0)], mass, bodies: [body(outer[0], outer[1])], bands: [band(outer[0], outer[1])] };
}

// A cubic that leaves the first station heading across, then turns down towards the second.
function counterLine(from: Station, to: Station) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const c1 = { x: from.x + dx * 0.45, y: from.y + dy * 0.04 };
  const c2 = { x: from.x + dx * 0.5, y: from.y + dy * 0.7 };
  const toward = (p: Point, q: Point, r: number) => {
    const length = Math.hypot(q.x - p.x, q.y - p.y);
    return { x: p.x + ((q.x - p.x) / length) * r, y: p.y + ((q.y - p.y) / length) * r };
  };
  const p0 = toward(from, c1, from.r * 1.15);
  const p3 = toward(to, c2, to.r * 1.6);
  return Array.from({ length: SAMPLES }, (_, k) => cubicAt(p0, c1, c2, p3, k / (SAMPLES - 1)));
}

/** Draw a front as far as progress (0 to 1) has carried it. */
export function drawFront(ctx: CanvasRenderingContext2D, front: Front, progress: number, inks: Inks, unit: number) {
  if (progress <= 0) return;
  const { link, strands, mass } = front;
  if (mass) {
    drawMass(ctx, mass, progress, inks);
    return;
  }
  if (link.tone === "counter") {
    ctx.strokeStyle = `rgb(${inks.navy})`;
    ctx.fillStyle = `rgb(${inks.navy})`;
    ctx.lineWidth = 3;
    strokeUpTo(ctx, strands[0], progress);
    for (const at of [0.32, 0.6, 1]) {
      if (progress >= at) drawArrowhead(ctx, strands[0], at, unit * 0.85);
    }
    return;
  }
  // A bundle of more strands also draws each one heavier, so a bigger effect reads fuller, not only wider.
  const weight = 0.8 + 0.055 * strands.length;
  strands.forEach((strand, i) => {
    const s = strands.length === 1 ? 0 : Math.abs((i / (strands.length - 1)) * 2 - 1);
    ctx.strokeStyle = `rgb(${inks.gold} / ${1 - 0.2 * s})`;
    ctx.lineWidth = weight;
    strokeUpTo(ctx, strand, progress);
  });
}

// The mass is revealed by a clip that advances along its axis, so it pours out of the station.
function drawMass(ctx: CanvasRenderingContext2D, mass: Mass, progress: number, inks: Inks) {
  ctx.save();
  clipAlong(ctx, mass.axis, progress);
  ctx.fillStyle = `rgb(${inks.gold})`;
  outline(ctx, mass);
  ctx.fill();
  ctx.save();
  ctx.clip();
  ctx.strokeStyle = `rgb(${inks.paper})`;
  ctx.lineWidth = 2;
  for (const ring of mass.rings) ringArc(ctx, mass, ring);
  ctx.restore();
  mass.edges.forEach((edge, i) => {
    ctx.strokeStyle = `rgb(${inks.gold} / ${EDGE_INK[Math.floor(i / 2)]})`;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    edge.forEach((p, k) => ctx[k === 0 ? "moveTo" : "lineTo"](p.x, p.y));
    ctx.stroke();
  });
  ctx.restore();
}

/** Trace a mass's closed outline as the current path, for filling or clipping. */
function outline(ctx: CanvasRenderingContext2D, mass: Mass) {
  ctx.beginPath();
  mass.top.forEach((p, k) => ctx[k === 0 ? "moveTo" : "lineTo"](p.x, p.y));
  for (let k = mass.bottom.length - 1; k >= 0; k--) ctx.lineTo(mass.bottom[k].x, mass.bottom[k].y);
  ctx.closePath();
}

/** Stroke one ripple ring, the half facing the way the mass travels. */
function ringArc(ctx: CanvasRenderingContext2D, mass: Mass, ring: Arc) {
  ctx.beginPath();
  ctx.arc(ring.x, ring.y, ring.r, mass.angle - Math.PI / 2, mass.angle + Math.PI / 2);
  ctx.stroke();
}

/** Clip to everything behind a line that progress has carried along the mass's axis. */
function clipAlong(ctx: CanvasRenderingContext2D, axis: Mass["axis"], progress: number) {
  const { start, u, n, span } = axis;
  const back = span * 0.2;
  const reach = span * progress;
  const wide = span;
  ctx.beginPath();
  ctx.moveTo(start.x - u.x * back + n.x * wide, start.y - u.y * back + n.y * wide);
  ctx.lineTo(start.x + u.x * reach + n.x * wide, start.y + u.y * reach + n.y * wide);
  ctx.lineTo(start.x + u.x * reach - n.x * wide, start.y + u.y * reach - n.y * wide);
  ctx.lineTo(start.x - u.x * back - n.x * wide, start.y - u.y * back - n.y * wide);
  ctx.closePath();
  ctx.clip();
}

/**
 * Send one pulse along a front: a paper ring rippling out through a mass, or a bright head along
 * a bundle's middle strand; either way, a ring where it lands.
 */
export function drawPulse(ctx: CanvasRenderingContext2D, front: Front, phase: number, inks: Inks) {
  const ink = front.link.tone === "surprise" ? inks.gold : inks.navy;
  if (phase > 0 && phase < 1) {
    if (front.mass) rippleThrough(ctx, front.mass, phase, inks.paper);
    else travelHead(ctx, front.strands[Math.floor(front.strands.length / 2)], phase, ink);
  }
  if (phase >= 1 && phase < 2) {
    const k = phase - 1;
    const { target } = front;
    ctx.strokeStyle = `rgb(${ink} / ${0.6 * (1 - k)})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.r * (1.15 + k * 0.9), 0, Math.PI * 2);
    ctx.stroke();
  }
}

/** Cut one wider paper ring through the mass at the pulse's current reach. */
function rippleThrough(ctx: CanvasRenderingContext2D, mass: Mass, phase: number, paper: string) {
  ctx.save();
  outline(ctx, mass);
  ctx.clip();
  ctx.strokeStyle = `rgb(${paper})`;
  ctx.lineWidth = 3.2;
  ringArc(ctx, mass, mass.ringAt(0.08 + phase * 0.92));
  ctx.restore();
}

/** Draw a short bright head on a strand, ending where the pulse has reached. */
function travelHead(ctx: CanvasRenderingContext2D, middle: Point[], phase: number, ink: string) {
  const tail = Math.max(0, phase - 0.16);
  const from = Math.floor(tail * (middle.length - 1));
  const to = Math.ceil(phase * (middle.length - 1));
  ctx.strokeStyle = `rgb(${ink} / 0.9)`;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.beginPath();
  for (let k = from; k <= to; k++) ctx[k === from ? "moveTo" : "lineTo"](middle[k].x, middle[k].y);
  ctx.stroke();
  ctx.lineCap = "butt";
}

/** Stroke a polyline from its start to the fraction progress of its length. */
function strokeUpTo(ctx: CanvasRenderingContext2D, points: Point[], progress: number) {
  const reach = progress * (points.length - 1);
  const whole = Math.floor(reach);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let k = 1; k <= whole; k++) ctx.lineTo(points[k].x, points[k].y);
  if (whole < points.length - 1) {
    const f = reach - whole;
    const a = points[whole];
    const b = points[whole + 1];
    ctx.lineTo(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f);
  }
  ctx.stroke();
}

// A filled arrowhead on the line, pointing the way the effect travels.
function drawArrowhead(ctx: CanvasRenderingContext2D, points: Point[], at: number, size: number) {
  const k = Math.min(points.length - 2, Math.round(at * (points.length - 1)));
  const p = points[k];
  const q = points[k + 1];
  ctx.save();
  ctx.translate(at === 1 ? q.x : p.x, at === 1 ? q.y : p.y);
  ctx.rotate(Math.atan2(q.y - p.y, q.x - p.x));
  ctx.beginPath();
  ctx.moveTo(size * 0.7, 0);
  ctx.lineTo(-size * 0.8, -size * 0.75);
  ctx.lineTo(-size * 0.8, size * 0.75);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
