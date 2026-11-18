---
title: The White Sail Philosophy
subtitle: How we think about financial markets research, and why we’re building a live, connected map of how money moves.
date: 2026-11-17
---

<!--
How this file becomes the page (src/components/blog/PostBody.tsx). This note itself is not shown:
- Figures: a line of their own like ![Caption-free alt text](figure:money-loop). The names are
  money-loop, partial-views, research-workflow, capacity-funnel and research-chain.
- A > quote block is set apart with an amber rule (used for the rhetorical questions).
- A link written [[1]](url) becomes a superscript footnote marker.
- Under ## Q&A, each ### heading is a question that opens to the text below it.
- The ## Follow Along section becomes the framed newsletter box, with the sign-up button.
-->

## Follow the Money

Every dollar earned comes from somewhere, and every dollar spent goes somewhere. Companies, investors, and governments try to perceive and predict how those dollars flow, then decide based on what they see: corporate strategies, investments, policies. Those decisions reshape the flow. And the loop goes on.

![The loop: money flows, is perceived, drives decisions, and the decisions reshape the flow](figure:money-loop)

We call that effort financial markets research: understanding how money moves so you can decide what to do about it. Investors do it to allocate capital, companies to set strategy, and governments to shape policy.

The flow follows rules: the logic of business, finance, and accounting. Occasionally an unexpected event reshuffles the system. These events are surprising, but not random, and the way each one ripples through the system follows logic too.

It’s no coincidence that applied physicists and mathematicians end up as quants. Renaissance Technologies CEO Peter Brown says the firm hires “mathematicians, physicists and computer scientists with no background in finance”[[1]](https://www.efinancialcareers.com/news/2023/09/renaissance-technologies-culture). Markets resemble a physical test environment: a closed chamber of particles of different kinds and sizes, bouncing around until they collide and change course. Every so often the chamber gets shaken or turned upside down, and everything reshuffles.

That makes financial markets a great fit for a world model: an AI model that captures how a system works well enough to simulate what happens when something changes. Markets have explicit rules, many interacting agents, and feedback loops where decisions reshape the flow. Few systems are so rule-bound, so data-rich, and so quick to react to being understood.

The global economy is fascinating, consequential, and extremely complex. So complex that no one has ever built a full picture of it, let alone a live one. Part of the reason is that humanity split the challenge into two disciplines:

* **Economics** studies the big picture through theory. We can’t see how the whole system behaves, so we build models to guide policy. Better than nothing.
* **Finance** manages money, credit, assets, and liabilities. We can’t see how the whole system behaves either, so we understand one small part of it well enough to make investment decisions.

Each sees a piece. Neither sees the whole.

![The same economy seen three ways: economics in outline, finance in one small part, and the whole live map](figure:partial-views)

We want to build the whole: a live, connected map of how money moves between every company, market, and policy. In AI terms, a world model of the global economy. That is the vision behind White Sail Labs, and the rest of this essay is how we think about getting there.

## Why This Matters

We tend to assume the decisions that shape our lives are made by presidents, ministers, and generals. In fact, the most consequential ones are made by investors, bankers, and CEOs.

Don’t believe me?

> How would the world look if Facebook hadn’t gotten that seed round?
>
> If banks hadn’t bought all those mortgage-backed securities in the early 2000s?
>
> If Microsoft hadn’t saved Apple and Steve Jobs in 1997?

Decisions like these steer the economy, and sometimes they break it. The mortgage-backed securities boom was, at its core, a failure of financial markets research: the risks were connected in ways too few decision-makers could see. Better-informed capital decisions mean fewer blowups, and fewer blowups mean more stable economies. Yet the research behind those decisions was built for a world of limited headcount.

## How Financial Markets Research Works Today

Investing is one clear example of financial markets research, so we’ll use it here.

![The seven stages of investing, and the two places research is lost](figure:research-workflow)

The process was designed around limited headcount. Investors are selective with their theses, not because only three theses are right, but because three is what a team can hold in mind at once.

For each thesis, they research only a few companies out of a massive universe. Again: capacity, not conviction.

![From tens of thousands of companies to a handful researched in depth](figure:capacity-funnel)

Analysts model those companies using a fraction of the available data. They’re short on time, and they often don’t know how to query anything that isn’t in the 10-Q.

When a deal is passed, the work is practically lost. There’s no easy way to retrieve it in an actionable form. When a deal is done, the work is lost as well: the operating team is not the deal team, and is often blind to the assumptions and original thesis behind the deal.

Analysts also rarely dive into the reports of a company’s customers or suppliers. They rarely look into the history of its shareholders and what shaped their decisions. They’re not dumb. They know this data is potentially important. It’s simply too much for any human to process. And as long as other analysts are limited by the same constraint, they’re safe.

## How AI Helps Today

A wave of serious, talented teams is already building AI for financial markets research. Their products read documents, answer questions, summarize calls, and draft memos, and analysts are faster for it. That deserves real respect.

Most of them optimize the existing workflow instead of rethinking the problem from its root. Faster is valuable. But better?

## How We Think About It at White Sail Labs

If labor were infinite, how would we redefine financial markets research?

1. **At scale.** Screening and watchlists are history. If 1,000 companies, suppliers, or markets are relevant to your question, research all of them with AI and let it surface the most promising ones for your final judgment.
2. **Going deeper.** Every investor, company, and public body can research the way a quant hedge fund does, pulling alternative signals at scale and combining them with its own proprietary judgment. That means following every company’s customers, suppliers, and shareholders, and the decisions that shaped them. These are the connections no human analyst has time to trace, and they are the edges of the live map.
3. **All the time.** Today, research has to land at the right time. An investor who finds the right deal at the wrong time, or a strategy team whose findings arrive after the decision window, watches the work go stale on a shelf. AI can keep that research alive and current until the time is right. It also fixes turnover: analysts move on and teams reshuffle, and today the knowledge leaves with them. Living research stays.

![Research reach around one company, today and with unlimited research labor](figure:research-chain)

Put together, every company gets a living research spine: thesis, drivers and risks, timeline, evidence, open questions, numbers and comps. It keeps compounding while your team is away from the desk.

## Why Now

For the first time, research labor is becoming effectively unlimited. Models read filings, transcripts, and alternative data at near-zero marginal cost. Agents run long, multi-step research on their own for hours. Reasoning models test an argument against the evidence instead of just summarizing it. And compute keeps getting cheaper.

The first firms with no capacity limits will see what everyone else can’t, and everyone else will have to follow. It’s obvious this is coming. We want to be the ones building it.

We’re about to start publishing concrete deep dives and examples of what this looks like in practice. The first one asks: is there an AI bubble?

## Q&A

### What do you mean by financial markets research?

Understanding how money moves so you can decide what to do about it. Investors do it to allocate capital, companies to set strategy, and governments to shape policy.

### So... you’re doing algotrading?

Nope. We’re not trading, at least for now. And “algotrading” covers so many different things today that we’re far from all of them. A separate post is coming on where algotrading stands and why White Sail Labs is fundamentally different.

### Why White Sail?

Very few symbols carry the same meaning across cultures, religions, and continents. A white sail is one of them. It stands for vast horizons, discovery, limitless exploration, and freedom. In Israeli culture, it also symbolizes hope in dark times.

### What’s the mission?

To create more stable and thriving economies by making the decisions that move capital better informed.

## Follow Along

Sign up for our newsletter at [white-sail.ai](https://white-sail.ai/) to get the deep dives as they come out.
