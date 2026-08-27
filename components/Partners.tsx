import { event, partnerCategories } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function Partners() {
  return (
    <section
      id="partners"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <SectionHeading
            eyebrow="Partners"
            title="Built with the ecosystem."
            description="Partner logos will appear here as organisations join. No invented marks — placeholders until confirmed."
          />
          <a href={event.partnerUrl} className="btn-primary self-start">
            Become a Partner
          </a>
        </div>

        <div className="space-y-12">
          {partnerCategories.map((category, ci) => (
            <Reveal key={category.id} delay={ci * 0.05}>
              <p className="font-mono-meta text-[0.65rem] tracking-[0.18em] uppercase text-dim mb-4">
                {category.label}
              </p>
              <ul
                className={
                  category.id === "title"
                    ? "grid grid-cols-1 max-w-md gap-3"
                    : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                }
              >
                {Array.from({ length: category.slots }).map((_, i) => (
                  <li
                    key={`${category.id}-${i}`}
                    className="border border-border bg-elevated/30 aspect-[2.4/1] flex items-center justify-center grayscale opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <span className="font-mono-meta text-[0.6rem] tracking-[0.16em] uppercase text-dim">
                      Logo TBA
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
