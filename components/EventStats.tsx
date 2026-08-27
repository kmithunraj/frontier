"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/lib/data";
import { PlaceholderBadge, Reveal, SectionHeading } from "@/components/ui/Reveal";

function AnimatedNumber({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active || reduce) return;

    let frame: number;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value, reduce]);

  const shown = reduce || !active ? (active ? value : 0) : display;
  const formatted =
    shown >= 1000
      ? `${shown.toLocaleString("en-IN")}${suffix}`
      : `${shown}${suffix}`;

  return <span>{formatted}</span>;
}

export function EventStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section
      id="numbers"
      className="relative py-24 md:py-28 section-pad border-b border-border bg-elevated/40"
    >
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Scale"
            title="By the numbers."
            description="Targets for a gathering built for density — replace with confirmed figures as they lock."
          />
          <PlaceholderBadge />
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border"
        >
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.05}
              className="bg-background p-6 sm:p-8 md:p-10 hover:bg-soft transition-colors"
            >
              <p className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-accent tabular-nums">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  active={inView}
                />
              </p>
              <p className="mt-3 font-mono-meta text-[0.65rem] tracking-[0.18em] text-muted">
                {stat.label}
              </p>
              {stat.placeholder ? (
                <p className="mt-2 text-[0.65rem] text-dim">Target · TBD</p>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
