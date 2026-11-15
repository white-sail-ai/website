// Visit tracking with PostHog. Next.js runs this file in the browser before the page becomes
// interactive (see node_modules/next/dist/docs/.../instrumentation-client.md).
//
// Both values are inlined at build time from GitHub repository variables (see the README).
// Without a key, nothing loads and nothing is sent, which is the case in local development.
import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

if (key) {
  try {
    posthog.init(key, {
      api_host: host,
      // Pins PostHog's default behaviour, including a pageview on every client-side navigation.
      defaults: "2026-08-30",
      // No cookies, localStorage or sessionStorage, so the site needs no cookie banner.
      // PostHog counts unique visitors with a privacy-preserving hash on its servers instead.
      // This must also be turned on in the PostHog project settings, or events are dropped.
      cookieless_mode: "always",
      // Anonymous visitors only: we never identify anyone on the marketing site.
      person_profiles: "never",
      // The forms collect names and emails, so no screen recordings, and no surveys either.
      disable_session_recording: true,
      disable_surveys: true,
    });
  } catch {
    // Analytics must never break the site.
  }
}
