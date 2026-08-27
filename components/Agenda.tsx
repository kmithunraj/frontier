"use client";

import { useId, useState } from "react";
import { agendaDays, type SessionType } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const typeColor: Record<SessionType, string> = {
  KEYNOTE: "text-accent border-accent/40",
  PANEL: "text-blue border-blue/40",
  WORKSHOP: "text-orange border-orange/40",
  DEMO: "text-accent border-accent/40",
  INVESTOR: "text-orange border-orange/40",
  "ROUND TABLE": "text-blue border-blue/40",
  NETWORKING: "text-muted border-border-strong",
  "CLOSED DOOR": "text-danger border-danger/40",
  SOCIAL: "text-muted border-border-strong",
};

export function Agenda() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const day = agendaDays[active];

  return (
    <section
      id="agenda"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Programme"
          title="The days of density."
          description="A working structure for the main gathering. Session details are illustrative placeholders until speakers and formats are confirmed."
          className="mb-12"
        />

        <div
          role="tablist"
          aria-label="Agenda days"
          className="flex flex-wrap gap-2 mb-10"
        >
          {agendaDays.map((d, i) => (
            <button
              key={d.id}
              id={`${baseId}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={active === i}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "min-h-11 px-4 sm:px-5 font-mono-meta text-[0.7rem] tracking-[0.16em] uppercase border transition-colors",
                active === i
                  ? "bg-accent text-[#0a0a0a] border-accent"
                  : "border-border text-muted hover:border-border-strong hover:text-foreground"
              )}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="font-mono-meta text-[0.65rem] tracking-[0.18em] text-dim uppercase">
              {day.date}
            </p>
            <h3 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">
              {day.title}
            </h3>
            <p className="mt-4 text-muted text-sm leading-relaxed max-w-sm">
              Placeholder programme structure — replace with confirmed sessions as
              they lock.
            </p>
          </Reveal>

          <div
            id={`${baseId}-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active}`}
            className="lg:col-span-8"
          >
            <ol className="border-l border-border ml-2 sm:ml-3 space-y-0">
              {day.sessions.map((session, i) => (
                <Reveal key={`${day.id}-${session.time}-${i}`} delay={i * 0.04}>
                  <li className="relative pl-6 sm:pl-8 pb-8 last:pb-0 group">
                    <span
                      className="absolute left-0 top-1.5 size-2 -translate-x-[4.5px] rounded-full bg-accent"
                      aria-hidden
                    />
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <time className="font-mono-meta text-[0.7rem] tracking-[0.14em] text-dim">
                        {session.time}
                      </time>
                      <span
                        className={cn(
                          "font-mono-meta text-[0.6rem] tracking-[0.14em] uppercase border px-2 py-0.5",
                          typeColor[session.type]
                        )}
                      >
                        {session.type}
                      </span>
                    </div>
                    <h4 className="font-display text-lg sm:text-xl font-semibold tracking-tight group-hover:text-accent transition-colors">
                      {session.title}
                    </h4>
                    <p className="mt-2 text-sm text-muted leading-relaxed max-w-xl">
                      {session.description}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
