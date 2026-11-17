import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={`glass ${styles.footer}`}>
      <span>
        © {year} {site.name}
      </span>
      <nav className={styles.legal} aria-label="Footer">
        <Link href="/blog" className={`hit-area ${styles.link}`}>
          Blog
        </Link>
        <Link href="/privacy" className={`hit-area ${styles.link}`}>
          Privacy
        </Link>
        <Link href="/terms" className={`hit-area ${styles.link}`}>
          Terms
        </Link>
      </nav>
    </footer>
  );
}
