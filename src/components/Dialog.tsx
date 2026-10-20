"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import styles from "./Dialog.module.css";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

// Native <dialog>: focus trap, Escape to close and a backdrop come for free.
export function Dialog({ open, onClose, eyebrow, title, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        // A click on the backdrop lands on the dialog element itself.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.heading}>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.5 3.5 L12.5 12.5 M12.5 3.5 L3.5 12.5" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
