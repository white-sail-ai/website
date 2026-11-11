import type { CSSProperties } from "react";
import { arrivalTime, heroLinks, heroNodes, type RippleLink, type RippleNode } from "@/lib/ripple";
import { site } from "@/lib/site";
import { ContactButton } from "../ContactButton";
import { EarlyAccessButton } from "../EarlyAccessButton";
import { ChartCanvas } from "./ChartCanvas";
import styles from "./ForecastChart.module.css";
import { CompanyMark, PressureKey, StationKey, WindKey } from "./glyphs";

/**
 * The first screen: a forecast chart of one illustrative ripple, from a supplier's surprise to the
 * companies downstream of it, with the headline set in the chart's title block.
 */
export function ForecastChart() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <ChartCanvas links={heroLinks} className={styles.canvas} />

      <p className={styles.tag} data-knockout="box">
        Illustrative
      </p>

      <figure className={styles.ripple}>
        <figcaption className="sr-only">
          An illustrative ripple: a surprise in SK hynix’s output guidance moves through NVIDIA to
          Microsoft and Meta, and against Samsung.
        </figcaption>
        <ol className={styles.nodes}>
          {heroNodes.map((node) => (
            <Node key={node.id} node={node} inbound={heroLinks.find((link) => link.to === node.id)} />
          ))}
        </ol>
      </figure>

      <div className={styles.titleBlock}>
        <div className={styles.key} aria-hidden="true">
          <PressureKey className={styles.keyPressure} />
          <WindKey className={styles.keyWind} />
          <StationKey className={styles.keyStation} />
        </div>
        <div className={styles.titleBody}>
          <h1 id="hero-title" className={styles.headline}>
            {site.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className={styles.subline}>By our AI-driven market research lab.</p>
          <div className={styles.actions}>
            <EarlyAccessButton className={`button button-primary ${styles.primary}`} />
            <ContactButton className={`button button-ghost ${styles.secondary}`} label="Get in touch" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Node({ node, inbound }: { node: RippleNode; inbound?: RippleLink }) {
  const appear = { "--appear": `${arrivalTime(heroLinks, node.id)}s` } as CSSProperties;
  return (
    <li className={styles.node} data-tone={node.tone} style={appear}>
      <span className={styles.marker} data-marker={node.id} style={place(node.marker)}>
        <span className="sr-only">Step </span>
        {node.step}
      </span>
      <span
        className={styles.station}
        data-station={node.id}
        style={{ ...place(node.station), "--d": node.station.d } as CSSProperties}
        aria-hidden="true"
      >
        <CompanyMark company={node.id} className={styles.mark} />
      </span>
      <p className={styles.label} style={place(node.label)} data-knockout>
        <strong>{node.name}</strong>
        {node.details.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
      {inbound?.note && (
        <p className={styles.note} style={place(inbound.note)} data-knockout>
          {inbound.note.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      )}
    </li>
  );
}

function place({ x, y }: { x: number; y: number }) {
  return { "--x": `${x}%`, "--y": `${y}%` } as CSSProperties;
}
