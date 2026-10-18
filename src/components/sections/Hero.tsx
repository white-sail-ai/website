import { site } from "@/lib/site";
import { MarketMap } from "../MarketMap";
import styles from "./Hero.module.css";

const audiences = ["Financial services", "Corporates", "Governments"];

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={`container ${styles.intro}`}>
        <span className={`eyebrow ${styles.rise}`}>{site.legalName}</span>
        <div className={styles.grid}>
          <h1 className={`display ${styles.title} ${styles.rise}`}>{site.tagline}.</h1>
          <div className={`${styles.aside} ${styles.rise}`}>
            <p className="lede">{site.description}</p>
            <div className={styles.actions}>
              <a href="#contact" className="button button-primary">
                Get in touch <span className="arrow">→</span>
              </a>
              <a href="#careers" className="button button-ghost">
                We’re hiring
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.map} ${styles.rise}`}>
        <MarketMap />
      </div>

      <div className="container">
        <dl className={styles.audience}>
          <dt className={styles.audienceLabel}>Built for</dt>
          {audiences.map((a) => (
            <dd key={a} className={styles.audienceItem}>
              {a}
            </dd>
          ))}
        </dl>
      </div>
    </section>
  );
}
