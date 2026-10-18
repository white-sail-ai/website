import { Reveal } from "../Reveal";
import styles from "./Team.module.css";

const backgrounds = ["Unit 8200", "Harvard Business School", "NCR"];

const expertise = [
  {
    area: "Applied AI",
    body: "Founded and led applied AI labs at Unit 8200 and NCR.",
  },
  {
    area: "Asset management",
    body: "Leads an asset management firm, bringing proprietary data and an extensive industry network.",
  },
  {
    area: "Infrastructure",
    body: "Cybersecurity at Unit 8200 and leadership of large-scale compute infrastructure.",
  },
];

export function Team() {
  return (
    <section id="team" className="section">
      <div className="container">
        <Reveal className={styles.head}>
          <span className="eyebrow">04 · Team</span>
          <h2 className="h2">Deep expertise in AI, asset management and infrastructure.</h2>
        </Reveal>

        <Reveal className={styles.backgrounds}>
          <p className={styles.backgroundsLabel}>Founding team backgrounds</p>
          <ul className={styles.names}>
            {backgrounds.map((name) => (
              <li key={name} className={styles.name}>
                {name}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className={styles.grid}>
          {expertise.map((item, i) => (
            <Reveal key={item.area} delay={i * 90} className={styles.cell}>
              <h3 className={styles.area}>{item.area}</h3>
              <p className={styles.body}>{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
