import type { CSSProperties } from "react";
import { CompassGlyph, EngineersGlyph, FleetGlyph } from "./section/glyphs";
import { SectionHead } from "./section/SectionHead";
import styles from "./WhoWeAre.module.css";

// The two teams, then the fleet they build together. Each brief is the one-line version for the
// header's menu.
export const team = [
  {
    title: "Applied AI Engineers",
    brief: "Intelligence-agency veterans applying AI to critical problems.",
    text: "Our engineers are intelligence-agency veterans with expertise in applying AI to critical real-world problems, effectively and responsibly.",
  },
  {
    title: "Business Engineers",
    brief: "Domain experts who frame the problem and steer the agents.",
    text: "Domain experts who frame the problem, define the solution you need, and steer the agents to make it happen.",
  },
  {
    title: "Always-on Agents Fleet",
    brief: "Built by both teams, working your questions around the clock.",
    text: "Built by both teams, the agents bring AI engineering and domain expertise to your questions, around the clock.",
    built: true,
  },
];

const GLYPHS = [EngineersGlyph, CompassGlyph, FleetGlyph];

// Gold strands from each team's card down to the fleet's station, drawn as the hero draws its
// fronts. The drawing is 1000 by 140 and stretches only across, so the strands keep their weight.
const STRANDS = [-1.6, -0.5, 0.6, 1.7];

/**
 * Who does the work, set as a small ripple of its own: the two teams as stations on the chart,
 * their gold fronts converging on the fleet they build together.
 */
export function WhoWeAre() {
  const [ai, business, fleet] = team;
  return (
    <section id="who-we-are" aria-labelledby="who-we-are-title" className={styles.section}>
      <SectionHead step="1" tag="Who we are" id="who-we-are-title">
        An independent market research lab, of people and agents.
      </SectionHead>

      <div className={styles.diagram}>
        <Card member={ai} index={0} delay={0} />
        <Card member={business} index={1} delay={0.15} />

        <svg className={styles.fronts} viewBox="0 0 1000 140" preserveAspectRatio="none" data-reveal="fade" aria-hidden="true">
          {[250, 750].flatMap((from, side) =>
            STRANDS.map((offset, k) => (
              <path
                key={`${side}-${k}`}
                d={`M${from + offset * 9} 0 C${from + offset * 9} 85 ${500 + offset * 3} 55 ${500 + offset * 3} 112`}
                pathLength={1}
                style={{ "--k": k, "--side": side } as CSSProperties}
              />
            )),
          )}
        </svg>

        <Card member={fleet} index={2} delay={1.2} fleet />
      </div>
    </section>
  );
}

type CardProps = { member: (typeof team)[number]; index: number; delay: number; fleet?: boolean };

function Card({ member, index, delay, fleet }: CardProps) {
  const Glyph = GLYPHS[index];
  return (
    <article
      className={`${styles.card} ${fleet ? styles.fleet : ""}`}
      data-reveal="rise"
      style={{ "--d": `${delay}s` } as CSSProperties}
    >
      <span className={styles.station} aria-hidden="true">
        <Glyph className={styles.glyph} accentClass={styles.accent} />
      </span>
      <h3 className={styles.heading}>{member.title}</h3>
      <p className={styles.text}>{member.text}</p>
    </article>
  );
}
