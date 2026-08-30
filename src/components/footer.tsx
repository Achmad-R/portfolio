import type { ComponentType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Images,
  Rss,
} from "lucide-react";
import { GithubIcon } from "@/components/github-icon";
import { site } from "@/lib/site";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const actionLinks = [
  { href: "/projects", label: "View projects", icon: Images, external: false },
  { href: "/blog", label: "Read blog", icon: BookOpen, external: false },
  {
    href: "/feed.xml",
    label: "RSS Feed",
    icon: Rss,
    external: false,
  },
];

function FooterLink({
  href,
  label,
  external,
  icon: Icon,
  variant = "text",
}: {
  href: string;
  label: string;
  external: boolean;
  icon?: ComponentType<{ className?: string }>;
  variant?: "text" | "pill";
}) {
  const cls =
    variant === "pill"
      ? "group inline-flex min-h-11 items-center gap-2 rounded-full border border-block-fg-inverse/20 bg-block-fg-inverse/10 px-4 text-sm font-semibold text-block-fg-inverse transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-block-fg-inverse/40 hover:bg-block-fg-inverse/20 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-block-fg-inverse focus-visible:ring-offset-2 focus-visible:ring-offset-block-navy"
      : "group inline-flex min-h-11 min-w-11 items-center gap-2 text-sm text-block-fg-inverse underline decoration-transparent underline-offset-4 transition-colors hover:decoration-block-fg-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-block-fg-inverse focus-visible:ring-offset-2 focus-visible:ring-offset-block-navy";

  const content = (
    <>
      {Icon ? <Icon className="size-4 shrink-0" /> : null}
      <span>{label}</span>
      {external ? (
        <ArrowUpRight
          className="size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} (opens in a new tab)`}
        className={cls}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-block-fg-inverse/15 bg-block-navy text-block-fg-inverse">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-12 lg:py-14">
        <h2 className="sr-only">Site footer</h2>

        <nav aria-label="Footer quick links" className="flex flex-wrap gap-2">
          {actionLinks.map((link) => (
            <FooterLink
              key={link.label}
              href={link.href}
              label={link.label}
              external={link.external}
              icon={link.icon}
              variant="pill"
            />
          ))}
        </nav>

        <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
          <div className="max-w-sm">
            <p className="text-4xl font-[340] leading-[0.95] tracking-[-0.04em] sm:text-5xl">
              {site.name}
            </p>
            <p className="mt-5 text-base font-[340] leading-7">
              {site.description}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em]">
              Contact info
            </h3>
            <div className="mt-4 flex flex-col items-start gap-1">
              <a
                href={`mailto:${site.email}`}
                className="group flex min-h-11 w-full min-w-0 max-w-full items-center gap-2 text-sm font-[480] underline underline-offset-4 transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-block-fg-inverse focus-visible:ring-offset-2 focus-visible:ring-offset-block-navy"
              >
                <span className="min-w-0 break-all">{site.email}</span>
                <ArrowRight
                  className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <p className="flex min-h-11 items-center text-sm">Jakarta, Indonesia</p>
              <p className="flex min-h-11 items-center gap-2 text-sm font-[480]">
                <span className="size-2 rounded-full bg-live" aria-hidden="true" />
                Available for full-time and freelance work
              </p>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em]">
              Important links
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} label={link.label} external={false} />
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em]">
              Latest writing
            </h3>
            <p className="mt-4 max-w-[28ch] text-sm font-[340] leading-6">
              Notes on web development, tools, and things I&apos;m learning.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-block-fg-inverse/15 pt-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex items-center justify-between gap-6 sm:justify-end">
            <p>Jakarta, Indonesia</p>
            <div className="flex items-center gap-1">
              <a
                href="https://github.com/Achmad-R"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in a new tab)"
                className="inline-flex size-11 items-center justify-center rounded-full bg-block-fg-inverse/10 text-block-fg-inverse transition-colors hover:bg-block-fg-inverse/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-block-fg-inverse focus-visible:ring-offset-2 focus-visible:ring-offset-block-navy"
              >
                <GithubIcon className="size-4" />
              </a>
              <Link
                href="/feed.xml"
                aria-label="RSS Feed"
                className="inline-flex size-11 items-center justify-center rounded-full bg-block-fg-inverse/10 text-block-fg-inverse transition-colors hover:bg-block-fg-inverse/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-block-fg-inverse focus-visible:ring-offset-2 focus-visible:ring-offset-block-navy"
              >
                <Rss className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
