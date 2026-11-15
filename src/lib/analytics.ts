import posthog from "posthog-js";

// Custom events for the site's calls to action, on top of PostHog's pageviews and autocapture.
// Never pass anything a visitor typed (names, emails, messages) as a property.
type Events = {
  dialog_opened: { dialog: "early_access" | "newsletter" | "contact" | "careers"; label?: string };
  form_submitted: { form: "early_access" | "newsletter"; ok: boolean };
  application_started: { role: string | null };
};

export function track<E extends keyof Events>(event: E, properties: Events[E]) {
  // posthog.capture is a no-op until init runs, which only happens when a key is configured.
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  try {
    posthog.capture(event, properties);
  } catch {
    // Analytics must never break the site.
  }
}
