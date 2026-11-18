// A generated cover for a post on the blog index: a colour field, flowing lines, and a sail.
// The palette and the lines' phase come from the slug, so every post gets its own look and
// the same post always gets the same one. No image files to make or keep in step.
const PALETTES = [
  { from: "#1a3263", to: "#3b5ea8", accent: "#fab95b" }, // navy
  { from: "#fab95b", to: "#f08a5d", accent: "#1a3263" }, // amber
  { from: "#2a7f8e", to: "#5fb8b0", accent: "#fcf7f3" }, // teal
  { from: "#7a4fa0", to: "#c27fb3", accent: "#fab95b" }, // plum
  { from: "#d4604a", to: "#fab95b", accent: "#1a3263" }, // coral
];

function hash(text: string) {
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

export function PostCover({ slug, className }: { slug: string; className?: string }) {
  const h = hash(slug);
  const p = PALETTES[h % PALETTES.length];
  const id = `cover-${slug}`;
  const phase = (h >> 3) % 60;
  // Five flowing lines, each a gentle S-curve shifted by the post's phase.
  const lines = [0, 1, 2, 3, 4].map((i) => {
    const y = 120 + i * 26;
    const a = phase + i * 14;
    return `M-20 ${y} C 80 ${y - 50 + a * 0.4}, 160 ${y + 60 - a * 0.3}, 260 ${y} S 420 ${y - 55 + a * 0.3}, 520 ${y - 10}`;
  });
  return (
    <svg className={className} viewBox="0 0 480 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.from} />
          <stop offset="1" stopColor={p.to} />
        </linearGradient>
      </defs>
      <rect width="480" height="300" fill={`url(#${id})`} />
      <circle cx={380 - (h % 50)} cy="70" r="46" fill={p.accent} opacity="0.9" />
      {lines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={p.accent} strokeWidth="2.5" strokeLinecap="round" opacity={0.25 + i * 0.12} />
      ))}
      <path d="M200 240 C 215 190 214 150 202 105 C 200 99 195 99 192 104 C 168 148 140 190 108 240 Z" fill="#fcf7f3" opacity="0.95" />
      <path d="M96 252 H 300" stroke="#fcf7f3" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}
