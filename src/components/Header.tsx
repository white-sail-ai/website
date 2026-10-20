import { CareersButton } from "./CareersButton";
import { Logo } from "./Logo";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <CareersButton className={styles.link} />
    </header>
  );
}
