import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const connectLinks = [
  { href: "https://github.com/Achmad-R", label: "GitHub", external: true },
  { href: "/feed.xml", label: "RSS Feed", external: false },
];

function FooterLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external: boolean;
}) {
  const cls =
    "group inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm text-inverse-ink transition-colors hover:bg-inverse-ink/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverse-ink";
  if (external) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto") ? undefined : "_blank"}
        rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
        aria-label={
          href.startsWith("mailto") ? undefined : `${label} (opens in a new tab)`
        }
        className={cls}
      >
        {label}
        <ArrowUpRight
          className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-inverse-ink/15 bg-inverse-canvas text-inverse-ink">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20">
        <h2 className="sr-only">Site footer</h2>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:gap-16">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <p className="text-5xl font-[340] leading-[0.95] tracking-[-0.04em] sm:text-6xl">
                {site.name}
              </p>
              <p className="mt-4 text-base sm:text-lg">
                {site.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="size-2 rounded-full bg-live" aria-hidden="true" />
              <span>Available for full-time and freelance work</span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 lg:items-end">
            <p className="max-w-sm text-2xl font-[540] leading-tight tracking-[-0.025em] lg:text-right">
              For projects, roles, and technical conversations.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex min-h-11 items-center gap-2 text-base font-semibold text-inverse-ink underline decoration-inverse-ink underline-offset-4 transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverse-ink focus-visible:ring-offset-4 focus-visible:ring-offset-inverse-canvas"
            >
              {site.email}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-inverse-ink/15 pt-8 sm:grid-cols-2">
          <nav aria-label="Footer navigation" className="flex flex-col gap-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-inverse-ink">
              Navigate
            </h3>
            <div className="flex flex-wrap gap-1">
              {exploreLinks.map((link) => (
                <FooterLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  external={false}
                />
              ))}
            </div>
          </nav>

          <nav aria-label="Elsewhere links" className="flex flex-col gap-3 sm:items-end">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-inverse-ink">
              Elsewhere
            </h3>
            <div className="flex flex-wrap gap-1 sm:justify-end">
              {connectLinks.map((link) => (
                <FooterLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  external={link.external}
                />
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-inverse-ink/15 pt-5 text-xs text-inverse-ink sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>Jakarta, Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
