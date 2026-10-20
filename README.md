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
    page.tsx          the single screen: map behind everything, message panel on top,
                      attributes strip above the footer
    icon.svg          favicon (sail mark on a navy circle)
  components/
    Header, Footer
    Logo              sail mark + wordmark
    Attributes        In depth / At scale / All the time / Your judgment, with line glyphs
    MarketMap         canvas "live market map" filling the screen behind the content
  lib/site.ts         site name, headline, subline, description, email links
```

The page is sized to the viewport (`100dvh`) and `html`/`body` never scroll, so new content has to fit on one screen. The fit has been checked from a 320×568 phone up to a 1440×900 desktop, plus tablets and a phone held sideways. The headline is sized to the screen width on phones, and the map caption shortens or hides itself when the open map area is small.

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
