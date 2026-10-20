"use client";

import { useState } from "react";
import { jobs } from "@/lib/site";
import { Dialog } from "./Dialog";
import dialogStyles from "./Dialog.module.css";
import { EmailOptions } from "./EmailOptions";
import styles from "./CareersButton.module.css";

export function CareersButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const close = () => {
    setOpen(false);
    setSending(false);
  };

  const subject = role ? `Application: ${role}` : "Application";
  const body = `Hi Whitesail team,\n\nI'd like to apply${role ? ` for the ${role} role` : ""}.\n\nLinkedIn / CV:\n`;

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        Careers
      </button>
      <Dialog open={open} onClose={close} eyebrow="Careers" title="Build the live map with us.">
        <p className={dialogStyles.lede}>Open roles in New York and Tel-Aviv. Pick one and send us a note.</p>

        <fieldset className={styles.jobs}>
          <legend className={styles.legend}>Open roles</legend>
          {jobs.map((job) => (
            <label key={job.title} className={styles.job}>
              <input
                type="radio"
                name="role"
                value={job.title}
                checked={role === job.title}
                onChange={() => setRole(job.title)}
                className={styles.radio}
              />
              <span className={styles.jobText}>
                <span className={styles.jobTitle}>{job.title}</span>
                <span className={styles.location}>
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M8 14.5s-4.5-4.2-4.5-7.5a4.5 4.5 0 0 1 9 0c0 3.3-4.5 7.5-4.5 7.5Z" />
                    <circle cx="8" cy="7" r="1.6" />
                  </svg>
                  {job.location}
                </span>
              </span>
              <span className={styles.check} aria-hidden="true" />
            </label>
          ))}
        </fieldset>

        {sending ? (
          // On short screens the options land below the fold, so bring them into view.
          <div ref={(el) => el?.scrollIntoView({ behavior: "smooth", block: "nearest" })}>
            <EmailOptions subject={subject} body={body} />
            <p className={styles.hint}>Attach your CV or include a link to your LinkedIn.</p>
          </div>
        ) : (
          <button
            type="button"
            className={`button button-primary ${styles.send}`}
            onClick={() => setSending(true)}
          >
            Send application <span className="arrow">→</span>
          </button>
        )}
      </Dialog>
    </>
  );
}
