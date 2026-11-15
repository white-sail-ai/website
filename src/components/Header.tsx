"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { SiteNav } from "./SiteNav";
import styles from "./Header.module.css";

/**
 * The chart's navy band: the logo, the page's sections, and early access. It stays at the top as
 * the page scrolls, turning to frosted paper over the light sections (any marked data-header="light")
 * and back to navy over the dark ones.
 */
export function Header() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = header.offsetHeight / 2;
      const light = [...document.querySelectorAll<HTMLElement>('[data-header="light"]')].some((section) => {
        const box = section.getBoundingClientRect();
        return box.top <= middle && box.bottom >= middle;
      });
      header.dataset.theme = light ? "light" : "dark";
      header.toggleAttribute("data-scrolled", window.scrollY > 4);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header ref={ref} className={styles.header} data-theme="dark">
      <Link href="/" className={styles.home} aria-label={`${site.name}, home`}>
        <Logo />
      </Link>
      <SiteNav />
      <span className={styles.progress} aria-hidden="true" />
    </header>
  );
}
