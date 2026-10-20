import { Attributes } from "@/components/Attributes";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MarketMap } from "@/components/MarketMap";
import { site } from "@/lib/site";
import styles from "./page.module.css";

// A single screen: the live market map runs behind everything. The message sits on a
// translucent panel at the top, the attributes on a strip above the footer, and the
// middle stays open onto the map.
export default function Home() {
  const [lead, rest] = site.headline;
  const [problem, promise] = site.subline;

  return (
    <div className={styles.page}>
      <div className={styles.map}>
        <MarketMap />
      </div>
      <div className={`glass ${styles.panel}`}>
        <Header />
        <main className={styles.intro}>
          <h1 className={styles.title}>
            <span className={styles.titleLead}>{lead}</span> <span>{rest}</span>
          </h1>
          <div className={styles.aside}>
            <p className={styles.subline}>
              {problem} <strong>{promise}</strong>
            </p>
            <a href={site.contactHref} className="button button-primary">
              Get in touch <span className="arrow">→</span>
            </a>
          </div>
        </main>
      </div>
      <div className={styles.window}>
        <p className={styles.caption}>
          <span className={styles.live} aria-hidden="true" />
          <span>
            <strong>Live market maps</strong> power everything we deliver
            <span className={styles.captionDetail}>
              : every company, market, and trend you care about, mapped live by our agents
            </span>
            .
          </span>
        </p>
      </div>
      <div className={`glass ${styles.strip}`}>
        <Attributes />
      </div>
      <Footer />
    </div>
  );
}
