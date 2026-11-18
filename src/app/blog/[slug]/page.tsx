import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Article } from "@/components/blog/Article";
import { PostBody } from "@/components/blog/PostBody";
import { getPost, posts } from "@/lib/posts";
import { site } from "@/lib/site";

// One page per Markdown file in content/blog/. Its share card, if any, is public/blog/og/<slug>.png
// (1200 x 630).

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  const url = `/blog/${post.slug}`;
  const card = `/blog/og/${post.slug}.png`;
  const images = fs.existsSync(path.join(process.cwd(), "public", card))
    ? [{ url: card, width: 1200, height: 630, alt: `${post.title}: ${post.subtitle}` }]
    : undefined;
  return {
    title: `${post.title} | ${site.name}`,
    description: post.subtitle,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.subtitle,
      url,
      siteName: site.name,
      type: "article",
      publishedTime: post.published,
      authors: [site.name],
      locale: "en_US",
      images,
    },
    twitter: { card: images ? "summary_large_image" : "summary", title: post.title, description: post.subtitle, images },
  };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  return (
    <Article post={post}>
      <PostBody markdown={post.body} />
    </Article>
  );
}
