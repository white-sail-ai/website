// The arrow on buttons, drawn to match the label's stroke and hidden from screen readers
// so it is never read as part of the button's name.
export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 8h10.5M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
