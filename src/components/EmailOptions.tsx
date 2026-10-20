import { composeLinks } from "@/lib/site";
import styles from "./EmailOptions.module.css";

// Opens a new email to us in whichever mail the visitor uses.
export function EmailOptions({ subject, body }: { subject: string; body?: string }) {
  return (
    <div className={styles.options}>
      <span className={styles.label}>Write to us with</span>
      <div className={styles.row}>
        {composeLinks(subject, body).map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`button ${i === 0 ? "button-primary" : "button-ghost"} ${styles.option}`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
