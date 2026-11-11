import { site } from "@/lib/site";
import styles from "./WhoWeAre.module.css";

// The two teams, then the fleet they build together; the fleet's rule is amber, the colour of
// the agents' signals on the map.
const team = [
  {
    title: "Applied AI Engineers",
    text: "Our engineers are intelligence-agency veterans with expertise in applying AI to critical real-world problems, effectively and responsibly.",
  },
  {
    title: "Business Engineers",
    text: "Domain experts who frame the problem, define the solution you need, and steer the agents to make it happen.",
  },
  {
    title: "Always-on Agents Fleet",
    text: "Built by both teams, the agents bring AI engineering and domain expertise to your questions, around the clock.",
    built: true,
  },
];

// The navy band below the hero: the lab in one sentence, then who does the work.
export function WhoWeAre() {
  return (
    <section id="who-we-are" aria-labelledby="who-we-are-title" className={styles.section}>
      <h2 id="who-we-are-title" className={styles.title}>
        Who we are
      </h2>
      <div className={styles.body}>
        <p className={styles.statement}>{site.name} is an independent market research lab.</p>
        <div className={styles.columns}>
          {team.map(({ title, text, built }) => (
            <div key={title} className={`${styles.column} ${built ? styles.built : ""}`}>
              <h3 className={styles.heading}>{title}</h3>
              <p className={styles.text}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
