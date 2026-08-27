"use client";

import { event } from "@/lib/data";
import { IndiaNetwork } from "@/components/IndiaNetwork";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section
      id="register"
      className="relative py-28 md:py-40 section-pad overflow-hidden grain border-b border-border"
    >
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <IndiaNetwork showLabels={false} className="h-full scale-110" />
      </div>
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(9,9,9,0.2),var(--bg)_70%)]"
        aria-hidden
      />

      <div className="container-page relative z-[2] text-center max-w-4xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-6 justify-center inline-flex">Final call</p>
          <h2 className="font-display font-extrabold text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.95] tracking-tight text-balance">
            India&apos;s ecosystem
            <br />
            is about to converge.
          </h2>
          <p className="mt-6 text-xl sm:text-2xl font-display font-semibold text-muted">
            Be in the room.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={event.registerUrl} className="btn-primary">
              Register Now
            </a>
            <a href={event.partnerUrl} className="btn-secondary">
              Become a Partner
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
