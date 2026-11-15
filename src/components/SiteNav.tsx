"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { CareersButton } from "./CareersButton";
import { ContactButton } from "./ContactButton";
import { EarlyAccessButton } from "./EarlyAccessButton";
import styles from "./SiteNav.module.css";

type MenuId = "explore";

const MENUS: { id: MenuId; label: string }[] = [{ id: "explore", label: "Explore" }];

// The page's three sections, each numbered as its own head is.
const SECTIONS = [
  {
    step: "1",
    title: "Who we are",
    line: "Applied AI and business engineers, and the agents they build.",
    href: "/#who-we-are",
  },
  {
    step: "2",
    title: "Capabilities",
    line: "In depth, at scale, all the time, and always your judgment.",
    href: "/#capabilities",
  },
  { step: "3", title: "Built for", line: "Investors, CEOs, and strategists.", href: "/#built-for" },
];

/** How long the pointer may stray off the menu before it closes, so a diagonal move does not drop it. */
const CLOSE_DELAY = 140;

/**
 * The band's navigation. On wide screens a pill glides under whichever item the pointer is on, and
 * Explore opens a panel of the page's sections (a panel that would resize and slide between menus,
 * were there more than one). On narrow screens it folds into a sheet behind a menu button.
 */
export function SiteNav() {
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef(new Map<MenuId, HTMLDivElement>());
  const triggerRefs = useRef(new Map<MenuId, HTMLButtonElement>());
  const closeTimer = useRef<number>(undefined);
  const [open, setOpen] = useState<MenuId | null>(null);
  const [sheet, setSheet] = useState(false);
  const order = MENUS.map((menu) => menu.id);

  /** Slide the pill under an item, or fade it out. The first show snaps into place rather than flying in. */
  const movePill = useCallback((target: HTMLElement | null) => {
    const pill = pillRef.current;
    const nav = navRef.current;
    if (!pill || !nav) return;
    if (!target) {
      delete pill.dataset.on;
      return;
    }
    const from = nav.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    if (!("on" in pill.dataset)) pill.dataset.snap = "";
    pill.style.width = `${box.width}px`;
    pill.style.transform = `translateX(${box.left - from.left}px)`;
    pill.dataset.on = "";
    requestAnimationFrame(() => delete pill.dataset.snap);
  }, []);

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => {
      setOpen(null);
      movePill(null);
    }, CLOSE_DELAY);
  };

  // Size the shared panel to the open menu and put it under its trigger, kept inside the band.
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const nav = navRef.current;
    if (!viewport || !nav || !open) return;
    const panel = panelRefs.current.get(open);
    const trigger = triggerRefs.current.get(open);
    if (!panel || !trigger) return;
    const navBox = nav.getBoundingClientRect();
    const box = trigger.getBoundingClientRect();
    const width = panel.offsetWidth;
    const left = Math.min(box.left - navBox.left - 12, navBox.width - width);
    viewport.style.width = `${width}px`;
    viewport.style.height = `${panel.offsetHeight}px`;
    viewport.style.setProperty("--x", `${Math.max(left, -navBox.left + 16)}px`);
  }, [open]);

  // Escape closes whatever is open and hands focus back to where it came from.
  useEffect(() => {
    if (!open && !sheet) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || document.querySelector("dialog[open]")) return;
      if (open) triggerRefs.current.get(open)?.focus();
      setOpen(null);
      setSheet(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, sheet]);

  // The sheet is for narrow screens only; widening the window puts the band back.
  useEffect(() => {
    if (!sheet) return;
    const wide = matchMedia("(min-width: 921px)");
    const shut = () => wide.matches && setSheet(false);
    wide.addEventListener("change", shut);
    return () => wide.removeEventListener("change", shut);
  }, [sheet]);

  const openMenu = (id: MenuId, trigger: HTMLElement) => {
    cancelClose();
    const viewport = viewportRef.current;
    // Opening from closed jumps straight to size; only a switch between menus morphs.
    if (viewport && !open) {
      viewport.dataset.snap = "";
      requestAnimationFrame(() => requestAnimationFrame(() => delete viewport.dataset.snap));
    }
    setOpen(id);
    movePill(trigger);
  };

  const panelState = (id: MenuId) => {
    if (id === open) return "active";
    if (!open) return "left";
    return order.indexOf(id) < order.indexOf(open) ? "left" : "right";
  };

  const closeAll = () => {
    setOpen(null);
    setSheet(false);
    movePill(null);
  };

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={`hit-area ${styles.burger}`}
        aria-expanded={sheet}
        aria-controls="site-nav"
        aria-label={sheet ? "Close menu" : "Open menu"}
        onClick={() => setSheet((value) => !value)}
      >
        <span className={styles.burgerLines} data-open={sheet ? "" : undefined} aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <nav
        id="site-nav"
        ref={navRef}
        className={styles.nav}
        data-sheet={sheet ? "" : undefined}
        aria-label="Main"
        onPointerLeave={closeSoon}
        onPointerEnter={cancelClose}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpen(null);
            movePill(null);
          }
        }}
      >
        <span ref={pillRef} className={styles.pill} aria-hidden="true" />

        <ul className={styles.list}>
          {MENUS.map((menu, index) => (
            <li key={menu.id} className={`${styles.item} ${styles.menuItem}`} style={{ "--i": index } as CSSProperties}>
              <button
                type="button"
                ref={(element) => {
                  if (element) triggerRefs.current.set(menu.id, element);
                }}
                className={`${styles.link} ${styles.trigger}`}
                aria-expanded={open === menu.id}
                aria-controls={`menu-${menu.id}`}
                onPointerEnter={(event) => event.pointerType === "mouse" && openMenu(menu.id, event.currentTarget)}
                onClick={(event) => (open === menu.id ? closeAll() : openMenu(menu.id, event.currentTarget))}
              >
                {menu.label}
                <svg viewBox="0 0 16 16" className={styles.chevron} aria-hidden="true">
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </button>
            </li>
          ))}
          {SECTIONS.map((section) => (
            <li key={section.href} className={`${styles.item} ${styles.sheetItem}`} style={{ "--i": section.step } as CSSProperties}>
              <Link href={section.href} className={styles.link} onClick={closeAll}>
                <span className={styles.sheetStep} aria-hidden="true">
                  {section.step}
                </span>
                {section.title}
              </Link>
            </li>
          ))}
          <li className={styles.item} style={{ "--i": 4 } as CSSProperties}>
            <span className={styles.plain} onPointerEnter={(event) => hoverPlain(event.currentTarget)}>
              <CareersButton className={styles.link} />
            </span>
          </li>
          <li className={styles.item} style={{ "--i": 5 } as CSSProperties}>
            <span className={styles.plain} onPointerEnter={(event) => hoverPlain(event.currentTarget)}>
              <ContactButton className={styles.link} label="Contact" />
            </span>
          </li>
          <li className={`${styles.item} ${styles.ctaItem}`} style={{ "--i": 6 } as CSSProperties}>
            <EarlyAccessButton className={`button ${styles.cta}`} />
          </li>
        </ul>

        <div ref={viewportRef} className={styles.viewport} data-open={open ? "" : undefined}>
          <Panel id="explore" state={panelState("explore")} panels={panelRefs}>
            {SECTIONS.map((section) => (
              <Option key={section.href} href={section.href} onPick={closeAll} title={section.title} line={section.line}>
                <span className={styles.step} aria-hidden="true">
                  {section.step}
                </span>
              </Option>
            ))}
          </Panel>
        </div>
      </nav>
    </div>
  );

  // A plain item (one that opens a dialog, not a menu) takes the pill and closes any open menu.
  function hoverPlain(element: HTMLElement) {
    cancelClose();
    setOpen(null);
    movePill(element);
  }
}

