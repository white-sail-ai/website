// Forms post to a small Cloudflare Worker (see /worker), because this site is a static
// export with nowhere safe to keep Notion, Slack or Resend secrets.
// NEXT_PUBLIC_FORMS_URL is inlined at build time, e.g. https://forms.white-sail.ai
const base = (process.env.NEXT_PUBLIC_FORMS_URL ?? "").replace(/\/+$/, "");

export type FormResult = { ok: true } | { ok: false; message: string };

export async function submitForm(
  path: "/early-access" | "/newsletter",
  data: Record<string, string>,
): Promise<FormResult> {
  const fallback = "Something went wrong. Please try again, or email us directly.";
  if (!base) return { ok: false, message: fallback };
  try {
    const res = await fetch(`${base}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) return { ok: true };
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, message: res.status < 500 && body?.error ? body.error : fallback };
  } catch {
    return { ok: false, message: fallback };
  }
}
