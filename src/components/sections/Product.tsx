import { FeedbackLoop } from "../FeedbackLoop";
import { Reveal } from "../Reveal";
import styles from "./Product.module.css";

const layers = [
  {
    title: "The base map",
    body: "Every company, market and relationship, kept live by agent swarms and massive data pipelines.",
  },
  {
    title: "Your judgment layers",
    body: "Each firm pins its own views, encodes its investment philosophy and routes its decision rules.",
  },
  {
    title: "Learning from outcomes",
    body: "Observed outcomes refine the map and tailor each firm’s insights.",
  },
];

const landscape = [
  { name: "Market intelligence", body: "Has the data, but no judgment or outcomes." },
  { name: "Investment firms", body: "Have the judgment, but can’t build the map." },
  {
    name: "Whitesail",
    body: "Closes the loop: institutions compound their knowledge while the map keeps improving.",
  },
];

export function Product() {
  return (
    <section id="product" className="section dark">
      <div className="container">
        <Reveal className={styles.head}>
          <span className="eyebrow">01 · Product</span>
          <h2 className="h2">Live Market Maps.</h2>
          <p className="lede">
            One shared map of the economy, kept live by AI agents. Each firm layers its own
            judgment on top, and real outcomes keep both sharp.
          </p>
        </Reveal>

        <div className={styles.grid}>
          <ol className={styles.layers}>
            {layers.map((layer, i) => (
              <Reveal as="li" key={layer.title} delay={i * 90} className={styles.layer}>
                <span className="num">0{i + 1}</span>
                <div>
                  <h3 className={styles.layerTitle}>{layer.title}</h3>
                  <p className={styles.layerBody}>{layer.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={120} className={styles.loop}>
            <FeedbackLoop />
          </Reveal>
        </div>

        <Reveal className={styles.landscape}>
          {landscape.map((item) => (
            <div
              key={item.name}
              className={`${styles.cell} ${item.name === "Whitesail" ? styles.highlight : ""}`}
            >
              <h3 className={styles.cellTitle}>{item.name}</h3>
              <p className={styles.cellBody}>{item.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
