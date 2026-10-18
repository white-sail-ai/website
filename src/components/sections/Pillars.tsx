import { Reveal } from "../Reveal";
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
  {
    label: "Depth",
    title: "Every investor is now a quant.",
    body: "Signals once reserved for quant hedge funds, available to every team.",
    Glyph: DepthGlyph,
  },
  {
    label: "Scale",
    title: "The whole universe as a watchlist.",
    body: "Every company in the universe, researched. No more screening.",
    Glyph: ScaleGlyph,
  },
  {
    label: "Compounding",
    title: "Research that never resets.",
    body: "Every call is scored against what happens next, so judgment sharpens over time.",
    Glyph: CompoundingGlyph,
  },
];

export function Pillars() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className={styles.head}>
          <span className="eyebrow">02 · What changes</span>
          <h2 className="h2">Research that goes deeper, covers everything and never stops.</h2>
        </Reveal>

        <div className={styles.grid}>
          {pillars.map(({ label, title, body, Glyph }, i) => (
            <Reveal key={label} delay={i * 90} className={styles.pillar}>
              <Glyph />
              <span className="num">
                0{i + 1} · {label}
              </span>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.body}>{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.compare}>
          <div className={styles.compareRow}>
            <span className={styles.compareLabel}>Before</span>
            <p className={styles.before}>Knowledge resets on every transaction.</p>
          </div>
          <div className={styles.compareRow}>
            <span className={styles.compareLabel}>With Whitesail</span>
            <p className={styles.after}>Institutional knowledge compounds and stays live.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
