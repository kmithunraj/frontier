"use client";

import { useState } from "react";
import { event, preEventCities } from "@/lib/data";
import { IndiaNetwork } from "@/components/IndiaNetwork";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function PreEvents() {
  const [active, setActive] = useState(preEventCities[0]?.id);

  const selected = preEventCities.find((c) => c.id === active) ?? preEventCities[0];

  return (
    <section
      id="pre-events"
      className="relative py-24 md:py-32 section-pad border-b border-border overflow-hidden"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Across India"
          title="The event starts before the event."
          description="City-level activations — dinners, roundtables, showcases and campus moments — converge into the main gathering. Cities and formats below are proposed and editable."
          className="mb-14 max-w-3xl"
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <Reveal className="lg:col-span-5 relative border border-border bg-elevated/40 p-4 sm:p-6 min-h-[320px]">
            <IndiaNetwork showLabels className="min-h-[300px]" />
            <p className="mt-2 font-mono-meta text-[0.6rem] tracking-[0.16em] uppercase text-dim text-center">
              Proposed city network · Not all confirmed
            </p>
          </Reveal>

          <div className="lg:col-span-7">
            <ul className="grid sm:grid-cols-2 gap-3">
              {preEventCities.map((city, i) => (
                <Reveal key={city.id} delay={i * 0.04}>
                  <button
                    type="button"
                    onClick={() => setActive(city.id)}
                    className={cn(
                      "w-full text-left border p-4 sm:p-5 transition-all min-h-[44px]",
                      active === city.id
                        ? "border-accent bg-accent-soft"
                        : "border-border bg-background hover:border-border-strong"
                    )}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-lg font-bold tracking-tight">
                        {city.city}
                      </span>
                      <span className="font-mono-meta text-[0.6rem] tracking-[0.14em] text-dim">
                        {city.date}
                      </span>
                    </div>
                    <p className="mt-2 font-mono-meta text-[0.65rem] tracking-[0.14em] uppercase text-accent">
                      {city.type}
                    </p>
                    <p className="mt-2 text-sm text-muted">{city.theme}</p>
                  </button>
                </Reveal>
              ))}
            </ul>

            {selected ? (
              <Reveal className="mt-6 border border-border p-5 sm:p-6 bg-soft/60">
                <p className="eyebrow">Selected</p>
                <h3 className="mt-2 font-display text-2xl font-bold">
                  {selected.city} · {selected.type}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Theme: {selected.theme} · Host: {selected.host}
                </p>
              </Reveal>
            ) : null}

            <div className="mt-8">
              <a href={event.hostUrl} className="btn-primary">
                Host a Pre-Event
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
