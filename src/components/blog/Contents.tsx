"use client";

import { useEffect, useState } from "react";
import styles from "./Contents.module.css";

export type Heading = { id: string; title: string };

/**
 * A gentle contents list. On wide screens it sits in the margin beside the text, stays in view, and
 * marks the section being read; on narrower screens it folds into a "Contents" line above the text.
 */
export function Contents({ items }: { items: Heading[] }) {
  const [active, setActive] = useState<string | null>(null);

  // The section being read is the last one whose heading has passed the top third of the screen.
  useEffect(() => {
    const headings = items.map((item) => document.getElementById(item.id)).filter((h): h is HTMLElement => h !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = innerHeight / 3;
      let current: string | null = null;
      for (const heading of headings) if (heading.getBoundingClientRect().top <= line) current = heading.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, [items]);

  const list = (
    <ol className={styles.list}>
      {items.map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`} className={styles.link} aria-current={active === item.id ? "location" : undefined}>
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <nav className={styles.rail} aria-label="Contents">
        <p className={styles.label}>Contents</p>
        {list}
      </nav>
      <details className={styles.fold}>
        <summary className={styles.summary}>Contents</summary>
        {list}
      </details>
    </>
  );
}
