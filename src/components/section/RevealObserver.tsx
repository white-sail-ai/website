"use client";

import { useEffect } from "react";

/**
 * Reveals every element marked data-reveal once it scrolls into view, by setting data-shown on it.
 * The hiding itself only applies once this has run (it marks the root), so without JavaScript, or
 * with reduced motion, everything simply shows.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const watcher = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "";
          watcher.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    // Anything already above the fold's bottom edge on load shows at once, without animating in.
    targets.forEach((target) => {
      if (target.getBoundingClientRect().top < innerHeight * 0.88) target.dataset.shown = "";
      else watcher.observe(target);
    });
    root.dataset.reveal = "";
    return () => {
      watcher.disconnect();
      delete root.dataset.reveal;
    };
  }, []);

  return null;
}
