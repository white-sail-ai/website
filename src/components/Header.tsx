import { site } from "@/lib/site";
import { Logo } from "./Logo";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <a href={site.careersHref} className={styles.link}>
        Careers
      </a>
    </header>
  );
}
