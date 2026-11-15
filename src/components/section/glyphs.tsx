// Symbols for the lab's three groups, drawn on the same 48-unit grid as the capability glyphs.

type Props = { className?: string; accentClass?: string };

// Three connected nodes: the engineers who apply AI.
export function EngineersGlyph({ className, accentClass }: Props) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M12 34 L24 14 L36 34 Z" />
      <circle cx="12" cy="34" r="4.5" />
      <circle cx="36" cy="34" r="4.5" />
      <circle cx="24" cy="14" r="4.5" className={accentClass} />
    </svg>
  );
}

// A compass: the domain experts who frame the problem and set the course.
export function CompassGlyph({ className, accentClass }: Props) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="18" />
      <path d="M24 9 V13 M39 24 H35 M24 39 V35 M9 24 H13" />
      <path d="M30 18 L26.5 26.5 L18 30 L21.5 21.5 Z" />
      <circle cx="24" cy="24" r="2.6" className={accentClass} />
    </svg>
  );
}

// Three sails in formation: the fleet both teams build.
export function FleetGlyph({ className, accentClass }: Props) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M7 34 L17 13 L17 34 Z" />
      <path d="M21 34 L31 9 L31 34 Z" />
      <path d="M35 34 L42 19 L42 34 Z" />
      <path d="M4 40 H44" />
      <circle cx="31" cy="6" r="2.4" className={accentClass} />
    </svg>
  );
}
