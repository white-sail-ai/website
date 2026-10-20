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
Dockerfile            production image for Cloud Run (Next.js standalone server)
scripts/              deploy-cloud-run.sh
```

The page is sized to the viewport (`100dvh`) and `html`/`body` never scroll, so new content has to fit on one screen. The fit has been checked from a 320×568 phone up to a 1440×900 desktop, plus tablets and a phone held sideways. The headline is sized to the screen width on phones, and the map caption shortens or hides itself when the open map area is small.

## Deploy to Google Cloud Run

The site runs as a container on Cloud Run: the `Dockerfile` builds a Next.js standalone server that listens on port 8080 and scales to zero when idle.

**1. Deploy the service.** In [Cloud Shell](https://shell.cloud.google.com), or anywhere gcloud is signed in to your tenant:

```bash
gh auth login        # the repo is private; skip if you already have the code
git clone https://github.com/white-sail-ai/website.git && cd website
PROJECT_ID=your-project-id ./scripts/deploy-cloud-run.sh      # REGION=us-east4 to change region
```

Cloud Build builds the image and the script prints the service's `run.app` URL, which you can open right away to check the site.

**2. Point white-sail.ai at it** (Cloud Run domain mappings):

```bash
# One-time: prove you own the domain. Add the TXT record Search Console asks for, signed in
# as the same Google account that runs the commands below.
#   https://search.google.com/search-console  ->  Add property  ->  Domain  ->  white-sail.ai

gcloud beta run domain-mappings create --service whitesail-website --domain white-sail.ai     --region us-central1
gcloud beta run domain-mappings create --service whitesail-website --domain www.white-sail.ai --region us-central1
gcloud beta run domain-mappings describe --domain white-sail.ai --region us-central1   # lists the DNS records to add
```

Add the records it lists at your DNS provider and wait for the certificate (minutes, sometimes a couple of hours). **Don't change the nameservers, and leave the existing MX and TXT records alone**: they carry your email. `www.white-sail.ai` redirects to `white-sail.ai` (see `next.config.ts`).

Domain mappings are a Preview feature with some added latency. For a CDN, WAF or stricter production guarantees, put a global external Application Load Balancer in front of the service instead.

**Redeploying.** Run the script again, or in the Cloud Run console choose *Set up continuous deployment* so every push to your production branch builds and deploys automatically.

**If something blocks it**
- *Org policy rejects `--allow-unauthenticated`*: domain restricted sharing forbids public access. Ask for an exception, or turn off the service's invoker IAM check.
- *Cold starts*: add `--min-instances 1` in the script to keep one instance warm (small monthly cost).
- To try the image locally: `docker build -t whitesail . && docker run -p 8080:8080 whitesail`.

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
