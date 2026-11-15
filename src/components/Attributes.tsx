import type { CSSProperties } from "react";
import { SectionHead } from "./section/SectionHead";
import styles from "./Attributes.module.css";

// Each glyph plays a small motion once as its cell scrolls in: the rings open out, the grid's dots
// light up in turn, the clock's hand sweeps round, the layers settle onto the stack.

export function DepthGlyph() {
  return (
    <svg viewBox="0 0 48 48" className={styles.glyph} aria-hidden="true">
      {[21, 14, 7].map((r, k) => (
        <circle key={r} cx="24" cy="24" r={r} className={styles.ring} style={{ "--k": 2 - k } as CSSProperties} />
      ))}
      <circle cx="24" cy="24" r="3" className={`${styles.accent} ${styles.ring}`} style={{ "--k": 3 } as CSSProperties} />
    </svg>
  );
}

function ScaleGlyph() {
  const lit = new Set([7, 13, 21]);
  return (
    <svg viewBox="0 0 48 48" className={styles.glyph} aria-hidden="true">
      {Array.from({ length: 25 }, (_, i) => (
        <circle
          key={i}
          cx={6 + (i % 5) * 9}
          cy={6 + Math.floor(i / 5) * 9}
          r={lit.has(i) ? 3 : 2}
          className={`${styles.cellDot} ${lit.has(i) ? styles.accent : styles.dot}`}
          style={{ "--k": (i % 5) + Math.floor(i / 5) } as CSSProperties}
        />
      ))}
    </svg>
  );
}

// A clock face: research that runs around the clock.
function AlwaysOnGlyph() {
  return (
    <svg viewBox="0 0 48 48" className={styles.glyph} aria-hidden="true">
      <circle cx="24" cy="24" r="21" />
      <path d="M24 3 V7 M45 24 H41 M24 45 V41 M3 24 H7" className={styles.faint} />
      <path d="M24 11 V24 L33 30" className={styles.hand} />
      <circle cx="24" cy="24" r="3" className={styles.accent} />
    </svg>
  );
}

// The shared map as stacked layers, with the client's own layer on top.
function JudgmentGlyph() {
  return (
    <svg viewBox="0 0 48 48" className={styles.glyph} aria-hidden="true">
      <path d="M4 30 L24 40 L44 30" className={`${styles.faint} ${styles.layer}`} style={{ "--k": 0 } as CSSProperties} />
      <path d="M4 23 L24 33 L44 23" className={styles.layer} style={{ "--k": 1 } as CSSProperties} />
      <g className={styles.layer} style={{ "--k": 2 } as CSSProperties}>
        <path d="M24 6 L44 16 L24 26 L4 16 Z" />
        <circle cx="24" cy="16" r="3" className={styles.accent} />
      </g>
    </svg>
  );
}

const attributes = [
  { label: "In depth", line: "Integrate signals once reserved for quant hedge funds.", Glyph: DepthGlyph },
  {
    label: "At scale",
    line: "Research every company and market you care about. No more shortlists.",
    Glyph: ScaleGlyph,
  },
  { label: "All the time", line: "Research agents work your questions 24/7.", Glyph: AlwaysOnGlyph },
  {
    label: "Your judgment",
    line: "Manage your own layers. Apply your own judgment.",
    Glyph: JudgmentGlyph,
  },
];

/**
 * What the lab delivers: four capabilities set as the cells of a chart's key, one ruled frame
 * divided into four, linked from the header as Capabilities.
 */
export function Attributes() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className={styles.section}>
      <SectionHead step="2" tag="Capabilities" id="capabilities-title">
        Research that keeps running.
      </SectionHead>
      <ul className={styles.attributes} data-reveal="unroll">
        {attributes.map(({ label, line, Glyph }, index) => (
          <li
            key={label}
            className={styles.attribute}
            style={{ "--d": `${0.1 + index * 0.08}s` } as CSSProperties}
          >
            <Glyph />
            <span className={styles.label}>{label}</span>
            <span className={styles.line}>{line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
