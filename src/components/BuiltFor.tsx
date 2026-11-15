import type { CSSProperties } from "react";
import { ContactButton } from "./ContactButton";
import { EarlyAccessButton } from "./EarlyAccessButton";
import { ChartPaper } from "./section/ChartPaper";
import { SectionHead } from "./section/SectionHead";
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
export function CourseGlyph() {
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

// The closing section, on navy like the header band so the page is bookended by it: who the
// research is for, each symbol on a cream tile, then the two calls to action again.
export function BuiltFor() {
  return (
    <section id="built-for" aria-labelledby="built-for-title" className={styles.section} data-band="navy">
      <ChartPaper ink="252 247 243" paper="26 50 99" moment={260} className={styles.paper} />
      <SectionHead step="3" tag="Built for" id="built-for-title" tone="navy">
        For decision-makers who act on research.
      </SectionHead>
      <ul className={styles.audience}>
        {audience.map(({ label, Glyph }, index) => (
          <li
            key={label}
            className={styles.item}
            data-reveal="rise"
            style={{ "--d": `${0.15 + index * 0.12}s` } as CSSProperties}
          >
            <span className={styles.tile}>
              <Glyph />
            </span>
            <span className={styles.label}>{label}</span>
          </li>
        ))}
      </ul>
      <div className={styles.actions} data-reveal="rise" style={{ "--d": "0.5s" } as CSSProperties}>
        <EarlyAccessButton className={`button ${styles.primary}`} />
        <ContactButton className={`button ${styles.secondary}`} label="Get in touch" />
        <p className={styles.reply}>We reply within 1 business day.</p>
      </div>
    </section>
  );
}
