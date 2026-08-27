import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { CityWeek } from "@/components/CityWeek";
import { ComingSoonCities } from "@/components/ComingSoonCities";
import { Speakers } from "@/components/Speakers";
import { Partners } from "@/components/Partners";
import { Gallery } from "@/components/Gallery";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/CursorGlow";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <CityWeek />
        <ComingSoonCities />
        <Speakers />
        <Partners />
        <Gallery />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
