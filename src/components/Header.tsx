"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";
import styles from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand}>
          <Logo />
        </a>
        <nav className={styles.nav} aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className={`button button-primary ${styles.cta}`}>
          Get in touch
        </a>
      </div>
    </header>
  );
}
