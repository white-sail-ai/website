# Forms Worker

Cloudflare Worker behind the "Request early access" and "Join our newsletter" forms. The site itself is static, so this is the only place that holds secrets.

| Endpoint | Stores in | Also |
| --- | --- | --- |
| `POST /early-access` | Notion database | Slack message (best effort) |
| `POST /newsletter` | Resend Audience | n/a |

Protections: origin allow-list (CORS plus a server-side check), honeypot field, 8 KB body cap, input validation and length limits, Slack text escaped. For heavier abuse, add a Cloudflare rate-limiting rule on the route (and Turnstile if needed).

## One-time setup

1. **Notion.** Create a database with these properties (names and types matter): `Name` (title), `Email` (email), `Firm` (text), `Message` (text), `Status` (select), `Submitted` (date). Create an internal integration at notion.so/profile/integrations, then open the database → ••• → Connections → add it. The database ID is the 32-character part of its URL.
2. **Slack.** Create an Incoming Webhook (api.slack.com/apps → Incoming Webhooks) for the channel that should be pinged.
3. **Resend.** Create an Audience and an API key (Full access is needed to add contacts). Resend handles unsubscribes through its broadcast links. Note it has no built-in double opt-in.
4. **Deploy.**
   ```bash
   cd worker && npm install
   npx wrangler secret put NOTION_TOKEN
   npx wrangler secret put NOTION_DATABASE_ID
   npx wrangler secret put SLACK_WEBHOOK_URL
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put RESEND_AUDIENCE_ID
   npx wrangler deploy
   ```
   Optionally attach a custom domain such as `forms.white-sail.ai` in the Cloudflare dashboard.
5. **Point the site at it.** In GitHub: Settings → Secrets and variables → Actions → Variables → add `FORMS_URL` = the Worker URL (no trailing slash), then re-run the deploy workflow. For local development set `NEXT_PUBLIC_FORMS_URL` in `.env.local` and add `http://localhost:3000` to `ALLOWED_ORIGINS`.
