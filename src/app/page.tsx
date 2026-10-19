import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MarketMap } from "@/components/MarketMap";
import { Pillars } from "@/components/Pillars";
import { site } from "@/lib/site";
import styles from "./page.module.css";

// A single screen: the copy on top, and the live market map in its own band filling the rest.
export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.intro}>
          <div className={styles.lead}>
            <h1 className={styles.title}>{site.tagline}.</h1>
            <a href={site.contactHref} className="button button-primary">
              Get in touch <span className="arrow">→</span>
            </a>
          </div>
          <div className={styles.pillars}>
            <Pillars />
          </div>
        </div>
        <div className={styles.map}>
          <MarketMap />
        </div>
      </main>
      <Footer />
    </div>
  );
}
