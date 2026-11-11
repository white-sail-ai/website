"use client";

import { useState } from "react";
import { Dialog } from "./Dialog";
import dialogStyles from "./Dialog.module.css";
import { EmailOptions } from "./EmailOptions";

/** Opens the contact dialog, which offers webmail and mail-app links to write to us. */
export function ContactButton({ className, label }: { className?: string; label: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {label}
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} eyebrow="Get in touch" title="Let’s talk.">
        <p className={dialogStyles.lede}>
          Tell us about your team and the decisions you want to get right. We reply within 1
          business day.
        </p>
        <EmailOptions subject="Hello White Sail Labs" />
      </Dialog>
    </>
  );
}
