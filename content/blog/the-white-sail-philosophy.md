---
title: The White Sail Philosophy
subtitle: How we think about capital decisions, and why we’re building a live, connected map of how money moves.
date: 2026-11-17
---

<!--
How this file becomes the page (src/components/blog/PostBody.tsx). This note itself is not shown.
- Figures: a line of their own like ![Short description](figure:money-loop). The names are
  money-loop, partial-views, decision-chain and research-chain.
- A > quote block is set apart with an amber rule (used for the rhetorical questions).
- A link written [[1]](url) becomes a superscript footnote marker.
- Under ## Q&A, each ### heading is a question that opens to the text below it.
- The ## Follow Along section becomes the framed newsletter box, with the sign-up button.

Sources behind the numbers, checked November 2026:
[1] Peter Brown quote: eFinancialCareers, Sept 2023.
[2] US private nonresidential fixed investment, 2025: $4,251bn. BEA, via FRED series PNFIA.
[3] US M&A, 2025: $2.3tn announced. LSEG data, via Wells Fargo M&A Market Pulse, Jan 2026 (also HSF Kramer).
[4] Private fund net assets, 2025 Q4: $19.0tn. SEC, Private Fund Statistics (Form PF).
[5] Financial market data and analysis spend, 2025: $49.2bn. Burton-Taylor (TP ICAP), via FOW.
[6] Insights industry, 2024: $153bn (other ESOMAR editions say $147bn). ESOMAR, via Research World.
[7] Chip shortage cost to automakers, 2021: $210bn revenue, a forecast. AlixPartners, via CNBC.
[8] US listed companies, Dec 2025: Nasdaq 2,325 and NYSE 1,588 domestic listings. WFE.
[9] Balyasny: about 2,000 agents, about 5,000 tasks a day. Dmitry Balyasny to The National, Dec 2025.
[10] EQT Motherbrain, built since 2016. EQT.
-->

## Follow the Money

Every dollar earned comes from somewhere, and every dollar spent goes somewhere. Companies, investors, and governments try to perceive and predict how those dollars flow, then decide based on what they see: corporate strategies, investments, policies. Those decisions reshape the flow, and the cycle starts again.

![Money flows, is perceived, drives decisions, and the decisions reshape the flow](figure:money-loop)

Understanding how money moves, so you can decide what to do about it, is financial markets research. Investors use it to allocate capital, companies to set strategy, and governments to shape policy. Whatever the setting, it serves the same end: a capital decision.

The flow follows rules: the logic of business, finance, and accounting. Occasionally an unexpected event reshuffles the system. These events are surprising, but not random, and the way each one ripples through the system follows logic too.

