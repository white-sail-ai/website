# Whitesail website

Marketing site for Whitesail Labs: a single, non-scrolling screen built with Next.js 16 (App Router) and CSS Modules. It has no UI dependencies.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # production build; the page is prerendered as static HTML
```

## Structure

```
src/
  app/
    layout.tsx        fonts (Montserrat + Roboto Slab via next/font), metadata
    globals.css       brand tokens, base type, buttons
    page.tsx          the single screen: header, headline, CTA, footer over the map
  components/
    Header, Footer, Logo
    MarketMap         canvas "live market map" filling the background
  lib/site.ts         site name, tagline, description, email links
```

The page is sized to the viewport (`100dvh`) and `html`/`body` never scroll, so new content has to fit on one screen. The fit has been checked from a 375×667 phone up to a 1440×900 desktop, plus a phone held sideways.

## Brand

Colors and type come from the Whitesail Labs pitch deck:

| Token     | Value     | Use                                        |
| --------- | --------- | ------------------------------------------ |
| `--navy`  | `#1A3263` | ink, primary button                        |
| `--cream` | `#FCF7F3` | page background                            |
| `--amber` | `#FAB95B` | accent (live dot, map signals); not for text |
| `--slate` | `#4C5A75` | secondary text                             |

Headlines are set in Montserrat Bold and body text in Roboto Slab, as in the deck.

## Open items

- **Logo**: `components/Logo.tsx` renders a text wordmark for now. Drop the logo files into `public/` and swap them in there. Add `src/app/icon.png` (or `icon.svg`) for the favicon.
- **Privacy / Terms**: the footer links don't go anywhere yet (`components/Footer.tsx`).
