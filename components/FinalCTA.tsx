"use client";

import { event } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section
      id="register"
      className="relative py-28 md:py-36 section-pad overflow-hidden grain border-b border-border"
    >
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(117,254,114,0.14),transparent_55%)]"
        aria-hidden
      />

      <div className="container-page relative z-[2] text-center max-w-4xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-6">Bangalore · Dec 7–12, 2026</p>
          <h2 className="font-display font-extrabold text-[clamp(2.25rem,7vw,4.75rem)] leading-[0.95] tracking-tight text-balance">
            Be in Bangalore
            <br />
            when the week begins.
          </h2>
          <p className="mt-6 text-lg text-muted max-w-xl mx-auto">
            Register your interest for Frontier Tech Week — starting in Bangalore,
            then coming to more cities.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={event.registerUrl} className="btn-primary">
              Register Interest
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
