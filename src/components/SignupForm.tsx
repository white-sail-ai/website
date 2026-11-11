"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { submitForm } from "@/lib/forms";
import { site } from "@/lib/site";
import { Arrow } from "./Arrow";
import styles from "./SignupForm.module.css";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email";
  required?: boolean;
  autoComplete?: string;
  multiline?: boolean;
};

type Props = {
  endpoint: "/early-access" | "/newsletter";
  fields: Field[];
  submitLabel: string;
  successTitle: string;
  successText: string;
  note?: string;
};

export function SignupForm({ endpoint, fields, submitLabel, successTitle, successText, note }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  // null: no error. An empty string: the request failed on our side, so offer our address.
  const [error, setError] = useState<string | null>(null);
  const sending = status === "sending";

  // Typed values survive closing the dialog, but an old error shouldn't greet the visitor
  // when they come back.
  useEffect(() => {
    const dialog = formRef.current?.closest("dialog");
    const clear = () => setError(null);
    dialog?.addEventListener("close", clear);
    return () => dialog?.removeEventListener("close", clear);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setStatus("sending");
    setError(null);
    const result = await submitForm(endpoint, data);
    if (result.ok) {
      setStatus("done");
    } else {
      setStatus("idle");
      setError(result.message ?? "");
    }
  }

  if (status === "done") {
    return (
      <div className={styles.done} role="status">
        <strong>{successTitle}</strong>
        <p>{successText}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
      {fields.map((f) => (
        <label key={f.name} className={styles.field}>
          <span className={styles.label}>
            {f.label}
            {!f.required && <span className={styles.optional}> (optional)</span>}
          </span>
          {f.multiline ? (
            <textarea name={f.name} rows={3} maxLength={1000} className={styles.input} />
          ) : (
            <input
              name={f.name}
              type={f.type ?? "text"}
              required={f.required}
              maxLength={254}
              autoComplete={f.autoComplete}
              className={styles.input}
            />
          )}
        </label>
      ))}
      {/* Honeypot: invisible to people, tempting to bots. The server drops anything filled in. */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className={styles.trap}
      />
      {error !== null && (
        <p className={styles.error} role="alert">
          {error || (
            <>
              We couldn’t send this. Please try again, or email us at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </>
          )}
        </p>
      )}
      {/* aria-disabled rather than disabled, so keyboard focus stays on the button while sending. */}
      <button type="submit" className={`button button-primary ${styles.submit}`} aria-disabled={sending}>
        {sending ? "Sending…" : submitLabel} <Arrow />
      </button>
      <p className={styles.note}>
        {note && <>{note} </>}
        <a href="/privacy" target="_blank" className={styles.noteLink}>
          Privacy policy
        </a>
      </p>
    </form>
  );
}
