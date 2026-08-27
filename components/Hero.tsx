"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { event, heroMeta } from "@/lib/data";
import { IndiaNetwork } from "@/components/IndiaNetwork";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden grain"
    >
      <div className="absolute inset-0 grid-bg opacity-70" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(198,240,77,0.1),transparent_42%),radial-gradient(ellipse_at_15%_85%,rgba(122,155,184,0.08),transparent_40%)]"
        aria-hidden
      />

      <div className="absolute inset-y-[8%] right-[-8%] w-[70%] md:w-[55%] lg:w-[48%] opacity-35 md:opacity-80 pointer-events-none">
        <IndiaNetwork showLabels={false} className="h-full" />
      </div>

      <div className="relative z-[2] section-pad container-page pt-24 pb-14 md:pb-16 w-full">
        <div className="max-w-3xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="eyebrow mb-5"
          >
            {event.presenter}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold text-[clamp(3.75rem,14vw,9rem)] leading-[0.86] tracking-[-0.045em]"
          >
            {event.name}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="mt-3 font-mono-meta text-[0.75rem] sm:text-sm tracking-[0.28em] text-accent"
          >
            {event.year}
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-6 md:mt-7 max-w-lg text-xl sm:text-2xl md:text-[1.75rem] font-display font-semibold tracking-tight text-balance leading-[1.2]"
          >
            {event.tagline}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono-meta text-[0.7rem] tracking-[0.14em] uppercase text-muted"
          >
            <span>{event.dates}</span>
            <span className="text-dim" aria-hidden>
              /
            </span>
            <span>{event.location}</span>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.36 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href={event.registerUrl} className="btn-primary">
              Register Now
            </a>
            <a href={event.exploreUrl} className="btn-secondary">
              Explore the Experience
              <ArrowDownRight size={14} aria-hidden />
            </a>
            <a href={event.partnerUrl} className="btn-ghost">
              Become a Partner
            </a>
          </motion.div>
        </div>

        <motion.ul
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.48 }}
          className="mt-12 md:mt-16 pt-6 border-t border-border flex flex-wrap gap-x-6 gap-y-3"
        >
          {heroMeta.map((item) => (
            <li
              key={item}
              className="font-mono-meta text-[0.65rem] tracking-[0.18em] text-dim"
            >
              {item}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
