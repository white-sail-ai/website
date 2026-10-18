# Whitesail website

Marketing site for Whitesail Labs: a single page built with Next.js 16 (App Router) and CSS Modules. It has no UI dependencies.

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
    globals.css       brand tokens, type scale, buttons, reveal animation
    page.tsx          composes the sections
  components/
    Header, Footer, Logo
    MarketMap         canvas "live market map" in the hero
    FeedbackLoop      SVG loop diagram in the Product section
    Reveal            fade-up on scroll (skipped for reduced motion)
    sections/         Hero, Product, Pillars, HowWeWork, Team, Contact
  lib/site.ts         site name, tagline, contact and careers emails, nav
```

## Brand

Colors and type come from the Whitesail Labs pitch deck:

| Token     | Value     | Use                                  |
| --------- | --------- | ------------------------------------ |
| `--navy`  | `#1A3263` | ink, dark sections                   |
| `--cream` | `#FCF7F3` | page background                      |
| `--sand`  | `#F3EEE8` | text on navy, alternate background   |
| `--amber` | `#FAB95B` | accent (use as text on navy only)    |
| `--slate` | `#4C5A75` | secondary text on light backgrounds  |
| `--mist`  | `#B9C3D6` | secondary text on navy               |

Headlines are set in Montserrat Bold and body text in Roboto Slab, as in the deck.

## Open items

- **Logo**: `components/Logo.tsx` renders a text wordmark for now. Drop the logo files into `public/` and swap them in there. Add `src/app/icon.png` (or `icon.svg`) for the favicon.
- **Emails**: confirm the contact and careers addresses in `src/lib/site.ts`.
- **Privacy / Terms**: the footer links don't go anywhere yet (`components/Footer.tsx`).
