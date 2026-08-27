import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { EventTicker } from "@/components/EventTicker";
import { Manifesto } from "@/components/Manifesto";
import { EventStats } from "@/components/EventStats";
import { Experience } from "@/components/Experience";
import { Audience } from "@/components/Audience";
import { PreEvents } from "@/components/PreEvents";
import { Agenda } from "@/components/Agenda";
import { Tracks } from "@/components/Tracks";
import { Speakers } from "@/components/Speakers";
import { StartupShowcase } from "@/components/StartupShowcase";
import { Matchmaking } from "@/components/Matchmaking";
import { SideEvents } from "@/components/SideEvents";
import { Partners } from "@/components/Partners";
import { WhyHeadstart } from "@/components/WhyHeadstart";
import { GetInvolved } from "@/components/GetInvolved";
import { FAQ } from "@/components/FAQ";
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
        <EventTicker />
        <Manifesto />
        <EventStats />
        <Experience />
        <Audience />
        <PreEvents />
        <Agenda />
        <Tracks />
        <Speakers />
        <StartupShowcase />
        <Matchmaking />
        <SideEvents />
        <Partners />
        <WhyHeadstart />
        <GetInvolved />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
