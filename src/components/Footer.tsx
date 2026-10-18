import { site } from "@/lib/site";
import { Logo } from "./Logo";
import styles from "./Footer.module.css";

export async function Footer() {
  "use cache";
  const year = new Date().getFullYear();

  return (
    <footer className={`dark ${styles.footer}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Logo tone="sand" />
          <p className={styles.tagline}>{site.tagline}.</p>
        </div>
        <div className={styles.meta}>
          {/* Placeholder links: not routed yet. */}
          <nav className={styles.legal} aria-label="Legal">
            <a className={styles.link} aria-disabled="true">
              Privacy
            </a>
            <a className={styles.link} aria-disabled="true">
              Terms
            </a>
          </nav>
          <p className={styles.copyright}>
            © {year} {site.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
