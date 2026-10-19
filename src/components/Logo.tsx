import styles from "./Logo.module.css";

// Wordmark stand-in, set like the deck cover (Montserrat Bold, uppercase).
// Replace with the logo files from the deck once they are added to /public.
export function Logo() {
  return (
    <span className={styles.logo} aria-label="Whitesail">
      Whitesail
    </span>
  );
}
