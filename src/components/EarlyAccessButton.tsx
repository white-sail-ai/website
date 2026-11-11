"use client";

import { useState } from "react";
import { Dialog } from "./Dialog";
import dialogStyles from "./Dialog.module.css";
import { SignupForm } from "./SignupForm";

/** Opens the early-access dialog and its sign-up form. */
export function EarlyAccessButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        Request early access
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} eyebrow="Early access" title="Be among the first.">
        <p className={dialogStyles.lede}>
          Tell us who you are and we’ll reply within 1 business day.
        </p>
        <SignupForm
          endpoint="/early-access"
          submitLabel="Request access"
          successTitle="You’re on the list."
          successText="Thanks. We’ll reply by email within 1 business day."
          note="We’ll only use your details to contact you about White Sail Labs."
          fields={[
            { name: "name", label: "Name", required: true, autoComplete: "name" },
            { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
            { name: "firm", label: "Company", required: true, autoComplete: "organization" },
            { name: "message", label: "What decisions do you want better informed?", multiline: true },
          ]}
        />
      </Dialog>
    </>
  );
}
