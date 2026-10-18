import styles from "./Logo.module.css";

// Wordmark stand-in, set like the deck cover (Montserrat Bold, uppercase).
// Replace with the logo files from the deck once they are added to /public.
export function Logo({ tone = "navy" }: { tone?: "navy" | "sand" }) {
  return (
    <span className={`${styles.logo} ${styles[tone]}`} aria-label="Whitesail">
      Whitesail
    </span>
  );
}
