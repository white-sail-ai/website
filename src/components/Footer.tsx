import { site } from "@/lib/site";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={`glass ${styles.footer}`}>
      <span>
        © {year} {site.legalName}
      </span>
      {/* Placeholder links: not routed yet. */}
      <nav className={styles.legal} aria-label="Legal">
        <a className={styles.link} aria-disabled="true">
          Privacy
        </a>
        <a className={styles.link} aria-disabled="true">
          Terms
        </a>
      </nav>
    </footer>
  );
}
