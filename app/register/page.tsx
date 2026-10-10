import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RegistrationForm } from "@/components/register/RegistrationForm";
import { contactEmail, event } from "@/lib/data";

export const metadata: Metadata = {
  title: `Register — Headstart ${event.fullName} · Bangalore, Dec 7–12, 2026`,
  description:
    "Get your pass for Headstart Frontier Tech Week Bangalore — Day Pass, Summit Pass or Full Season Pass.",
};

export default function RegisterPage() {
  return (
    <>
      <header className="border-b border-border">
        <div className="section-pad container-page flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0 group">
            <span className="font-display font-bold tracking-tight text-sm sm:text-base group-hover:text-accent transition-colors">
              HEADSTART
            </span>
            <span className="hidden sm:block h-4 w-px bg-border-strong" aria-hidden />
            <span className="font-mono-meta text-[0.65rem] tracking-[0.14em] text-muted truncate">
              FRONTIER TECH WEEK
            </span>
          </Link>
          <Link href="/" className="btn-ghost !min-h-10">
            <ArrowLeft size={14} aria-hidden />
            Back
          </Link>
        </div>
      </header>

      <main className="relative grain overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(117,254,114,0.12),transparent_45%)]"
          aria-hidden
        />
        <div className="relative z-[2] section-pad container-page py-12 md:py-16">
          <div className="max-w-2xl mb-10 md:mb-12">
            <p className="eyebrow mb-4">Bangalore · Dec 7–12, 2026</p>
            <h1 className="font-display font-extrabold text-[clamp(2.25rem,6vw,4rem)] leading-[0.95] tracking-tight">
              Get your pass.
            </h1>
            <p className="mt-4 text-muted text-lg">
              Takes about two minutes. You&apos;ll get a confirmation email as soon as payment
              goes through.
            </p>
          </div>

          <RegistrationForm />

          <p className="mt-16 text-xs text-dim">
            Need help or registering a group? Write to{" "}
            <a href={`mailto:${contactEmail}`} className="text-muted hover:text-accent">
              {contactEmail}
            </a>
            .
          </p>
        </div>
      </main>
    </>
  );
}
