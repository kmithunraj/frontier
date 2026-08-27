"use client";

import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="The Experience"
          title="More than a stage."
          description="The value isn't only what happens on stage — it's who you meet, what you discover, and what you leave with."
          className="mb-14 md:mb-16"
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {experiences.map((item, i) => (
            <Reveal
              key={item.number}
              delay={i * 0.06}
              className={cn(
                "group relative border border-border bg-elevated/30 p-6 sm:p-8 min-h-[240px] flex flex-col overflow-hidden transition-all duration-300",
                "hover:border-accent-border hover:bg-accent-soft/40",
                i === 0 && "md:col-span-2 xl:col-span-1 xl:row-span-1",
                i === 1 && "xl:translate-y-6"
              )}
            >
              <div
                className="absolute -right-6 -top-6 size-28 rounded-full bg-accent/5 blur-2xl group-hover:bg-accent/15 transition-colors"
                aria-hidden
              />
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono-meta text-[0.7rem] tracking-[0.2em] text-accent">
                  {item.number}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-dim group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  aria-hidden
                />
              </div>
              <h3 className="mt-8 font-display text-3xl sm:text-4xl font-bold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed max-w-sm">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
