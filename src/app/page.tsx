import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Pillars } from "@/components/sections/Pillars";
import { Product } from "@/components/sections/Product";
import { Team } from "@/components/sections/Team";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Product />
        <Pillars />
        <HowWeWork />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
