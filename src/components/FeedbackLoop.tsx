import styles from "./FeedbackLoop.module.css";

const C = 200;
const R = 132;
const CIRCUMFERENCE = 2 * Math.PI * R;

const point = (deg: number, r = R) => {
  const rad = (deg * Math.PI) / 180;
  return { x: C + Math.cos(rad) * r, y: C + Math.sin(rad) * r };
};

// Labels sit outside the ring so the track never crosses them.
const stages = [
  { deg: -90, num: "01", label: "Market map", anchor: "middle", dx: 0, dy: -24 },
  { deg: 30, num: "02", label: "Judgment", anchor: "start", dx: 18, dy: 5 },
  { deg: 150, num: "03", label: "Outcomes", anchor: "end", dx: -18, dy: 5 },
] as const;

// Arrowheads sit midway between stages, pointing clockwise.
const arrows = [-30, 90, 210];

export function FeedbackLoop() {
  return (
    <figure className={styles.figure}>
      <svg viewBox="-75 20 550 330" className={styles.svg} role="img" aria-labelledby="loop-title">
        <title id="loop-title">
          Feedback loop: the live market map informs each firm’s judgment, decisions produce
          outcomes, and outcomes sharpen the map.
        </title>
        <circle cx={C} cy={C} r={R} className={styles.track} />
        <circle
          cx={C}
          cy={C}
          r={R}
          className={styles.signal}
          strokeDasharray={`56 ${CIRCUMFERENCE - 56}`}
          style={{ "--circumference": `${CIRCUMFERENCE}` } as React.CSSProperties}
        />
        {arrows.map((deg) => {
          const { x, y } = point(deg);
          return (
            <path
              key={deg}
              d="M -4 -5 L 4 0 L -4 5"
              className={styles.arrow}
              transform={`translate(${x} ${y}) rotate(${deg + 90})`}
            />
          );
        })}
        {stages.map(({ deg, num, label, anchor, dx, dy }) => {
          const { x, y } = point(deg);
          return (
            <g key={num}>
              <circle cx={x} cy={y} r={9} className={styles.node} />
              <circle cx={x} cy={y} r={3} className={styles.core} />
              <text x={x + dx} y={y + dy} textAnchor={anchor} className={styles.label}>
                <tspan className={styles.num}>{num}</tspan> {label}
              </text>
            </g>
          );
        })}
        <text x={C} y={C - 6} textAnchor="middle" className={styles.center}>
          Outcomes sharpen
        </text>
        <text x={C} y={C + 14} textAnchor="middle" className={styles.center}>
          map and judgment
        </text>
      </svg>
    </figure>
  );
}
