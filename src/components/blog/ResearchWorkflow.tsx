import type { CSSProperties } from "react";
import styles from "./ResearchWorkflow.module.css";

// Investing, as one example of financial markets research: the seven stages a deal moves through,
// and the two places the work behind it is lost.
const STAGES = [
  { name: "Thesis", note: "A few themes, as many as a team can hold." },
  { name: "Sourcing & screening", note: "A short list cut from a vast universe." },
  { name: "Due diligence & research", note: "A few companies, a fraction of the data." },
  { name: "Investment committee", note: "Go, or pass." },
  { name: "Execution", note: "Terms agreed, deal closed." },
  { name: "Portfolio monitoring & operations", note: "A new team runs the position." },
  { name: "Exit", note: "Sell, list, or write off." },
];

function Stage({ index }: { index: number }) {
  const stage = STAGES[index];
  return (
    <div className={styles.stage} style={{ "--col": index + 1, "--d": `${0.15 + index * 0.07}s` } as CSSProperties}>
      <span className={styles.marker} aria-hidden="true">
        {index + 1}
      </span>
      <span className={styles.name}>{stage.name}</span>
      <span className={styles.note}>{stage.note}</span>
    </div>
  );
}

function Loss({ kind, children }: { kind: "passed" | "handoff"; children: string }) {
  return (
    <div className={styles.loss} data-kind={kind}>
      <span className={styles.lossCard}>
        <span className={styles.lossTag}>
          <svg viewBox="0 0 16 16" className={styles.lossIcon} aria-hidden="true">
            <circle cx="8" cy="8" r="6.5" />
            <path d="M5.6 5.6 L10.4 10.4 M10.4 5.6 L5.6 10.4" />
          </svg>
          Knowledge lost
        </span>
        <span className={styles.lossText}>{children}</span>
      </span>
    </div>
  );
}

export function ResearchWorkflow() {
  return (
    <figure className={styles.figure} data-reveal="unroll">
      <div className={styles.frame}>
        <div className={styles.flow}>
          <p className={styles.team} data-team="deal">
            Deal team
          </p>
          <Stage index={0} />
          <Stage index={1} />
          <Stage index={2} />
          <Stage index={3} />
          {/* Where the pass branch leaves the line, and where the deal changes hands. */}
          <span className={styles.drop} data-kind="passed" aria-hidden="true" />
          <span className={styles.drop} data-kind="handoff" aria-hidden="true" />
          <Loss kind="passed">Deal passed: research is shelved.</Loss>
          <Stage index={4} />
          <Loss kind="handoff">Deal team to ops team: thesis and assumptions stay behind.</Loss>
          <p className={styles.team} data-team="ops">
            Operating team
          </p>
          <Stage index={5} />
          <Stage index={6} />
        </div>
      </div>
      <figcaption className={styles.caption}>
        How investing works today, as one example of financial markets research.
      </figcaption>
    </figure>
  );
}
