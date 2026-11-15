"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { EnvelopeSymbol } from "./ButtonSymbols";
import { Dialog } from "./Dialog";
import dialogStyles from "./Dialog.module.css";
import { SignupForm } from "./SignupForm";

export function NewsletterButton({
  className,
  label = "Join our newsletter",
  symbol = false,
}: {
  className?: string;
  label?: string;
  symbol?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => {
          setOpen(true);
          track("dialog_opened", { dialog: "newsletter", label });
        }}>
        {symbol && <EnvelopeSymbol />}
        {label}
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} eyebrow="Newsletter" title="Join our newsletter.">
        <p className={dialogStyles.lede}>
          Occasional notes on research agents and live market maps. No spam.
        </p>
        <SignupForm
          endpoint="/newsletter"
          submitLabel="Subscribe"
          successTitle="Thanks for subscribing."
          successText="You’re on our list."
          note="You can unsubscribe at any time."
          fields={[{ name: "email", label: "Email", type: "email", required: true, autoComplete: "email" }]}
        />
      </Dialog>
    </>
  );
}
