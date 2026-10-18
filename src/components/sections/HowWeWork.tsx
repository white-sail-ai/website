import { Reveal } from "../Reveal";
import styles from "./HowWeWork.module.css";

const teams = [
  {
    where: "Central",
    title: "Applied AI lab",
    body: "Sources and processes unique signals, and maps the relationships between them at global scale.",
  },
  {
    where: "At each firm",
    title: (
      <>
        <span className={styles.nowrap}>Forward-deployed</span> engineers
      </>
    ),
    body: "Deploy and customize the platform inside each firm.",
  },
  {
    where: "At each firm",
    title: (
      <>
        <span className={styles.nowrap}>Forward-deployed</span> analysts
      </>
    ),
    body: "Encode each firm’s investment philosophy and judgment layers.",
  },
];

const customer = [
  "Gets the shared global market map",
  "Adds its own judgment and philosophy",
  "Runs customized agents and apps on its own instance",
];

export function HowWeWork() {
  return (
    <section id="how-we-work" className={`section ${styles.section}`}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className="eyebrow">03 · How we work</span>
          <h2 className="h2">One lab builds the map. Field teams tailor it.</h2>
        </Reveal>

        <div className={styles.grid}>
          {teams.map((team, i) => (
            <Reveal key={i} delay={i * 90} className={styles.team}>
              <div className={styles.meta}>
                <span className="num">0{i + 1}</span>
                <span className={styles.where}>{team.where}</span>
              </div>
              <h3 className={styles.title}>{team.title}</h3>
              <p className={styles.body}>{team.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.customer}>
          <h3 className={styles.customerTitle}>Every customer</h3>
          <ul className={styles.list}>
            {customer.map((item) => (
              <li key={item} className={styles.item}>
                <svg viewBox="0 0 16 16" className={styles.check} aria-hidden="true">
                  <path d="M3 8.5 L6.5 12 L13 4.5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
