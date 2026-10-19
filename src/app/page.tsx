import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MarketMap } from "@/components/MarketMap";
import { Pillars } from "@/components/Pillars";
import { site } from "@/lib/site";
import styles from "./page.module.css";

// A single screen: the live market map runs behind everything, the copy sits on a
// translucent panel at the top, and the middle stays open onto the map.
export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.map}>
        <MarketMap />
      </div>
      <div className={`glass ${styles.panel}`}>
        <Header />
        <main className={styles.intro}>
          <div className={styles.lead}>
            <h1 className={styles.title}>{site.tagline}.</h1>
            <a href={site.contactHref} className="button button-primary">
              Get in touch <span className="arrow">→</span>
            </a>
          </div>
          <div className={styles.pillars}>
            <Pillars />
          </div>
        </main>
      </div>
      <div className={styles.window}>
        <span className={styles.caption}>
          <span className={styles.live} aria-hidden="true" />
          Live market map
        </span>
        <span className={`${styles.caption} ${styles.legend}`}>
          Companies · Markets · Relationships
        </span>
      </div>
      <Footer />
    </div>
  );
}
