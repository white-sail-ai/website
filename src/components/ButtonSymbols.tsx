import { useId } from "react";
import styles from "./ButtonSymbols.module.css";

// Small symbols for the call-to-action buttons. They animate when their button is hovered or
// focused (see the stylesheet), and are hidden from screen readers so the label stays the name.

// The brand sail with its wind lines: on hover the wind picks up and the sail leans into it.
export function SailSymbol() {
  return (
    <svg className={`${styles.symbol} ${styles.sail}`} viewBox="122 116 382 390" aria-hidden="true">
      <g className={styles.wind}>
        <path className={styles.gust} d="M302.952 169H233.726" />
        <path className={styles.gust} d="M211.717 230H142.491" />
        <path className={styles.gust} d="M257.334 291H188.109" />
      </g>
      <path
        className={styles.canvas}
        d="M457.192 481.78C500.075 352.231 497.886 271.239 468.271 145.981C465.039 132.31 446.892 129.636 439.289 141.567C352.657 277.505 282.146 357.897 146.558 462.131C134.311 471.546 140.577 491.299 155.948 491.374L441.868 492.778C448.786 492.812 455.012 488.367 457.192 481.78Z"
      />
    </svg>
  );
}

// An envelope: on hover the flap opens and a letter peeks out.
export function EnvelopeSymbol() {
  const mouth = `${useId()}-mouth`;
  return (
    <svg className={`${styles.symbol} ${styles.envelope}`} viewBox="0 0 20 16" aria-hidden="true">
      <defs>
        {/* Only the part of the letter above the envelope's mouth shows. */}
        <clipPath id={mouth}>
          <rect x="0" y="-8" width="20" height="12.6" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${mouth})`}>
        <g className={styles.letter}>
          <rect x="5" y="5" width="10" height="8" rx="0.8" />
          <path d="M7.2 7.4h5.6M7.2 9.4h3.6" />
        </g>
      </g>
      <rect className={styles.body} x="1.5" y="4.5" width="17" height="10" rx="1.6" />
      <path className={styles.flap} d="M2 5 10 10.5 18 5" />
    </svg>
  );
}
