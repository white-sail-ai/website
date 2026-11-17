import type { ReactNode } from "react";
import { NewsletterButton } from "../NewsletterButton";
import styles from "./FollowAlong.module.css";

/** The newsletter call to action that closes a post: its own text, then the site's sign-up dialog. */
export function FollowAlong({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.box} aria-labelledby="follow-along">
      <h2 id="follow-along" className={styles.title}>
        {title}
      </h2>
      <div className={styles.text}>{children}</div>
      <NewsletterButton className="button button-primary" symbol />
    </section>
  );
}
