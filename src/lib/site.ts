// Site-wide copy and links. Copy follows the customer half of the deck.
const email = "abotzer@white-sail.ai";

export const site = {
  name: "Whitesail",
  legalName: "Whitesail Labs",
  headline: ["Your decisions.", "Better informed, at\u00a0scale, always-on."],
  subline: ["Today, asking AI is on you.", "We do it for you, continuously, and efficiently."],
  description:
    "Research agents that work your mandate around the clock: every company in your universe researched in depth, with your own judgment layered on top.",
};

export const jobs = [
  { title: "Forward Deployed Engineer", location: "NY / US Remote" },
  { title: "Applied AI Engineer", location: "Tel-Aviv" },
  { title: "Software Engineer", location: "Tel-Aviv" },
];

// A plain mailto: link does nothing for people without a desktop mail app, so offer webmail too.
export function composeLinks(subject: string, body = "") {
  const query = (params: Record<string, string>) =>
    new URLSearchParams(params).toString().replace(/\+/g, "%20");
  return [
    {
      label: "Gmail",
      href: `https://mail.google.com/mail/?${query({ view: "cm", fs: "1", to: email, su: subject, body })}`,
      external: true,
    },
    {
      label: "Outlook",
      href: `https://outlook.office.com/mail/deeplink/compose?${query({ to: email, subject, body })}`,
      external: true,
    },
    { label: "Mail app", href: `mailto:${email}?${query({ subject, body })}`, external: false },
  ];
}
