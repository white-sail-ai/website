"use client";

import { useState } from "react";
import { Dialog } from "./Dialog";
import dialogStyles from "./Dialog.module.css";
import { SignupForm } from "./SignupForm";

export function EarlyAccessButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className="button button-primary" onClick={() => setOpen(true)}>
        Request early access <span className="arrow">→</span>
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} eyebrow="Early access" title="Be among the first.">
        <p className={dialogStyles.lede}>
          Tell us who you are and we’ll reach out when your spot opens up.
        </p>
        <SignupForm
          endpoint="/early-access"
          submitLabel="Request access"
          successTitle="You’re on the list."
          successText="Thanks. We’ll be in touch by email."
          note="We’ll only use your details to contact you about Whitesail."
          fields={[
            { name: "name", label: "Name", required: true, autoComplete: "name" },
            { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
            { name: "firm", label: "Firm", required: true, autoComplete: "organization" },
            { name: "message", label: "What decisions do you want better informed?", multiline: true },
          ]}
        />
      </Dialog>
    </>
  );
}