type PanelProps = {
  id: MenuId;
  state: "active" | "left" | "right";
  panels: React.RefObject<Map<MenuId, HTMLDivElement>>;
  children: ReactNode;
};

/** One menu's options, with a highlight that glides from option to option under the pointer. */
function Panel({ id, state, panels, children }: PanelProps) {
  const highlight = useRef<HTMLSpanElement>(null);

  const follow = (target: HTMLElement | null) => {
    const hl = highlight.current;
    if (!hl) return;
    if (!target) {
      delete hl.dataset.on;
      return;
    }
    if (!("on" in hl.dataset)) hl.dataset.snap = "";
    hl.style.width = `${target.offsetWidth}px`;
    hl.style.height = `${target.offsetHeight}px`;
    hl.style.transform = `translate(${target.offsetLeft}px, ${target.offsetTop}px)`;
    hl.dataset.on = "";
    requestAnimationFrame(() => delete hl.dataset.snap);
  };

  return (
    <div
      id={`menu-${id}`}
      ref={(element) => {
        if (element) panels.current.set(id, element);
      }}
      className={styles.panel}
      data-state={state}
      inert={state !== "active"}
      onPointerOver={(event) => follow((event.target as HTMLElement).closest("a"))}
      onFocus={(event) => follow((event.target as HTMLElement).closest("a"))}
      onPointerLeave={() => follow(null)}
    >
      <span ref={highlight} className={styles.highlight} aria-hidden="true" />
      {children}
    </div>
  );
}

type OptionProps = { href: string; title: string; line: string; onPick: () => void; children: ReactNode };

function Option({ href, title, line, onPick, children }: OptionProps) {
  return (
    <Link href={href} className={styles.option} onClick={onPick}>
      {children}
      <span className={styles.optionText}>
        <span className={styles.optionTitle}>{title}</span>
        <span className={styles.optionLine}>{line}</span>
      </span>
    </Link>
  );
}
