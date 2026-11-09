"use client";

import { useState, type FormEvent } from "react";
import { submitForm } from "@/lib/forms";
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
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setError(null);
    const result = await submitForm(endpoint, data);
    if (result.ok) {
      setStatus("done");
    } else {
      setStatus("idle");
      setError(result.message);
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
    <form className={styles.form} onSubmit={onSubmit}>
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
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        className={`button button-primary ${styles.submit}`}
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : submitLabel} <span className="arrow">→</span>
      </button>
      {note && <p className={styles.note}>{note}</p>}
    </form>
  );
}
