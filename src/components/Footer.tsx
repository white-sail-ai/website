import { site } from "@/lib/site";
import styles from "./Footer.module.css";

export async function Footer() {
  "use cache";
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.legal}>
        <span>
          © {year} {site.legalName}
        </span>
        {/* Placeholder links: not routed yet. */}
        <a className={styles.link} aria-disabled="true">
          Privacy
        </a>
        <a className={styles.link} aria-disabled="true">
          Terms
        </a>
      </div>
      <span className={styles.status}>
        <span className={styles.live} aria-hidden="true" />
        Live market map
      </span>
    </footer>
  );
}
