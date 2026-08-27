import { contactEmail, event, footerLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative section-pad pt-16 pb-10 border-t border-border bg-elevated/40">
      <div className="container-page">
        <div className="grid md:grid-cols-12 gap-10 pb-12 border-b border-border">
          <div className="md:col-span-5">
            <p className="font-display text-xl font-bold tracking-tight">
              HEADSTART
            </p>
            <p className="mt-2 font-mono-meta text-[0.7rem] tracking-[0.16em] uppercase text-muted">
              {event.fullName} {event.year}
            </p>
            <p className="mt-5 text-sm text-muted max-w-sm leading-relaxed">
              {event.subTagline}
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-6 inline-flex min-h-11 items-center font-mono-meta text-[0.7rem] tracking-[0.12em] text-accent hover:underline"
            >
              {contactEmail}
            </a>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono-meta text-[0.65rem] tracking-[0.18em] uppercase text-dim mb-4">
              Explore
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors inline-flex min-h-11 items-center sm:min-h-0 sm:py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono-meta text-[0.65rem] tracking-[0.18em] uppercase text-dim mb-4">
              Social
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-meta text-[0.7rem] tracking-[0.14em] uppercase text-muted hover:text-accent transition-colors inline-flex min-h-11 items-center"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-mono-meta text-[0.65rem] tracking-[0.12em] text-dim">
            © {event.year} Headstart · {event.fullName}
          </p>
          <ul className="flex gap-5">
            {footerLinks.legal.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-mono-meta text-[0.65rem] tracking-[0.12em] uppercase text-dim hover:text-muted"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
