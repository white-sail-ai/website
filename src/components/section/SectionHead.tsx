import type { CSSProperties, ReactNode } from "react";
import styles from "./Section.module.css";

type Props = {
  /** The step marker's number, as the hero numbers each company in its ripple. */
  step: string;
  tag: string;
  id: string;
  children: ReactNode;
  tone?: "paper" | "navy";
};

/**
 * A section's head in the hero's own marks: an amber-ringed step marker and an uppercase tag with
 * a rule that draws out after it, then the section's statement.
 */
export function SectionHead({ step, tag, id, children, tone = "paper" }: Props) {
  return (
    <div className={styles.head} data-tone={tone}>
      <p className={styles.tag} data-reveal="fade">
        <span className={styles.marker} aria-hidden="true">
          {step}
        </span>
        {tag}
        <span className={styles.rule} data-reveal="rule" style={{ "--d": "0.15s" } as CSSProperties} />
      </p>
      <h2 id={id} className={styles.statement} data-reveal="rise" style={{ "--d": "0.1s" } as CSSProperties}>
        {children}
      </h2>
    </div>
  );
}
