import type { Metadata } from "next";
import { Article, Cite, Lines } from "@/components/blog/Article";
import { CapacityFunnel, MoneyLoop, PartialViews, ResearchChain } from "@/components/blog/Figures";
import { FollowAlong } from "@/components/blog/FollowAlong";
import { Questions, type Question } from "@/components/blog/Questions";
import { ResearchWorkflow } from "@/components/blog/ResearchWorkflow";
import { getPost } from "@/lib/posts";
import { site } from "@/lib/site";

const post = getPost("the-white-sail-philosophy");
const path = `/blog/${post.slug}`;

export const metadata: Metadata = {
  title: `${post.title} | ${site.name}`,
  description: post.subtitle,
  alternates: { canonical: path },
  openGraph: {
    title: post.title,
    description: post.subtitle,
    url: path,
    siteName: site.name,
    type: "article",
    publishedTime: post.published,
    authors: [site.name],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.subtitle,
  },
};

// Add a question by adding an entry here.
const QUESTIONS: Question[] = [
  {
    q: "What do you mean by financial markets research?",
    a: (
      <p>
        Understanding how money moves so you can decide what to do about it. Investors do it to allocate capital,
        companies to set strategy, and governments to shape policy.
      </p>
    ),
  },
  {
    q: "So... you’re doing algotrading?",
    a: (
      <p>
        Nope. We’re not trading, at least for now. And “algotrading” covers so many different things today that
        we’re far from all of them. A separate post is coming on where algotrading stands and why White Sail Labs
        is fundamentally different.
      </p>
    ),
  },
  {
    q: "Why White Sail?",
    a: (
      <p>
        Very few symbols carry the same meaning across cultures, religions, and continents. A white sail is one of
        them. It stands for vast horizons, discovery, limitless exploration, and freedom. In Israeli culture, it
        also symbolizes hope in dark times.
      </p>
    ),
  },
  {
    q: "What’s the mission?",
    a: <p>To create more stable and thriving economies by making the decisions that move capital better informed.</p>,
  },
];

