// Site-wide copy and links. White Sail Labs is an independent market research lab; the copy
// speaks to everyone who acts on its research, not only investors.
export const site = {
  name: "White Sail Labs",
  email: "abotzer@white-sail.ai",
  headline: ["Your decisions.", "Better informed."],
  description:
    "White Sail Labs is an independent market research lab. Our applied AI engineers and domain experts build research agents that follow every company, market, and trend you care about, around the clock.",
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
  const to = site.email;
  return [
    {
      label: "Gmail",
      href: `https://mail.google.com/mail/?${query({ view: "cm", fs: "1", to, su: subject, body })}`,
      external: true,
    },
    {
      label: "Outlook",
      href: `https://outlook.office.com/mail/deeplink/compose?${query({ to, subject, body })}`,
      external: true,
    },
    { label: "Mail app", href: `mailto:${to}?${query({ subject, body })}`, external: false },
  ];
}
