"use client";

import { useState } from "react";
import { Dialog } from "./Dialog";
import dialogStyles from "./Dialog.module.css";
import { EmailOptions } from "./EmailOptions";

export function ContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className="button button-primary" onClick={() => setOpen(true)}>
        Get in touch <span className="arrow">→</span>
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} eyebrow="Get in touch" title="Let’s talk.">
        <p className={dialogStyles.lede}>
          Tell us about your firm and the decisions you want to get right. We’ll get back to you
          shortly.
        </p>
        <EmailOptions subject="Hello Whitesail" />
      </Dialog>
    </>
  );
}
