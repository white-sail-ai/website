// The blog's posts, newest first. Each post's text lives in its own page under src/app/blog/.
export type Post = {
  slug: string;
  title: string;
  /** The italic line under the title; also the post's meta description. */
  subtitle: string;
  /** ISO date the post went live. */
  published: string;
};

export const posts: Post[] = [
  {
    slug: "the-white-sail-philosophy",
    title: "The White Sail Philosophy",
    subtitle:
      "How we think about financial markets research, and why we’re building a live, connected map of how money moves.",
    published: "2026-11-17",
  },
];

export function getPost(slug: string): Post {
  const post = posts.find((p) => p.slug === slug);
  if (!post) throw new Error(`No post with slug "${slug}"`);
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
