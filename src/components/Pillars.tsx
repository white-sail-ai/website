import styles from "./Pillars.module.css";

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

function CompoundingGlyph() {
  return (
    <svg viewBox="0 0 48 48" className={styles.glyph} aria-hidden="true">
      <path d="M3 45 L45 45" className={styles.faint} />
      <path d="M3 44 C 22 43, 34 34, 43 6" />
      <circle cx="14" cy="42.6" r="1.8" className={styles.dot} />
      <circle cx="26" cy="38.6" r="1.8" className={styles.dot} />
      <circle cx="35" cy="28.6" r="1.8" className={styles.dot} />
      <circle cx="43" cy="6" r="3" className={styles.accent} />
    </svg>
  );
}

const pillars = [
  { label: "Depth", line: "Every investor is now a quant.", Glyph: DepthGlyph },
  { label: "Scale", line: "The whole universe as a watchlist.", Glyph: ScaleGlyph },
  { label: "Compounding", line: "Research that never resets.", Glyph: CompoundingGlyph },
];

export function Pillars() {
  return (
    <ul className={styles.pillars}>
      {pillars.map(({ label, line, Glyph }) => (
        <li key={label} className={styles.pillar}>
          <Glyph />
          <span className={styles.label}>{label}</span>
          <span className={styles.line}>{line}</span>
        </li>
      ))}
    </ul>
  );
}