export default function WhiteSailPhilosophy() {
  return (
    <Article post={post}>
      <h2 id="follow-the-money">Follow the Money</h2>
      <p>
        Every dollar earned comes from somewhere, and every dollar spent goes somewhere. Companies, investors, and
        governments try to perceive and predict how those dollars flow, then decide based on what they see: corporate
        strategies, investments, policies. Those decisions reshape the flow. And the loop goes on.
      </p>
      <MoneyLoop />
      <p>
        We call that effort financial markets research: understanding how money moves so you can decide what to do
        about it. Investors do it to allocate capital, companies to set strategy, and governments to shape policy.
      </p>
      <p>
        The flow follows rules: the logic of business, finance, and accounting. Occasionally an unexpected event
        reshuffles the system. These events are surprising, but not random, and the way each one ripples through the
        system follows logic too.
      </p>
      <p>
        It’s no coincidence that applied physicists and mathematicians end up as quants. Renaissance Technologies CEO
        Peter Brown says the firm hires “mathematicians, physicists and computer scientists with no background in
        finance”
        <Cite n={1} href="https://www.efinancialcareers.com/news/2023/09/renaissance-technologies-culture" />. Markets
        resemble a physical test environment: a closed chamber of particles of different kinds and sizes, bouncing
        around until they collide and change course. Every so often the chamber gets shaken or turned upside down, and
        everything reshuffles.
      </p>
      <p>
        That makes financial markets a great fit for a world model: an AI model that captures how a system works well
        enough to simulate what happens when something changes. Markets have explicit rules, many interacting agents,
        and feedback loops where decisions reshape the flow. Few systems are so rule-bound, so data-rich, and so quick
        to react to being understood.
      </p>
      <p>
        The global economy is fascinating, consequential, and extremely complex. So complex that no one has ever built
        a full picture of it, let alone a live one. Part of the reason is that humanity split the challenge into two
        disciplines:
      </p>
      <ul>
        <li>
          <strong>Economics</strong> studies the big picture through theory. We can’t see how the whole system
          behaves, so we build models to guide policy. Better than nothing.
        </li>
        <li>
          <strong>Finance</strong> manages money, credit, assets, and liabilities. We can’t see how the whole system
          behaves either, so we understand one small part of it well enough to make investment decisions.
        </li>
      </ul>
      <p>Each sees a piece. Neither sees the whole.</p>
      <PartialViews />
      <p>
        We want to build the whole: a live, connected map of how money moves between every company, market, and
        policy. In AI terms, a world model of the global economy. That is the vision behind White Sail Labs, and the
        rest of this essay is how we think about getting there.
      </p>

      <h2 id="why-this-matters">Why This Matters</h2>
      <p>
        We tend to assume the decisions that shape our lives are made by presidents, ministers, and generals. In fact,
        the most consequential ones are made by investors, bankers, and CEOs.
      </p>
      <p>Don’t believe me?</p>
      <Lines>
        <p>How would the world look if Facebook hadn’t gotten that seed round?</p>
        <p>If banks hadn’t bought all those mortgage-backed securities in the early 2000s?</p>
        <p>If Microsoft hadn’t saved Apple and Steve Jobs in 1997?</p>
      </Lines>
      <p>
        Decisions like these steer the economy, and sometimes they break it. The mortgage-backed securities boom was,
        at its core, a failure of financial markets research: the risks were connected in ways too few decision-makers
        could see. Better-informed capital decisions mean fewer blowups, and fewer blowups mean more stable economies.
        Yet the research behind those decisions was built for a world of limited headcount.
      </p>

      <h2 id="how-financial-markets-research-works-today">How Financial Markets Research Works Today</h2>
      <p>Investing is one clear example of financial markets research, so we’ll use it here.</p>
      <ResearchWorkflow />
      <p>
        The process was designed around limited headcount. Investors are selective with their theses, not because
        only three theses are right, but because three is what a team can hold in mind at once.
      </p>
      <p>
        For each thesis, they research only a few companies out of a massive universe. Again: capacity, not
        conviction.
      </p>
      <CapacityFunnel />
      <p>
        Analysts model those companies using a fraction of the available data. They’re short on time, and they often
        don’t know how to query anything that isn’t in the 10-Q.
      </p>
      <p>
        When a deal is passed, the work is practically lost. There’s no easy way to retrieve it in an actionable form.
        When a deal is done, the work is lost as well: the operating team is not the deal team, and is often blind to
        the assumptions and original thesis behind the deal.
      </p>
      <p>
        Analysts also rarely dive into the reports of a company’s customers or suppliers. They rarely look into the
        history of its shareholders and what shaped their decisions. They’re not dumb. They know this data is
        potentially important. It’s simply too much for any human to process. And as long as other analysts are
        limited by the same constraint, they’re safe.
      </p>

      <h2 id="how-ai-helps-today">How AI Helps Today</h2>
      <p>
        A wave of serious, talented teams is already building AI for financial markets research. Their products read
        documents, answer questions, summarize calls, and draft memos, and analysts are faster for it. That deserves
        real respect.
      </p>
      <p>
        Most of them optimize the existing workflow instead of rethinking the problem from its root. Faster is
        valuable. But better?
      </p>

      <h2 id="how-we-think-about-it">How We Think About It at White Sail Labs</h2>
      <p>If labor were infinite, how would we redefine financial markets research?</p>
      <ol>
        <li>
          <strong>At scale.</strong> Screening and watchlists are history. If 1,000 companies, suppliers, or markets
          are relevant to your question, research all of them with AI and let it surface the most promising ones for
          your final judgment.
        </li>
        <li>
          <strong>Going deeper.</strong> Every investor, company, and public body can research the way a quant hedge
          fund does, pulling alternative signals at scale and combining them with its own proprietary judgment. That
          means following every company’s customers, suppliers, and shareholders, and the decisions that shaped them.
          These are the connections no human analyst has time to trace, and they are the edges of the live map.
          <ResearchChain />
        </li>
        <li>
          <strong>All the time.</strong> Today, research has to land at the right time. An investor who finds the right
          deal at the wrong time, or a strategy team whose findings arrive after the decision window, watches the work
          go stale on a shelf. AI can keep that research alive and current until the time is right. It also fixes
          turnover: analysts move on and teams reshuffle, and today the knowledge leaves with them. Living research
          stays.
        </li>
      </ol>
      <p>
        Put together, every company gets a living research spine: thesis, drivers and risks, timeline, evidence, open
        questions, numbers and comps. It keeps compounding while your team is away from the desk.
      </p>
      <h2 id="why-now">Why Now</h2>
      <p>
        For the first time, research labor is becoming effectively unlimited. Models read filings, transcripts, and
        alternative data at near-zero marginal cost. Agents run long, multi-step research on their own for hours.
        Reasoning models test an argument against the evidence instead of just summarizing it. And compute keeps
        getting cheaper.
      </p>
      <p>
        The first firms with no capacity limits will see what everyone else can’t, and everyone else will have to
        follow. It’s obvious this is coming. We want to be the ones building it.
      </p>
      <p>
        We’re about to start publishing concrete deep dives and examples of what this looks like in practice. The
        first one asks: is there an AI bubble?
      </p>

      <h2 id="q-and-a">Q&amp;A</h2>
      <Questions items={QUESTIONS} />

      <FollowAlong title="Follow Along">
        <p>
          Sign up for our newsletter at <a href="https://white-sail.ai/">white-sail.ai</a> to get the deep dives as
          they come out.
        </p>
      </FollowAlong>
    </Article>
  );
}
