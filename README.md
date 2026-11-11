# White Sail Labs website

Marketing site for White Sail Labs: a dark home page (a full-screen hero, then Who we are and Built for) plus Privacy and Terms pages, built with Next.js 16 (App Router) and CSS Modules. It has no UI dependencies.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # static export: plain HTML, CSS and JS in out/
```

## Structure

```
src/
  app/
    layout.tsx        fonts (Montserrat + Roboto Slab via next/font), metadata
    globals.css       brand and theme tokens, base type, buttons
    page.tsx          home: header, a hero screen (map behind, headline panel on top,
                      attributes strip at the bottom), Who we are, Built for, then the footer
    privacy/, terms/  legal pages (drafts; see Open items)
    icon.svg          favicon (the sail on a navy tile)
  components/
    Header, Footer    the header sits on the navy page, so the logo reads as in the app
    LegalPage         header, readable column and footer shared by the legal pages
    Logo              cream sail silhouette + "White Sail Labs" wordmark
    BuiltFor          Investors / CEOs / Strategists with drawn symbols, plus the calls to action
    Attributes        In depth / At scale / All the time / Your judgment, with line glyphs
    MarketMap         canvas "live market map" filling the hero behind the content
    WhoWeAre          deep navy band below the hero: the lab, then Applied AI Engineers,
                      Business Engineers, and the Always-on Agents Fleet
  lib/site.ts         site name, headline, description, contact address, email links
  lib/forms.ts        posts the early-access and newsletter forms to the Worker
worker/               Cloudflare Worker that stores signups (Notion, Slack, Resend); see worker/README.md
.github/workflows/    nextjs.yml builds the site and publishes it to GitHub Pages
public/.nojekyll      tells GitHub Pages to serve the _next/ folder as is
```

The hero fills the first screen (`100dvh`, header included) and its open middle row, where the map shows through and reacts to the pointer, takes whatever height the headline and attributes leave. On screens too short for the hero the map keeps a 72px strip and the hero grows. Who we are sits below on a deeper navy band, then Built for closes the page with the two calls to action again; the header's "Who we are" link scrolls to it (hidden below 372px, where the header only has room for Careers). On phones the attributes become a row you swipe through and the headline is sized to the screen width.

## Early access and newsletter

The site is static, so the two forms post to the Worker in `worker/`, which keeps the Notion, Slack and Resend secrets. Setup steps are in `worker/README.md`. The build reads the Worker's address from the `FORMS_URL` repository variable; without it the forms show an error message.

## Deploy to GitHub Pages

Every push to the branch listed in `.github/workflows/nextjs.yml` (`on.push.branches`, currently `claude/jolly-fermat-4ieu4p`) builds the static export (`out/`) and publishes it to GitHub Pages. Other branches are not published. The site is built for the root of a domain, so it only renders correctly when served from `white-sail.ai`, not from the `github.io/website` address.

**One-time setup**

1. **Turn on Pages.** Repository → Settings → Pages → *Build and deployment* → Source: **GitHub Actions** (already done).
2. **Point the domain at GitHub.** At your DNS provider, add these records:

   | Type  | Name  | Value                                                                                          |
   | ----- | ----- | ---------------------------------------------------------------------------------------------- |
   | A     | `@`   | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (one record each)    |
   | AAAA  | `@`   | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`      |
   | CNAME | `www` | `white-sail-ai.github.io`                                                                       |

   **Don't change the nameservers, and leave the existing MX and TXT records alone**: they carry your email.
3. **Set the custom domain.** Settings → Pages → Custom domain: `white-sail.ai` → Save. GitHub checks the DNS and issues a certificate (this can take up to an hour). Then tick **Enforce HTTPS**. `www.white-sail.ai` redirects to `white-sail.ai` automatically.
4. **Recommended:** verify the domain for the organisation (organisation Settings → Pages → Add a domain, then add the TXT record it shows) so nobody else can claim it.

**Updating the site.** Push to the branch above and it deploys in about a minute. To redeploy without a change, use Actions → *Deploy Next.js site to Pages* → Run workflow.

**Good to know**
- If you make `main` the production branch later, change `on.push.branches` in `nextjs.yml` and allow `main` under Settings → Environments → `github-pages` → Deployment branches.
- The footer year is set when the site is built, so it changes with the next deploy after New Year.

## Brand

Colors and type come from the White Sail Labs pitch deck. The site is dark: the deck's palette flipped, cream type on a navy page.

| Token      | Value                  | Use                                                   |
| ---------- | ---------------------- | ----------------------------------------------------- |
| `--navy`   | `#1A3263`              | page background, text on the primary button, inputs   |
| `--cream`  | `#FCF7F3`              | text, logo, primary button, focus ring                |
| `--amber`  | `#FAB95B`              | accent (map signals, the fleet's rule, symbol accents) |
| `--deep`   | `#12264C`              | the Who we are band                                   |
| `--raised` | `#223D75`              | dialogs and the Built for symbol tiles                |
| `--muted`  | cream at 74% opacity   | secondary text                                        |
| `--rule`   | cream at 14% opacity   | hairlines                                             |

Headlines are set in Montserrat Bold and body text in Roboto Slab, as in the deck. The copy presents White Sail Labs as an independent market research lab whose agents are built by applied AI engineers (intelligence-agency veterans) and business engineers (domain experts), and is built for investors, CEOs, and strategists rather than investors alone. The forms and contact dialog promise a reply within 1 business day.

## Open items

- **Privacy / Terms**: `app/privacy` and `app/terms` are first drafts written from what the site and the Worker actually do. Have them reviewed before relying on them; the Terms have no governing-law clause yet. The privacy policy lists the Worker's service providers, so update it if those change.
- **Contact address**: `site.email` is a personal mailbox and now appears on the legal pages and in the contact dialog; consider a role address such as hello@ or privacy@.
