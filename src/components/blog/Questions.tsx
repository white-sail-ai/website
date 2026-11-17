import type { ReactNode } from "react";
import styles from "./Questions.module.css";

export type Question = { q: string; a: ReactNode };

/**
 * A post's Q&A: each question opens to its answer. Add a question by adding an entry; the answers
 * stay in the page's HTML, closed or open, so search engines and find-in-page still reach them.
 */
export function Questions({ items }: { items: Question[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details key={item.q} className={styles.item}>
          <summary className={styles.summary}>
            <h3 className={styles.question}>{item.q}</h3>
            <span className={styles.icon} aria-hidden="true" />
          </summary>
          <div className={styles.answer}>{item.a}</div>
        </details>
      ))}
    </div>
  );
}
