import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./LegalPage.module.css";

type LegalPageProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

// The frame shared by the Privacy and Terms pages: the site header and footer around a
// readable column. Unlike the home page, these pages scroll.
export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>Last updated {updated}</p>
        <div className={styles.body}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
