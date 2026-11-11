---
target: our website (homepage + dialogs)
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/abotzer/Desktop/GIT/website/src/app/page.tsx"
target_fingerprint: "sha256:2487aa0e3fab4be6e0f011b540bec4eea29fb66f1733970dda0422c1a5fb094d"
target_path: /Users/abotzer/Desktop/GIT/website/src/app/page.tsx
timestamp: 2026-11-11T08-02-37Z
slug: src-app-page-tsx
closed: true
---
Method: dual-agent (A: 88f765c5-5e5b-4429-8d61-51629940747c · B: f45d9158-ef6d-4b55-9a17-7e3e8d16a0d6)
Target: src/app/page.tsx (homepage) plus its four dialogs. Mode: Persuade.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | "Sending…" state and alert/status roles work; pulsing "Live" dot implies real-time data the simulated map doesn't have |
| 2 | Match System / Real World | 2 | Finance vocabulary only in the bottom strip; hero copy is abstract |
| 3 | User Control and Freedom | 3 | Escape, backdrop and close all work; typed values survive closing |
| 4 | Consistency and Standards | 2 | Privacy/Terms look clickable but go nowhere; Gmail styled as the recommended option |
| 5 | Error Prevention | 3 | Native validation, honeypot, double-submit lock; Careers sends with no role picked |
| 6 | Recognition Rather Than Recall | 3 | Get in touch opens a blank email and never shows the address |
| 7 | Flexibility and Efficiency | n/a | One screen, no repeat task |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained; attribute strip repeats the headline |
| 9 | Error Recovery | 2 | Fallback error says "email us directly" with no address; stale error after reopen |
| 10 | Help and Documentation | n/a | Nothing complex enough to need help |
| **Total** | | **21/32 (66%)** | **Acceptable** |

## Design Specificity Verdict

LLM: Half specific. Brand tokens (navy/cream/amber from the deck, Montserrat + Roboto Slab, sail mark, amber-as-signal) are Whitesail's own. The map (random unlabeled constellation), headline (fits any BI tool) and layout (SaaS hero + 4-icon strip) are category-interchangeable. The most specific sentence (site.description) only appears in meta tags.

Deterministic scan: source scan of src/public clean. URL scans at 1440x900, 390x844, 320x568 each returned overused-font (Montserrat) and cream-palette (#FCF7F3) at selector body: both false positives (deck brand tokens). Detector missed all real defects; they came from browser measurement.

Overlay: injected in the [Human] tab; reported only the two body-level warnings in every state.

## What's Working
- Brand discipline: amber means "signal" everywhere, never text; two-tone headline builds hierarchy without a third color.
- Dialog engineering: native <dialog>, visible labels, autocomplete, 16px inputs, Sending state, alert/status roles, values survive close.
- Viewport care: container queries for the caption, reduced-motion still frame, canvas pauses off-screen.

## Priority Issues
1. [P1] Hero never states the offer (src/lib/site.ts headline/subline, <title>). Fix: bring site.description substance into the hero; copy needs owner approval. Command: clarify.
2. [P1] Trust gaps at the early-access form: Privacy/Terms are <a aria-disabled> with no href (pointer + hover, not focusable, role generic, empty name); fallback error gives no address; focus drops to body after failed submit; no next-step line. Command: harden.
3. [P1] Map is generic and vanishes on phones: window height 341px at 1440x900, 65px at 390x844, 21px at 844x390, 0px at 320x568. Fix: sector labels, example event chips, protect minimum map height on phones. Commands: bolder, then adapt.
4. [P2] 320x568 overflow: footer at 581-624px on a 568px screen, last attribute line clipped 13px, no scrolling. Command: adapt.
5. [P2] Focus ring 1.62:1 (needs 3:1); targets under 44px (header Careers 54x18, phone Newsletter 85x18, footer links ~21px tall, dialog close 36x36); input borders 1.45:1, ghost button border 1.57:1. Command: polish.

## Persona Red Flags
- Jordan: can't tell what it is or who it's for until the bottom strip; early access vs get in touch unexplained; "Outlook" opens a web sign-in.
- Riley: jordan@firm accepted; failed submit dead-ends with no address; stale error after reopen; Careers sends with no role.
- Casey: Careers link 54x18 in the top-right corner; map is a 65px strip; Careers dialog scrolls after Send application.

## Minor Observations
- Dialogs focus the close button first, not the first field.
- "→" read as part of button names; mark .arrow aria-hidden.
- Newsletter dialog mounted twice (header + phone copy).
- Subline "continuously, and efficiently": stray comma, weak claim.
- 768-1024px: headline sits below the right column top; "YOUR JUDGMENT" wraps.
- No Open Graph image.
- Cognitive load moderate: Careers shows 6 options after Send application; Get in touch relies on recall.

## Questions to Consider
- Why does the meta description explain the product better than the headline?
- Would one real, sourced agent note about one real company earn more trust than the abstract map?
- Is a waitlist "spot" the right ask for an institutional buyer, or would a 30-minute walkthrough convert better?
