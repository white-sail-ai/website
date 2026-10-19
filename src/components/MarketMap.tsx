"use client";

import { useEffect, useRef } from "react";
import styles from "./MarketMap.module.css";

type MapNode = {
  x: number;
  y: number;
  r: number;
  phase: number;
  cluster: number;
  flash: number;
  links: number[];
};

type Pulse = { edge: number; from: number; to: number; t: number; speed: number; hops: number };

const NAVY = "26, 50, 99";
const AMBER = "250, 185, 91";
const MAX_CLUSTERS = 7;
const MAX_PULSES = 16;

// Deterministic PRNG so the map has the same shape on every visit.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildMap(w: number, h: number) {
  const rand = mulberry32(8200);
  const count = Math.round(Math.min(200, Math.max(56, (w * h) / 3600)));
  const clusters = Math.max(3, Math.min(MAX_CLUSTERS, Math.round(w / 180)));
  const spreadX = (w / clusters) * 0.78;
  const spreadY = h * 0.22;

  const centers = Array.from({ length: clusters }, (_, i) => ({
    x: w * (0.06 + 0.88 * ((i + 0.5) / clusters)) + (rand() - 0.5) * w * 0.05,
    y: h * (0.2 + rand() * 0.6),
  }));

  const nodes: MapNode[] = Array.from({ length: count }, (_, i) => {
    const cluster = i % clusters;
    const angle = rand() * Math.PI * 2;
    const dist = Math.sqrt(rand());
    const hub = rand() > 0.93;
    return {
      x: centers[cluster].x + Math.cos(angle) * dist * spreadX,
      // Keep clear of the captions along the top and bottom edges.
      y: Math.min(h - 30, Math.max(38, centers[cluster].y + Math.sin(angle) * dist * spreadY)),
      r: hub ? 3.2 + rand() * 1.4 : 1.3 + rand() * 1.4,
      phase: rand() * Math.PI * 2,
      cluster,
      flash: 0,
      links: [],
    };
  });

  const edges: [number, number][] = [];
  const seen = new Set<string>();
  const addEdge = (a: number, b: number) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (a === b || seen.has(key)) return;
    seen.add(key);
    nodes[a].links.push(edges.length);
    nodes[b].links.push(edges.length);
    edges.push([a, b]);
  };

  // Each company links to its nearest neighbours...
  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
      .forEach(({ j }) => addEdge(i, j));
  });

  // ...plus a few long-range relationships across sectors.
  for (let k = 0; k < count / 6; k++) {
    const a = Math.floor(rand() * count);
    const b = Math.floor(rand() * count);
    if (nodes[a].cluster !== nodes[b].cluster) addEdge(a, b);
  }

  return { nodes, edges };
}

export function MarketMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = mulberry32(Date.now());
    let width = 0;
    let height = 0;
    let map = buildMap(1, 1);
    let pulses: Pulse[] = [];
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let lastTime = 0;
    let spawnClock = 0;
    let onScreen = true;

    const position = (n: MapNode, time: number) => ({
      x: n.x + Math.sin(time * 0.00025 + n.phase) * 2.2,
      y: n.y + Math.cos(time * 0.0002 + n.phase * 1.3) * 1.8,
    });

    const spawnPulse = (edge: number, from: number, hops: number) => {
      const [a, b] = map.edges[edge];
      pulses.push({
        edge,
        from,
        to: from === a ? b : a,
        t: 0,
        speed: 0.0007 + rand() * 0.0006,
        hops,
      });
    };

    const draw = (time: number) => {
      const { nodes, edges } = map;
      const pos = nodes.map((n) => position(n, time));
      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const cross = nodes[a].cluster !== nodes[b].cluster;
        ctx.strokeStyle = `rgba(${NAVY}, ${cross ? 0.06 : 0.11})`;
        ctx.beginPath();
        ctx.moveTo(pos[a].x, pos[a].y);
        ctx.lineTo(pos[b].x, pos[b].y);
        ctx.stroke();
      }

      for (const p of pulses) {
        const from = pos[p.from];
        const to = pos[p.to];
        const x = from.x + (to.x - from.x) * p.t;
        const y = from.y + (to.y - from.y) * p.t;
        const gradient = ctx.createLinearGradient(from.x, from.y, x, y);
        gradient.addColorStop(0, `rgba(${AMBER}, 0)`);
        gradient.addColorStop(1, `rgba(${AMBER}, 0.85)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `rgb(${AMBER})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      nodes.forEach((n, i) => {
        const { x, y } = pos[i];
        let boost = 0;
        if (pointer) {
          const d = Math.hypot(pointer.x - x, pointer.y - y);
          boost = Math.max(0, 1 - d / 140);
        }
        if (n.flash > 0) {
          ctx.strokeStyle = `rgba(${AMBER}, ${n.flash * 0.9})`;
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          ctx.arc(x, y, n.r + (1 - n.flash) * 10, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle =
          n.flash > 0.4 ? `rgb(${AMBER})` : `rgba(${NAVY}, ${(n.r > 3 ? 0.9 : 0.5) + boost * 0.4})`;
        ctx.beginPath();
        ctx.arc(x, y, n.r + boost * 1.2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const step = (time: number) => {
      const dt = Math.min(64, time - (lastTime || time));
      lastTime = time;

      spawnClock += dt;
      if (spawnClock > 320 && pulses.length < MAX_PULSES) {
        spawnClock = 0;
        const edge = Math.floor(rand() * map.edges.length);
        spawnPulse(edge, map.edges[edge][rand() > 0.5 ? 0 : 1], 0);
      }

      // Signals propagate: when one arrives, the company lights up and the
      // update may travel on to a related company.
      const arrived: Pulse[] = [];
      pulses = pulses.filter((p) => {
        p.t += p.speed * dt;
        if (p.t < 1) return true;
        arrived.push(p);
        return false;
      });
      for (const p of arrived) {
        const node = map.nodes[p.to];
        node.flash = 1;
        if (p.hops < 3 && rand() < 0.55 && pulses.length < MAX_PULSES) {
          const next = node.links.filter((e) => e !== p.edge);
          if (next.length) spawnPulse(next[Math.floor(rand() * next.length)], p.to, p.hops + 1);
        }
      }
      for (const n of map.nodes) n.flash = Math.max(0, n.flash - dt * 0.0012);

      draw(time);
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (reduceMotion || frame || !onScreen || document.hidden) return;
      lastTime = 0;
      frame = requestAnimationFrame(step);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      map = buildMap(width, height);
      pulses = [];
      if (reduceMotion) {
        // A still frame with a few highlighted relationships.
        for (let i = 0; i < 6; i++) {
          const edge = (i * 37) % map.edges.length;
          pulses.push({ edge, from: map.edges[edge][0], to: map.edges[edge][1], t: 0.7, speed: 0, hops: 0 });
        }
      }
      draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    visibility.observe(wrap);

    const onVisibilityChange = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onPointerMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onPointerLeave = () => (pointer = null);
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerleave", onPointerLeave);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.map}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.caption}>
        <span className={styles.live} aria-hidden="true" />
        Live market map
      </div>
      <div className={`${styles.caption} ${styles.legend}`}>Companies · Markets · Relationships</div>
    </div>
  );
}
