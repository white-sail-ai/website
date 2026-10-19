import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MarketMap } from "@/components/MarketMap";
import { site } from "@/lib/site";
import styles from "./page.module.css";

// A single screen: the live market map fills the background, copy sits over its quiet side.
export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.map}>
        <MarketMap />
      </div>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>{site.tagline}.</h1>
        <p className={styles.lede}>{site.description}</p>
        <a href={site.contactHref} className="button button-primary">
          Get in touch <span className="arrow">→</span>
        </a>
      </main>
      <Footer />
    </div>
  );
}
