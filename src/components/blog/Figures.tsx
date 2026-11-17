import type { CSSProperties, ReactNode } from "react";
import styles from "./Figures.module.css";

// The essay's smaller figures, drawn in the chart's marks: navy ink, amber accents, on raised paper.

function Frame({ caption, children, label }: { caption: string; label: string; children: ReactNode }) {
  return (
    <figure className={styles.figure} data-reveal="unroll" aria-label={label}>
      <div className={styles.frame}>{children}</div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}

const arrow = (id: string) => (
  <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M1 1 L9 5 L1 9" fill="none" stroke="var(--navy)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </marker>
);

/** Money flows, is perceived, drives decisions, and the decisions reshape the flow. */
export function MoneyLoop() {
  const nodes = [
    { x: 200, y: 44, title: "Money flows", line: "earned and spent" },
    { x: 330, y: 150, title: "Perceive", line: "and predict" },
    { x: 200, y: 256, title: "Decide", line: "strategies, investments, policies" },
    { x: 70, y: 150, title: "Reshape", line: "the flow" },
  ];
  return (
    <Frame label="The loop: money flows, people perceive and predict it, decide, and so reshape the flow." caption="The loop financial markets research tries to see, and that its decisions feed back into.">
      <svg viewBox="0 0 400 300" className={styles.svg} aria-hidden="true">
        <defs>{arrow("loop-arrow")}</defs>
                {[
          "M266 40 Q314 52 332 104",
          "M332 210 Q318 252 274 262",
          "M126 262 Q82 252 68 210",
          "M68 104 Q86 52 134 40",
        ].map((d) => (
          <path key={d} d={d} fill="none" stroke="var(--navy)" strokeWidth="1.5" markerEnd="url(#loop-arrow)" />
        ))}
        <text x="200" y="146" textAnchor="middle" className={styles.centre}>
          And the loop
        </text>
        <text x="200" y="166" textAnchor="middle" className={styles.centre}>
          goes on.
        </text>
        {nodes.map((n, i) => (
          <g key={n.title}>
            <circle cx={n.x} cy={n.y - 8} r="5" fill={i === 0 ? "var(--amber)" : "var(--navy)"} />
            <text x={n.x} y={n.y + 14} textAnchor="middle" className={styles.title}>
              {n.title}
            </text>
            <text x={n.x} y={n.y + 30} textAnchor="middle" className={styles.line}>
              {n.line}
            </text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

// One small economy, drawn three ways. Coordinates on a 160 x 160 grid.
const NODES: [number, number][] = [
  [30, 34], [62, 22], [96, 30], [130, 24], [22, 72], [54, 62], [88, 70], [122, 58],
  [142, 92], [36, 108], [70, 100], [104, 110], [134, 130], [24, 140], [58, 136], [94, 142],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [0, 5], [1, 5], [2, 6], [3, 7], [4, 5], [5, 6], [6, 7], [7, 8], [4, 9],
  [5, 10], [6, 10], [6, 11], [7, 11], [8, 12], [9, 10], [10, 11], [11, 12], [9, 13], [10, 14], [13, 14], [14, 15], [11, 15], [12, 15],
];
const ZOOM = [6, 7, 10, 11]; // the part Finance sees

function Economy({ view }: { view: "economics" | "finance" | "whole" }) {
  return (
    <svg viewBox="0 0 160 160" className={styles.mini} aria-hidden="true">
      {view === "economics" && (
        <>
          {[
            [56, 52, 38],
            [112, 62, 34],
            [70, 122, 36],
            [124, 124, 28],
          ].map(([x, y, r]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill="rgb(26 50 99 / 0.12)" stroke="rgb(26 50 99 / 0.45)" strokeDasharray="3 4" />
          ))}
          <path d="M80 56 L96 60 M84 86 L78 100 M108 96 L114 102" stroke="rgb(26 50 99 / 0.45)" strokeWidth="1.5" />
        </>
      )}
      {EDGES.map(([a, b]) => {
        const on = view === "whole" || (view === "finance" && ZOOM.includes(a) && ZOOM.includes(b));
        if (view === "economics") return null;
        return (
          <line
            key={`${a}-${b}`}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            stroke={on ? "var(--navy)" : "rgb(26 50 99 / 0.1)"}
            strokeWidth={on ? 1.4 : 1}
          />
        );
      })}
      {view !== "economics" &&
        NODES.map(([x, y], i) => {
          const on = view === "whole" || ZOOM.includes(i);
          const accent = view === "whole" && (i === 2 || i === 10 || i === 12);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={on ? 5 : 3.5}
              fill={accent ? "var(--amber)" : on ? "var(--navy)" : "rgb(26 50 99 / 0.12)"}
              stroke="var(--raised)"
              strokeWidth="2"
            />
          );
        })}
      {view === "finance" && <circle cx="96" cy="85" r="40" fill="none" stroke="var(--navy)" strokeWidth="1.5" />}
    </svg>
  );
}

/** Economics sees the whole only in outline, finance one part in detail; the aim is the whole, in detail. */
export function PartialViews() {
  const panels = [
    { view: "economics" as const, title: "Economics", line: "The big picture, through theory." },
    { view: "finance" as const, title: "Finance", line: "One small part, well enough to invest." },
    { view: "whole" as const, title: "The live map", line: "Every company, market, and policy, connected." },
  ];
  return (
    <Frame label="The same economy seen three ways: by economics in outline, by finance in one small part, and as a whole live map." caption="The same economy, three ways of seeing it.">
      <div className={styles.panels}>
        {panels.map((p) => (
          <div key={p.view} className={styles.panel} data-accent={p.view === "whole" ? "" : undefined}>
            <Economy view={p.view} />
            <p className={styles.panelText}>
              <strong>{p.title}</strong>
              <span>{p.line}</span>
            </p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/** How few companies make it from the universe to in-depth research. Orders of magnitude only. */
export function CapacityFunnel() {
  const steps = [
    { value: "~50,000", label: "listed companies worldwide" },
    { value: "~1,500", label: "fit the team’s three theses" },
    { value: "~60", label: "make the screened shortlist" },
    { value: "~6", label: "get researched in depth" },
  ];
  return (
    <Frame
      label="From about 50,000 listed companies, about 1,500 fit a team's theses, about 60 make the shortlist, and about 6 are researched in depth."
      caption="Illustrative orders of magnitude for one investment team. The cut at each step is capacity, not conviction."
    >
      <ol className={styles.funnel}>
        {steps.map((s, i) => (
          <li key={s.value} className={styles.step} style={{ "--w": `${100 - i * 22}%` } as CSSProperties}>
            <span className={styles.value}>{s.value}</span>
            <span className={styles.stepLabel}>{s.label}</span>
          </li>
        ))}
      </ol>
      <p className={styles.funnelNote}>
        <span className={styles.big}>0.01%</span>
        <span>of the universe gets a full model, built on a fraction of the available data.</span>
      </p>
    </Frame>
  );
}

// A company at the centre, its customers, suppliers and shareholders around it, and theirs beyond.
function Chain({ full }: { full: boolean }) {
  const ring = (n: number, r: number, offset: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = offset + (i / n) * Math.PI * 2;
      return [Math.round(80 + r * Math.cos(a)), Math.round(80 + r * Math.sin(a))] as const;
    });
  const inner = ring(6, 40, -Math.PI / 2);
  const outer = ring(12, 68, -Math.PI / 2 + Math.PI / 12);
  const ink = full ? "var(--navy)" : "rgb(26 50 99 / 0.14)";
  return (
    <svg viewBox="0 0 160 160" className={styles.mini} aria-hidden="true">
      {inner.map(([x, y]) => (
        <line key={`c${x}${y}`} x1="80" y1="80" x2={x} y2={y} stroke={ink} strokeWidth="1.3" />
      ))}
      {outer.map(([x, y], i) => {
        const [ix, iy] = inner[Math.floor(i / 2)];
        return <line key={`o${x}${y}`} x1={ix} y1={iy} x2={x} y2={y} stroke={ink} strokeWidth="1.1" />;
      })}
      {[...outer, ...inner].map(([x, y], i) => (
        <circle
          key={`n${x}${y}`}
          cx={x}
          cy={y}
          r={i >= outer.length ? 5.5 : 4.5}
          fill={full ? (i % 5 === 0 ? "var(--amber)" : "var(--navy)") : "rgb(26 50 99 / 0.14)"}
          stroke="var(--raised)"
          strokeWidth="2"
        />
      ))}
      <circle cx="80" cy="80" r="9" fill="var(--navy)" stroke="var(--amber)" strokeWidth="3" />
    </svg>
  );
}

/** What gets researched today, against what unlimited research labor can reach. */
export function ResearchChain() {
  return (
    <Frame
      label="Today one company is researched from its own filings. With unlimited research labor, its customers, suppliers, and shareholders, and theirs, are researched too."
      caption="Research reach around one company: its customers, suppliers, and shareholders, and theirs."
    >
      <div className={styles.panels} data-count="2">
        <div className={styles.panel}>
          <Chain full={false} />
          <p className={styles.panelText}>
            <strong>Today</strong>
            <span>One company, mostly from its own filings.</span>
          </p>
        </div>
        <div className={styles.panel} data-accent="">
          <Chain full />
          <p className={styles.panelText}>
            <strong>With unlimited labor</strong>
            <span>The whole chain, and the decisions that shaped it.</span>
          </p>
        </div>
      </div>
    </Frame>
  );
}
