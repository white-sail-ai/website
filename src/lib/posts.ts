import fs from "node:fs";
import path from "node:path";

// The blog's posts, read from content/blog/*.md at build time. Each file starts with a front
// matter block (title, subtitle, date, and for a linked post its link) and the rest is the post's
// Markdown. A linked post is listed on the blog page like any other but opens its link instead of
// a post page: the AI-bubble report, a folder of plain files under public/blog/<slug>/.
export type Post = {
  slug: string;
  title: string;
  /** The italic line under the title; also the post's meta description. */
  subtitle: string;
  /** ISO date the post went live. */
  published: string;
  /** Where a linked post opens (a path on this site); no post page is made for it. */
  link?: string;
  /** The post's Markdown, without the front matter. */
  body: string;
};

const DIR = path.join(process.cwd(), "content/blog");

function read(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`${file}: missing the --- front matter block`);
  const fields = Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .map((line) => line.match(/^(\w+):\s*(.*)$/))
      .filter((m): m is RegExpMatchArray => m !== null)
      .map(([, key, value]) => [key, value.trim().replace(/^["'](.*)["']$/, "$1")]),
  );
  for (const key of ["title", "subtitle", "date"]) {
    if (!fields[key]) throw new Error(`${file}: front matter needs a "${key}"`);
  }
  return {
    slug: file.replace(/\.md$/, ""),
    title: fields.title,
    subtitle: fields.subtitle,
    published: fields.date,
    link: fields.link || undefined,
    // Notes to the writer, in <!-- --> comments, never reach the page.
    body: match[2].replace(/<!--[\s\S]*?-->\n?/g, ""),
  };
}

/** Every post, newest first. */
export const posts: Post[] = fs
  .readdirSync(DIR)
  .filter((file) => file.endsWith(".md"))
  .map(read)
  .sort((a, b) => b.published.localeCompare(a.published));

export function getPost(slug: string): Post {
  const post = posts.find((p) => p.slug === slug);
  if (!post) throw new Error(`No post at content/blog/${slug}.md`);
  return post;
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
