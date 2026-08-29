import Link from "next/link";
import { Mail, Rss } from "lucide-react";
import { GithubIcon } from "@/components/github-icon";
import { site } from "@/lib/site";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const connectLinks = [
  { href: `mailto:${site.email}`, label: "Email", external: true },
  { href: "https://github.com/Achmad-R", label: "GitHub", external: true },
  { href: "/feed.xml", label: "RSS Feed", external: false },
];

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

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
    "inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  if (external) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto") ? undefined : "_blank"}
        rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
        className={cls}
      >
        {label}
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
    <footer className="border-t bg-background px-4 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[0.75fr_0.75fr_1.5fr]">
        <FooterColumn title="Explore">
          {exploreLinks.map((link) => (
            <FooterLink
              key={link.href}
              href={link.href}
              label={link.label}
              external={false}
            />
          ))}
        </FooterColumn>
        <FooterColumn title="Connect">
          {connectLinks.map((link) => (
            <FooterLink
              key={link.label}
              href={link.href}
              label={link.label}
              external={link.external}
            />
          ))}
        </FooterColumn>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-ink">{site.name}</h3>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
            {site.tagline} building practical, end-to-end software.
          </p>
          <div className="mt-1 flex items-center gap-1">
            <Link
              href="/feed.xml"
              className="inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="RSS feed"
            >
              <Rss className="size-4" />
            </Link>
            <a
              href="https://github.com/Achmad-R"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="GitHub"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Email"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t pt-4 text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>{site.tagline}</p>
      </div>
    </footer>
  );
}
