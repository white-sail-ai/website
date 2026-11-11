// Receives the website's forms and keeps secrets server-side.
//   POST /early-access -> Notion database (source of truth), then a Slack ping
//   POST /newsletter   -> Resend Audience (the mailing list)

export interface Env {
  ALLOWED_ORIGINS: string; // comma-separated, e.g. https://white-sail.ai
  NOTION_TOKEN: string;
  NOTION_DATABASE_ID: string;
  SLACK_WEBHOOK_URL: string;
  RESEND_API_KEY: string;
  RESEND_AUDIENCE_ID: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = req.headers.get("Origin") ?? "";
    const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
    const cors: Record<string, string> = allowed.includes(origin)
      ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" }
      : {};
    const reply = (status: number, body: object) =>
      Response.json(body, { status, headers: cors });

    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          ...cors,
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    const path = new URL(req.url).pathname;
    if (req.method !== "POST" || (path !== "/early-access" && path !== "/newsletter")) {
      return reply(404, { error: "Not found" });
    }
    // Browsers always send Origin on cross-origin POSTs; refuse anything else.
    if (!cors["Access-Control-Allow-Origin"]) return reply(403, { error: "Forbidden" });

    try {
      const raw = await req.text();
      if (raw.length > 8_000) throw new HttpError(413, "Message too long.");
      let data: Record<string, unknown>;
      try {
        data = JSON.parse(raw);
      } catch {
        throw new HttpError(400, "Invalid request.");
      }
      // Honeypot: pretend success so bots learn nothing.
      if (str(data.website, 100)) return reply(200, { ok: true });

      const email = str(data.email, 254).toLowerCase();
      if (!EMAIL.test(email)) throw new HttpError(400, "Please enter a valid email address.");

      if (path === "/newsletter") {
        await subscribe(env, email);
      } else {
        const lead = {
          name: str(data.name, 120),
          email,
          firm: str(data.firm, 160),
          message: str(data.message, 1000),
        };
        if (!lead.name || !lead.firm) throw new HttpError(400, "Please fill in your name and company.");
        await saveLead(env, lead);
        ctx.waitUntil(notifySlack(env, lead)); // best effort: never fail the signup over Slack
      }
      return reply(200, { ok: true });
    } catch (err) {
      if (err instanceof HttpError) return reply(err.status, { error: err.message });
      console.error(err);
      return reply(502, { error: "Something went wrong." });
    }
  },
};

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

type Lead = { name: string; email: string; firm: string; message: string };

// Notion database columns: Name (title), Email (email), Firm (text), Message (text),
// Status (select), Submitted (date).
async function saveLead(env: Env, lead: Lead) {
  const text = (content: string) => ({ rich_text: content ? [{ text: { content } }] : [] });
  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: env.NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: lead.name } }] },
        Email: { email: lead.email },
        Firm: text(lead.firm),
        Message: text(lead.message),
        Status: { select: { name: "New" } },
        Submitted: { date: { start: new Date().toISOString() } },
      },
    }),
  });
  if (!res.ok) throw new Error(`Notion ${res.status}: ${await res.text()}`);
}

async function notifySlack(env: Env, lead: Lead) {
  // Slack mrkdwn: neutralise control characters in user-supplied text.
  const safe = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);
  const lines = [
    `*New early-access request*`,
    `${safe(lead.name)}, ${safe(lead.firm)}`,
    safe(lead.email),
    lead.message && `> ${safe(lead.message).replace(/\n/g, "\n> ")}`,
  ].filter(Boolean);
  const res = await fetch(env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: lines.join("\n") }),
  });
  if (!res.ok) console.error(`Slack ${res.status}`);
}

async function subscribe(env: Env, email: string) {
  const res = await fetch(`https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
