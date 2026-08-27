"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { bangaloreWeek, event } from "@/lib/data";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden grain"
    >
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(117,254,114,0.16),transparent_42%),radial-gradient(ellipse_at_10%_90%,rgba(117,254,114,0.06),transparent_40%)]"
        aria-hidden
      />
      <div
        className="absolute right-[-10%] top-[15%] size-[55vmax] rounded-full border border-accent/20 opacity-40"
        aria-hidden
      />
      <div
        className="absolute right-[8%] top-[28%] size-[28vmax] rounded-full border border-accent/30 opacity-50"
        aria-hidden
      />

      <div className="relative z-[2] section-pad container-page pt-24 pb-16 w-full">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="eyebrow mb-5"
        >
          {event.presenter} PRESENTS
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-extrabold text-[clamp(2.75rem,10vw,7.5rem)] leading-[0.9] tracking-[-0.04em] max-w-[11ch]"
        >
          {event.fullName}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="mt-6 max-w-xl text-xl sm:text-2xl font-display font-semibold tracking-tight text-balance"
        >
          {event.tagline}
        </motion.p>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mt-4 max-w-lg text-muted leading-relaxed"
        >
          {event.subTagline}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-2 border border-accent/40 bg-accent-soft px-4 py-3"
        >
          <span className="font-mono-meta text-[0.65rem] tracking-[0.16em] uppercase text-accent">
            First edition
          </span>
          <span className="text-dim" aria-hidden>
            /
          </span>
          <span className="font-display font-semibold">
            {bangaloreWeek.city} · {bangaloreWeek.dates}
          </span>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.36 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a href={event.registerUrl} className="btn-primary">
            Register Interest
          </a>
          <a href="#bangalore" className="btn-secondary">
            Explore Bangalore
            <ArrowDownRight size={14} aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
