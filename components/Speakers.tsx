"use client";

import { useMemo, useState } from "react";
import { speakerFilters, speakers, type SpeakerFilter } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Speakers() {
  const [filter, setFilter] = useState<SpeakerFilter>("ALL");

  const filtered = useMemo(() => {
    if (filter === "ALL") return speakers;
    return speakers.filter((s) => s.category === filter);
  }, [filter]);

  return (
    <section
      id="speakers"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <SectionHeading
            eyebrow="Speakers"
            title="People worth showing up for."
            description="Speaker lineup announcing soon. No invented names — cards will fill as confirmations land."
          />
          <a href="#speakers" className="btn-secondary self-start lg:self-auto">
            View All Speakers
          </a>
        </div>

        <div
          role="toolbar"
          aria-label="Filter speakers"
          className="flex flex-wrap gap-2 mb-10"
        >
          {speakerFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "min-h-10 px-3 sm:px-4 font-mono-meta text-[0.65rem] tracking-[0.14em] uppercase border transition-colors",
                filter === f
                  ? "border-accent text-accent bg-accent-soft"
                  : "border-border text-muted hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((speaker, i) => (
            <Reveal
              key={speaker.id}
              delay={i * 0.04}
              className="group border border-border bg-elevated/30 overflow-hidden"
            >
              <div className="aspect-[4/5] bg-soft relative flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(198,240,77,0.12), transparent 50%, rgba(122,155,184,0.1))",
                  }}
                />
                <span className="font-mono-meta text-[0.65rem] tracking-[0.18em] uppercase text-dim relative z-[1]">
                  Photo TBA
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <p className="font-display text-base sm:text-lg font-bold tracking-tight">
                  {speaker.name}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-muted">
                  {speaker.designation}
                </p>
                <p className="mt-3 font-mono-meta text-[0.6rem] tracking-[0.14em] uppercase text-accent">
                  {speaker.category}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