It’s no coincidence that applied physicists and mathematicians end up as quants. Renaissance Technologies CEO Peter Brown says the firm hires “mathematicians, physicists and computer scientists with no background in finance”[[1]](https://www.efinancialcareers.com/news/2023/09/renaissance-technologies-culture). Markets resemble a physical test environment: a closed chamber of particles of different kinds and sizes, bouncing around until they collide and change course. Every so often the chamber gets shaken or turned upside down, and everything reshuffles.

That makes financial markets a great fit for a world model: an AI model that captures how a system works well enough to simulate what happens when something changes. Markets have explicit rules, many interacting agents, and feedback loops where decisions reshape the flow. Few systems are so rule-bound, so data-rich, and so quick to react to being understood.

The global economy is so complex that no one has ever held a full picture of it, let alone a live one. We’ve only been able to study it in pieces:

* **Economics** looks at the whole through theory, because the whole can’t be observed directly. Its models are good enough to guide policy.
* **Finance** looks at one part closely enough to act on it, understanding a few companies or markets well enough to make investment decisions.

Each is a response to the same limit: the system is bigger than any team can see.

![The same economy seen three ways: economics in outline, finance in one small part, and the whole live map](figure:partial-views)

We want to build the whole: a live, connected map of how money moves between every company, market, and policy. In AI terms, a world model of the global economy. That is the vision behind White Sail Labs, and the rest of this essay is how we think about getting there.

## Why This Matters

We tend to assume the decisions that shape our lives are made by presidents, ministers, and generals. In fact, many of the most consequential ones are made by investors, bankers, and CEOs.

> How would the world look if Facebook hadn’t gotten that seed round?
>
> If banks hadn’t bought all those mortgage-backed securities in the early 2000s?
>
> If Microsoft hadn’t invested in Apple in 1997?

The sums are large. In the US alone, businesses invested about $4.25 trillion in equipment, buildings, and software in 2025[[2]](https://fred.stlouisfed.org/series/PNFIA), and companies agreed about $2.3 trillion in mergers and acquisitions[[3]](https://www.wellsfargomedia.com/wholesale/PDS/WellsFargoMAMarketPulseABannerYearforDealmaking.pdf). Private funds reporting to the SEC held about $19 trillion in net assets[[4]](https://www.sec.gov/files/investment/private-fund-statistics-2025-q4.pdf). The research meant to inform those decisions is a much smaller industry: about $49 billion a year on financial market data and analysis[[5]](https://www.fow.com/insights/market-data-spend-hits-usd49-2bn-as-ai-volatility-and-algos-drive-growth), and about $150 billion on market research and insights worldwide[[6]](https://researchworld.com/articles/inside-the-153bn-insights-industry).

When these decisions go wrong, the cost spreads far beyond the people who made them. The mortgage-backed securities boom was, at its core, a failure of financial markets research: the risks were connected in ways too few decision-makers could see.

It isn’t only finance. When demand collapsed in early 2020, carmakers cut their chip orders, and chipmakers moved that capacity to laptops and phones. When car sales recovered faster than expected, the chips weren’t there. AlixPartners estimated the shortage would cost the auto industry $210 billion in revenue in 2021[[7]](https://www.cnbc.com/2021/09/23/chip-shortage-expected-to-cost-auto-industry-210-billion-in-2021.html). Each cut made sense on the information at hand. The consequences ran several links up the supply chain, where few were looking.

Better-informed capital decisions mean fewer of these shocks, and fewer shocks mean more stable economies.

## How Capital Decisions Are Made Today

Whether it’s a fund weighing an acquisition, a strategy team sizing a new market, or a consultancy advising a board, the path to a capital decision looks much the same.

![An analyst's work passes through a model, a memo, and a deck before it reaches a decision](figure:decision-chain)

The process was designed around limited headcount. Teams are selective with the questions they pursue, not because only a few are worth asking, but because a few is what a team can hold in mind at once. For each question, they study a handful of options out of many, and model them with a fraction of the available data. That’s a matter of capacity, not conviction.

Each hand-off is a snapshot. The model, the memo, and the deck capture a moment, and are read by people with limited hours. What rarely gets recorded is the decision itself: the assumptions behind it, the options set aside, and the reasons why. When circumstances change, or the people who made the call move on, that context is hard to recover. A good idea that came at the wrong time is easy to lose track of.

Following a company’s customers, suppliers, and shareholders, and the decisions that shaped them, is also usually out of reach. Teams know these connections matter. There simply aren’t enough hours to trace them.

## How AI Helps Today

A wave of serious, talented teams is already building AI for financial markets research. Their products read documents, answer questions, summarize calls, and draft memos, and the people using them are faster for it. That deserves real respect.

They work best when you know what to ask. We’re building something different: a world model of the economy that keeps researching on its own. For the people who use it, that means insights they didn’t know to look for, delivered before they ask.

## A Finite Economy

The global economy is vast, but it is finite. Fewer than 4,000 US companies are listed on its two main stock exchanges[[8]](https://focus.world-exchanges.org/issue/december-2025/market-statistics). Private companies, markets, and policies add many more, but the set of things worth understanding can be counted, and business models repeat.

The questions repeat too. Different teams ask much the same things about the same companies and markets: who supplies whom, where demand is moving, what changes when rates or regulations shift.

At Unit 8200, we learned that when the universe is finite and the questions repeat, research can be faster, cheaper, and better at the same time. Work done once serves many questions, and every new finding makes the rest more useful. That is what makes a world model of the economy buildable.

## How We Think About It at White Sail Labs

If research labor were unlimited, how would we redefine financial markets research?

1. **In depth.** Every investor, company, and public body can research the way a quant hedge fund does, pulling unconventional signals at scale and combining them with its own judgment. That means following every company’s customers, suppliers, and shareholders, and the decisions that shaped them. These are the connections no team has time to trace, and they are the edges of the live map.
2. **At scale.** Screening and watchlists are history. If 1,000 companies, suppliers, or markets are relevant to your question, research all of them with AI and let it surface the most promising ones for your final judgment.
3. **All the time.** Today, research has to land at the right time. A team that finds the right opportunity at the wrong time, or whose findings arrive after the decision window, watches the work go stale. AI can keep that research alive and current until the time is right, and keep it with the organization when people move on.

![Research reach around one company, today and with unlimited research labor](figure:research-chain)

Put together, every company gets a living research record: thesis, drivers and risks, timeline, evidence, open questions, numbers and comps. It keeps compounding while your team is away from the desk.

## Why Now

For the first time, research labor is becoming effectively unlimited. Models read filings, transcripts, and alternative data at near-zero marginal cost. Agents run long, multi-step research on their own for hours. Reasoning models test an argument against the evidence instead of just summarizing it. And compute keeps getting cheaper.

The largest firms are already working this way. Balyasny, a multi-strategy hedge fund, says it runs about 2,000 AI agents handling some 5,000 tasks a day[[9]](https://www.thenationalnews.com/podcasts/inside-brief/2025/12/10/dmitry-balyasny-on-abu-dhabi-expansion-ai-agents-and-2026-outlook/). EQT, one of the world’s largest private equity firms, has been building its in-house data platform, Motherbrain, since 2016[[10]](https://eqtgroup.com/about/motherbrain). Each took years and dedicated teams. Most organizations have neither.

The first organizations with no capacity limits will see what everyone else can’t, and everyone else will have to follow. It’s obvious this is coming. We want to be the ones building it.

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
