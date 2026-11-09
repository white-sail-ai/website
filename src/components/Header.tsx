import { CareersButton } from "./CareersButton";
import { Logo } from "./Logo";
import { NewsletterButton } from "./NewsletterButton";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <nav className={styles.nav}>
        <NewsletterButton className={`${styles.link} ${styles.newsletter}`} />
        <CareersButton className={styles.link} />
      </nav>
    </header>
  );
}
