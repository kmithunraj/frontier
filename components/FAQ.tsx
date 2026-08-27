"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered."
          className="mb-12"
        />

        <div className="max-w-3xl mx-auto divide-y divide-border border-y border-border">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;

            return (
              <Reveal key={faq.question} delay={i * 0.02}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 sm:py-6 text-left min-h-11 group"
                  >
                    <span className="font-display text-base sm:text-lg font-semibold tracking-tight group-hover:text-accent transition-colors pr-2">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={cn(
                        "shrink-0 text-dim transition-transform duration-250",
                        isOpen && "rotate-180 text-accent"
                      )}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={cn(!isOpen && "hidden")}
                >
                  <p className="pb-6 text-sm sm:text-base text-muted leading-relaxed max-w-2xl">
                    {faq.answer}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
