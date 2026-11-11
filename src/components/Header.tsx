import Link from "next/link";
import { site } from "@/lib/site";
import { CareersButton } from "./CareersButton";
import { ContactButton } from "./ContactButton";
import { EarlyAccessButton } from "./EarlyAccessButton";
import { Logo } from "./Logo";
import styles from "./Header.module.css";

/** The chart's navy band: the logo, the page's sections, and early access. */
export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.home} aria-label={`${site.name}, home`}>
        <Logo />
      </Link>
      <nav className={styles.nav} aria-label="Main">
        <Link href="/#who-we-are" className={`hit-area ${styles.link}`}>
          Who we are
        </Link>
        <Link href="/#capabilities" className={`hit-area ${styles.link}`}>
          Capabilities
        </Link>
        <CareersButton className={`hit-area ${styles.link}`} />
        <ContactButton className={`hit-area ${styles.link}`} label="Contact" />
        <EarlyAccessButton className={`button ${styles.cta}`} />
      </nav>
    </header>
  );
}
