"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { event, navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[rgba(9,9,9,0.88)] backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav
        className="section-pad container-page flex h-16 md:h-[4.25rem] items-center justify-between gap-4"
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center gap-3 min-w-0 group">
          <span className="font-display font-bold tracking-tight text-sm sm:text-base group-hover:text-accent transition-colors">
            HEADSTART
          </span>
          <span className="hidden sm:block h-4 w-px bg-border-strong" aria-hidden />
          <span className="font-mono-meta text-[0.65rem] tracking-[0.14em] text-muted truncate">
            FRONTIER TECH WEEK
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono-meta text-[0.68rem] tracking-[0.14em] uppercase text-muted hover:text-foreground transition-colors link-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={event.registerUrl}
            className="btn-primary !min-h-10 !px-4 !text-[0.68rem]"
          >
            Register
          </a>
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center size-11 border border-border"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-[rgba(9,9,9,0.97)] backdrop-blur-xl border-t border-border"
          >
            <div className="section-pad py-8 flex flex-col h-full">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 border-b border-border font-display text-2xl font-semibold"
                    >
                      <span>{link.label}</span>
                      <span className="font-mono-meta text-[0.65rem] text-dim">
                        0{i + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={event.registerUrl}
                className="btn-primary w-full mt-auto mb-8"
                onClick={() => setOpen(false)}
              >
                Register Interest
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
