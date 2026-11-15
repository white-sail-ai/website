import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy policy | ${site.name}`,
  description: `What personal information ${site.name} collects through this website, and what you can ask us to do with it.`,
};

// Describes what the site, PostHog (src/instrumentation-client.ts) and the forms Worker
// (worker/src/index.ts) actually do with data.
// Update it whenever a form field or a service provider changes.
export default function Privacy() {
  const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

  return (
    <LegalPage title="Privacy policy" updated="November 15, 2026">
      <p>
        This policy explains what personal information {site.name} (“we”) collects through this
        website, why we collect it, and what you can ask us to do with it.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Early access requests:</strong> your name, work email, company, and anything you
          write in the message field.
        </li>
        <li>
          <strong>Newsletter sign-ups:</strong> your email address.
        </li>
        <li>
          <strong>Emails you send us</strong> through the Get in touch or Careers links: whatever
          you choose to include, such as a CV or a LinkedIn profile.
        </li>
      </ul>
      <p>
        <strong>Visit statistics:</strong> which pages you view, which buttons you click, and
        technical details such as your browser, device type, approximate location (country and
        city, derived from your IP address), and the page that referred you. We use this only in
        aggregate, to understand how the website is used. It isn’t linked to your name or email,
        even if you fill in a form.
      </p>
      <p>
        This website doesn’t use cookies or store anything on your device, and it doesn’t use
        advertising trackers.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to you and to set up your access to {site.name}.</li>
        <li>To send you the newsletter you subscribed to.</li>
        <li>To consider your application if you apply for a role.</li>
      </ul>
      <p>We don’t sell your personal information or share it for advertising.</p>

      <h2>Who processes it for us</h2>
      <p>We use a few service providers, each only for the purpose listed:</p>
      <ul>
        <li>
          <strong>Cloudflare</strong> receives the forms on this website and passes them on.
        </li>
        <li>
          <strong>Notion</strong> stores early access requests.
        </li>
        <li>
          <strong>Slack</strong> notifies our team of new early access requests.
        </li>
        <li>
          <strong>Resend</strong> keeps our newsletter mailing list and sends the newsletter.
        </li>
        <li>
          <strong>PostHog</strong> collects and stores the visit statistics.
        </li>
        <li>
          <strong>GitHub</strong> hosts this website and, like any web host, may log technical
          data such as your IP address.
        </li>
      </ul>
      <p>
        Some of these providers are based in the United States, so your information may be
        processed there.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep your details only as long as we need them for the purposes above. You can ask us
        to delete them at any time.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Every newsletter includes a link to unsubscribe.</li>
        <li>
          You can ask to see, correct, or delete the information we hold about you by emailing{" "}
          {mail}.
        </li>
      </ul>

      <h2>Changes to this policy</h2>
      <p>If we change this policy, we’ll update this page and the date at the top.</p>

      <h2>Contact</h2>
      <p>Questions about privacy? Email {mail}.</p>
    </LegalPage>
  );
}
