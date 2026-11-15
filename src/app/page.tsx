import { Attributes } from "@/components/Attributes";
import { BuiltFor } from "@/components/BuiltFor";
import { ForecastChart } from "@/components/chart/ForecastChart";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ChartPaper } from "@/components/section/ChartPaper";
import { RevealObserver } from "@/components/section/RevealObserver";
import { WhoWeAre } from "@/components/WhoWeAre";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.band}>
        <Header />
      </div>
      <main>
        <ForecastChart />
        {/* The chart's paper carries on under the next two sections, still and faint. */}
        <div className={styles.continued} data-header="light">
          <ChartPaper ink="26 50 99" paper="251 248 241" moment={140} className={styles.paper} />
          <WhoWeAre />
          <Attributes />
        </div>
        <BuiltFor />
      </main>
      <Footer />
      <RevealObserver />
    </div>
  );
}
