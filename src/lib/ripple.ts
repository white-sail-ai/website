// The illustrative ripples the home page draws: a surprise at one company moving forward, link by
// link, through the world model. Every figure is invented and the page labels it as illustrative.
//
// Positions are percentages of the first screen (the 1280 by 720 chart frame); diameters are in
// --u, the frame's one percent of width.

/** A surprise travels forward in gold; an offsetting effect travels back in navy. */
export type Tone = "surprise" | "counter";

export type RippleNode = {
  /** The company's id, which also picks its mark for the station. */
  id: string;
  step: string;
  name: string;
  details: string[];
  tone: Tone;
  /** Station centre in % of the frame and its diameter in --u. */
  station: { x: number; y: number; d: number };
  /** Step marker centre in % of the frame. */
  marker: { x: number; y: number };
  /** Label's top-left corner in % of the frame. */
  label: { x: number; y: number };
};

export type RippleLink = {
  from: string;
  to: string;
  tone: Tone;
  /** How many strands the front is drawn with: the wider the bundle, the bigger the effect. */
  strands: number;
  /** Half-width of the bundle at its widest, in --u. */
  spread: number;
  /**
   * Draw the front as one solid gold mass with ripple rings cut through it, rather than as
   * strands: for the link where the surprise is strongest. Its spread is the bulb's swell.
   */
  mass?: boolean;
  /** Draw the strands from behind this station instead, so they read as continuing through it. */
  via?: string;
  /** When the front starts drawing on and how long it takes, in seconds after load. */
  start: number;
  duration: number;
  note?: { lines: string[]; x: number; y: number };
};

export const heroNodes: RippleNode[] = [
  {
    id: "sk-hynix",
    step: "1",
    name: "SK hynix · Supplier",
    details: ["HBM output guidance +20%", "model expected +12%", "surprise +8 pts"],
    tone: "surprise",
    station: { x: 12.19, y: 33.33, d: 6.2 },
    marker: { x: 12.19, y: 23.42 },
    label: { x: 5.63, y: 42.22 },
  },
  {
    id: "nvidia",
    step: "2",
    name: "NVIDIA",
    details: ["GPU shipments", "forecast +3.2%"],
    tone: "surprise",
    station: { x: 42.43, y: 34.58, d: 6.8 },
    marker: { x: 42.66, y: 24.17 },
    label: { x: 38.44, y: 42.22 },
  },
  {
    id: "microsoft",
    step: "3a",
    name: "Microsoft",
    details: ["AI capacity forecast", "+1.1%"],
    tone: "surprise",
    station: { x: 64.21, y: 35.0, d: 5.85 },
    marker: { x: 64.06, y: 25.28 },
    label: { x: 67.6, y: 20.2 },
  },
  {
    id: "meta",
    step: "3b",
    name: "Meta",
    details: ["capex forecast", "+0.9%"],
    tone: "surprise",
    station: { x: 83.63, y: 35.0, d: 5.55 },
    marker: { x: 83.6, y: 25.28 },
    label: { x: 87.03, y: 30.83 },
  },
  {
    id: "samsung",
    step: "4",
    name: "Samsung",
    details: ["HBM share forecast", "−0.6 pts"],
    tone: "counter",
    station: { x: 78.28, y: 71.25, d: 4.3 },
    marker: { x: 78.29, y: 62.98 },
    label: { x: 82.19, y: 68.33 },
  },
];

export const heroLinks: RippleLink[] = [
  {
    from: "sk-hynix",
    to: "nvidia",
    tone: "surprise",
    strands: 1,
    spread: 2.3,
    mass: true,
    start: 0.5,
    duration: 1.1,
    note: { lines: ["elasticity 0.4"], x: 22.97, y: 43.61 },
  },
  { from: "nvidia", to: "microsoft", tone: "surprise", strands: 26, spread: 2.1, start: 1.6, duration: 0.8 },
  {
    from: "nvidia",
    to: "meta",
    via: "microsoft",
    tone: "surprise",
    strands: 6,
    spread: 1,
    start: 2.2,
    duration: 0.9,
  },
  {
    from: "nvidia",
    to: "samsung",
    tone: "counter",
    strands: 1,
    spread: 0,
    start: 2.0,
    duration: 1.0,
    note: { lines: ["elasticity", "−0.2"], x: 56.87, y: 55.28 },
  },
];

/** When a node's marker and label appear: as the front that reaches it lands. */
export function arrivalTime(links: RippleLink[], id: string) {
  const inbound = links.find((link) => link.to === id);
  return inbound ? inbound.start + inbound.duration : 0.2;
}
