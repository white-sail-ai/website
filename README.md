# Whitesail website

Marketing site for Whitesail Labs: a single, non-scrolling screen built with Next.js 16 (App Router) and CSS Modules. It has no UI dependencies.

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
    globals.css       brand tokens, base type, buttons
    page.tsx          the single screen: map behind everything, message panel on top,
                      attributes strip above the footer
    icon.svg          favicon (sail mark on a navy circle)
  components/
    Header, Footer
    Logo              sail mark + wordmark
    Attributes        In depth / At scale / All the time / Your judgment, with line glyphs
    MarketMap         canvas "live market map" filling the screen behind the content
  lib/site.ts         site name, headline, subline, description, email links
.github/workflows/    nextjs.yml builds the site and publishes it to GitHub Pages
public/.nojekyll      tells GitHub Pages to serve the _next/ folder as is
```

The page is sized to the viewport (`100dvh`) and `html`/`body` never scroll, so new content has to fit on one screen. The fit has been checked from a 320×568 phone up to a 1440×900 desktop, plus tablets and a phone held sideways. The headline is sized to the screen width on phones, and the map caption shortens or hides itself when the open map area is small.

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

Colors and type come from the Whitesail Labs pitch deck:

| Token     | Value     | Use                                        |
| --------- | --------- | ------------------------------------------ |
| `--navy`  | `#1A3263` | ink, primary button                        |
| `--cream` | `#FCF7F3` | page background                            |
| `--sand`  | `#F3EEE8` | sail fill in the logo                      |
| `--amber` | `#FAB95B` | accent (live dot, map signals); not for text |
| `--slate` | `#4C5A75` | secondary text                             |

Headlines are set in Montserrat Bold and body text in Roboto Slab, as in the deck. The copy follows the customer half of the deck and speaks to investment firms.

## Open items

- **Privacy / Terms**: the footer links don't go anywhere yet (`components/Footer.tsx`).
