import { Fragment, type ReactNode } from "react";
import Markdown, { defaultUrlTransform, type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Cite, Lines, Notes } from "./Article";
import type { Heading } from "./Contents";
import { DecisionChain, MoneyLoop, PartialViews, ResearchChain } from "./Figures";
import { FollowAlong } from "./FollowAlong";
import { Questions, type Question } from "./Questions";

/** The figures a post can place with ![alt](figure:name) on a line of its own. */
const FIGURES: Record<string, () => ReactNode> = {
  "money-loop": MoneyLoop,
  "partial-views": PartialViews,
  "decision-chain": DecisionChain,
  "research-chain": ResearchChain,
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const textOf = (node: ReactNode): string =>
  typeof node === "string" || typeof node === "number"
    ? String(node)
    : Array.isArray(node)
      ? node.map(textOf).join("")
      : node && typeof node === "object" && "props" in node
        ? textOf((node.props as { children?: ReactNode }).children)
        : "";

const components: Components = {
  h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
  // A paragraph holding only a figure is replaced by the figure, so it isn't nested in a <p>.
  p: ({ node, children }) => {
    const only = node?.children.length === 1 ? node.children[0] : null;
    if (only?.type === "element" && only.tagName === "img") {
      const src = String(only.properties.src ?? "");
      if (src.startsWith("figure:")) return figure(src);
    }
    return <p>{children}</p>;
  },
  // Ordinary images in a post are plain files: the site is a static export, without image optimisation.
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ src, alt }) => (typeof src === "string" && src.startsWith("figure:") ? figure(src) : <img src={src} alt={alt ?? ""} />),
  blockquote: ({ children }) => <Lines>{children}</Lines>,
  a: ({ href = "", children }) => {
    const note = textOf(children).match(/^\[(\d+)\]$/);
    if (note) return <Cite n={Number(note[1])} href={href} />;
    const external = /^https?:/.test(href) && !href.startsWith("https://white-sail.ai");
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  },
};

function figure(src: string) {
  const name = src.slice("figure:".length);
  const Figure = FIGURES[name];
  if (!Figure) throw new Error(`Unknown figure "${name}". Known: ${Object.keys(FIGURES).join(", ")}`);
  return <Figure />;
}

function Md({ children }: { children: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={components}
      // Keep figure: links, which the default would strip as an unknown protocol.
      urlTransform={(url) => (url.startsWith("figure:") ? url : defaultUrlTransform(url))}
    >
      {children}
    </Markdown>
  );
}

/** Splits a section's Markdown into its ### questions and their answers. */
function questions(markdown: string): Question[] {
  return markdown
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [first, ...rest] = block.split("\n");
      return { q: first.trim(), a: <Md>{rest.join("\n").trim()}</Md> };
    });
}

/**
 * Renders a post's Markdown. Two sections get their own treatment: "## Q&A" becomes the opening
 * questions, and "## Follow Along" becomes the newsletter box. Everything else is plain Markdown.
 */
export function PostBody({ markdown }: { markdown: string }) {
  // Footnotes: [^id]: lines at the end hold the notes; [^id] in the text marks where each is cited.
  // They are numbered in the order they are defined, and rendered as Notes after everything else.
  const notes: string[] = [];
  const numbers = new Map<string, number>();
  markdown = markdown.replace(/^\[\^([^\]]+)\]:[ \t]*(.+)$\n?/gm, (_, id: string, text: string) => {
    notes.push(text.trim());
    numbers.set(id, notes.length);
    return "";
  });
  markdown = markdown.replace(/\[\^([^\]]+)\]/g, (match, id: string) => {
    const n = numbers.get(id);
    if (!n) throw new Error(`Footnote [^${id}] is cited but never defined`);
    return `[[${n}]](#note-${n})`;
  });

  // Split at each ## heading, keeping the heading with its section.
  const sections = markdown.split(/^(?=## )/m);
  return (
    <>
      {sections.map((section, i) => {
        const heading = section.match(/^## (.+)$/m)?.[1].trim();
        const rest = heading ? section.slice(section.indexOf("\n") + 1) : section;
        if (heading === "Q&A") {
          return (
            <Fragment key={i}>
              <h2 id="q-and-a">Q&amp;A</h2>
              <Questions items={questions(rest)} />
            </Fragment>
          );
        }
        if (heading === "Follow Along") {
          return (
            <FollowAlong key={i} title={heading}>
              <Md>{rest.trim()}</Md>
            </FollowAlong>
          );
        }
        return <Md key={i}>{section}</Md>;
      })}
      {notes.length > 0 && <Notes items={notes.map((note, i) => <Md key={i}>{note}</Md>)} />}
    </>
  );
}

/** The post's ## sections, for its contents list. The newsletter box isn't a section to read. */
export function headings(markdown: string): Heading[] {
  return [...markdown.matchAll(/^## (.+)$/gm)]
    .map((m) => m[1].trim())
    .filter((title) => title !== "Follow Along")
    .map((title) => ({ id: title === "Q&A" ? "q-and-a" : slugify(title), title }));
}
