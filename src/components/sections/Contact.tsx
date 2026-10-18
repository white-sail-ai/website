import { site } from "@/lib/site";
import { Reveal } from "../Reveal";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contact" className={`section dark ${styles.section}`}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className="eyebrow">Get in touch</span>
          <h2 className="display">Let’s map your universe.</h2>
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.card}>
            <h3 className={styles.title}>Work with us</h3>
            <p className={styles.body}>
              Tell us about your firm and the decisions you want to get right.
            </p>
            <a href={`mailto:${site.contactEmail}`} className="button button-amber">
              {site.contactEmail} <span className="arrow">→</span>
            </a>
          </Reveal>

          <Reveal delay={90} className={styles.card}>
            <h3 id="careers" className={styles.title}>
              Join us
            </h3>
            <p className={styles.body}>
              We’re hiring across the lab and the field: applied AI, engineering and
              investment analysis.
            </p>
            <a href={`mailto:${site.careersEmail}`} className="button button-ghost-dark">
              {site.careersEmail} <span className="arrow">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
