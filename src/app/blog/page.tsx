import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PostCover } from "@/components/blog/PostCover";
import { Header } from "@/components/Header";
import { formatDate, posts, type Post } from "@/lib/posts";
import { site } from "@/lib/site";
import styles from "./page.module.css";

const description = `Essays and research notes from ${site.name}.`;

export const metadata: Metadata = {
  title: `Blog | ${site.name}`,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title: `Blog | ${site.name}`, description, url: "/blog", siteName: site.name, type: "website" },
};

function PostCard({ post }: { post: Post }) {
  return (
    <>
      <PostCover slug={post.slug} kind={post.cover} className={styles.cover} />
      <span className={styles.text}>
        <time dateTime={post.published} className={styles.date}>
          {formatDate(post.published)}
        </time>
        <span className={styles.name}>{post.title}</span>
        <span className={styles.subtitle}>{post.subtitle}</span>
      </span>
    </>
  );
}

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
              {/* A linked post opens a page outside the app (the report's folder of plain files):
                  a plain link, so nothing is prefetched for a route that does not exist. */}
              {post.link ? (
                <a href={post.link} className={styles.post}>
                  <PostCard post={post} />
                </a>
              ) : (
                <Link href={`/blog/${post.slug}`} className={styles.post}>
                  <PostCard post={post} />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
