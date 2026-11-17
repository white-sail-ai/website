import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { formatDate, posts } from "@/lib/posts";
import { site } from "@/lib/site";
import styles from "./page.module.css";

const description = `Essays and research notes from ${site.name}.`;

export const metadata: Metadata = {
  title: `Blog | ${site.name}`,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title: `Blog | ${site.name}`, description, url: "/blog", siteName: site.name, type: "website" },
};

export default function Blog() {
  return (
    <div className={styles.page}>
      <div className={styles.band}>
        <Header />
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>Blog</h1>
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className={styles.post}>
                <time dateTime={post.published} className={styles.date}>
                  {formatDate(post.published)}
                </time>
                <span className={styles.name}>{post.title}</span>
                <span className={styles.subtitle}>{post.subtitle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
