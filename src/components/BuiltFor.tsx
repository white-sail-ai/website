import { ContactButton } from "./ContactButton";
import { EarlyAccessButton } from "./EarlyAccessButton";
import styles from "./BuiltFor.module.css";

// A rising price line over volume bars, the latest point lit.
function InvestorsGlyph() {
  return (
    <svg viewBox="0 0 48 48" className={styles.glyph} aria-hidden="true">
      <path d="M6 41H42" className={styles.faint} />
      <path d="M12 41V36M20 41V33M28 41V35M36 41V29" className={styles.faint} />
      <path d="M8 31L17 22L25 27L37 13" />
      <circle cx="37" cy="13" r="3.4" className={styles.accent} />
    </svg>
  );
}

// A ship's helm: the people who steer the company.
function HelmGlyph() {
  return (
    <svg viewBox="0 0 48 48" className={styles.glyph} aria-hidden="true">
      <circle cx="24" cy="24" r="13" />
      <path d="M29 24H44M27.54 27.54L38.14 38.14M24 29V44M20.46 27.54L9.86 38.14M19 24H4M20.46 20.46L9.86 9.86M24 19V4M27.54 20.46L38.14 9.86" />
      <path
        className={styles.handles}
        d="M37 24H43.5M33.19 33.19L37.78 37.78M24 37V43.5M14.81 33.19L10.22 37.78M11 24H4.5M14.81 14.81L10.22 10.22M24 11V4.5M33.19 14.81L37.78 10.22"
      />
      <circle cx="24" cy="24" r="3.4" className={styles.accent} />
    </svg>
  );
}

// A course plotted from a starting point, through a waypoint, to the destination.
function CourseGlyph() {
  return (
    <svg viewBox="0 0 48 48" className={styles.glyph} aria-hidden="true">
      <path d="M9 38C17 38 15 25 24 25S31 12 38 11" className={styles.dashed} />
      <circle cx="9" cy="38" r="2.6" />
      <circle cx="24" cy="25" r="2" className={styles.dot} />
      <circle cx="38" cy="11" r="7" className={styles.faint} />
      <circle cx="38" cy="11" r="3.4" className={styles.accent} />
    </svg>
  );
}

const audience = [
  { label: "Investors", Glyph: InvestorsGlyph },
  { label: "CEOs", Glyph: HelmGlyph },
  { label: "Strategists", Glyph: CourseGlyph },
];

// The closing section: who the research is for, each with its symbol on a navy tile like the
// app icon, then the two calls to action again.
export function BuiltFor() {
  return (
    <section aria-labelledby="built-for-title" className={styles.section}>
      <h2 id="built-for-title" className={styles.title}>
        Built for
      </h2>
      <div>
        <ul className={styles.audience}>
          {audience.map(({ label, Glyph }) => (
            <li key={label} className={styles.item}>
              <span className={styles.tile}>
                <Glyph />
              </span>
              <span className={styles.label}>{label}</span>
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <EarlyAccessButton className="button button-primary" />
          <ContactButton className="button button-ghost" label="Get in touch" />
        </div>
      </div>
    </section>
  );
}
