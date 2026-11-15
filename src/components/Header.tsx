import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { SiteNav } from "./SiteNav";
import styles from "./Header.module.css";

/** The chart's navy band: the logo, the page's sections, and early access. */
export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.home} aria-label={`${site.name}, home`}>
        <Logo />
      </Link>
      <SiteNav />
    </header>
  );
}
