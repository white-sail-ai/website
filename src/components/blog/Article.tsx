import type { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { RevealObserver } from "../section/RevealObserver";
import { formatDate, type Post } from "@/lib/posts";
import { site } from "@/lib/site";
import styles from "./Article.module.css";

/**
 * The frame for a blog post: the site header (held at the top, its amber line filling as the post
 * is read), a title block with the subtitle, a readable column, and the footer. Figures inside the
 * column may run wider than the text (see Article.module.css).
 */
export function Article({ post, children }: { post: Post; children: ReactNode }) {
  // Structured data, so search engines read the page as a dated article by the lab.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.subtitle,
    datePublished: post.published,
    url: `${site.url}/blog/${post.slug}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <div className={styles.page}>
      <div className={styles.band}>
        <Header />
      </div>
      <main className={styles.main}>
        <article>
          <header className={styles.head}>
            <p className={styles.tag}>
              <Link href="/blog" className={`hit-area ${styles.tagLink}`}>
                Blog
              </Link>
              <span aria-hidden="true">·</span>
              <time dateTime={post.published}>{formatDate(post.published)}</time>
              <span className={styles.rule} aria-hidden="true" />
            </p>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.subtitle}>{post.subtitle}</p>
          </header>
          <div className={styles.body}>{children}</div>
        </article>
      </main>
      <Footer />
      <RevealObserver />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}

/** A numbered footnote reference, kept as the essay writes it: [1], linking to the source. */
export function Cite({ n, href }: { n: number; href: string }) {
  return (
    <sup className={styles.cite}>
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Source ${n}`}>
        [{n}]
      </a>
    </sup>
  );
}

/** A run of short lines set apart from the text, such as a string of rhetorical questions. */
export function Lines({ children }: { children: ReactNode }) {
  return <div className={styles.questions}>{children}</div>;
}
