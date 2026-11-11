import { Attributes } from "@/components/Attributes";
import { BuiltFor } from "@/components/BuiltFor";
import { ForecastChart } from "@/components/chart/ForecastChart";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
        <WhoWeAre />
        <Attributes />
        <BuiltFor />
      </main>
      <Footer />
    </div>
  );
}
