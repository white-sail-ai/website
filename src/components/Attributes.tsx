import styles from "./Attributes.module.css";

function DepthGlyph() {
  return (
    <svg viewBox="0 0 48 48" className={styles.glyph} aria-hidden="true">
      <circle cx="24" cy="24" r="21" />
      <circle cx="24" cy="24" r="14" />
      <circle cx="24" cy="24" r="7" />
      <circle cx="24" cy="24" r="3" className={styles.accent} />
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
          className={lit.has(i) ? styles.accent : styles.dot}
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
      <path d="M24 11 V24 L33 30" />
      <circle cx="24" cy="24" r="3" className={styles.accent} />
    </svg>
  );
}

// The shared map as stacked layers, with the firm's own layer on top.
function JudgmentGlyph() {
  return (
    <svg viewBox="0 0 48 48" className={styles.glyph} aria-hidden="true">
      <path d="M4 30 L24 40 L44 30" className={styles.faint} />
      <path d="M4 23 L24 33 L44 23" />
      <path d="M24 6 L44 16 L24 26 L4 16 Z" />
      <circle cx="24" cy="16" r="3" className={styles.accent} />
    </svg>
  );
}

const attributes = [
  { label: "In depth", line: "Signals once reserved for quant hedge funds.", Glyph: DepthGlyph },
  {
    label: "At scale",
    line: "Every company in your universe, researched. No more screening.",
    Glyph: ScaleGlyph,
  },
  { label: "All the time", line: "Research agents work your mandate 24/7.", Glyph: AlwaysOnGlyph },
  {
    label: "Your judgment",
    line: "Manage your own layers. Run your own judgment.",
    Glyph: JudgmentGlyph,
  },
];

export function Attributes() {
  return (
    <ul className={styles.attributes}>
      {attributes.map(({ label, line, Glyph }) => (
        <li key={label} className={styles.attribute}>
          <Glyph />
          <span className={styles.label}>{label}</span>
          <span className={styles.line}>{line}</span>
        </li>
      ))}
    </ul>
  );
}
