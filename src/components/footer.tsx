import Link from "next/link";
import { Rss, Mail } from "lucide-react";
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
      <div className="flex flex-col gap-2">{children}</div>
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
  const cls = "text-sm text-muted-foreground transition-colors hover:text-ink";
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
    <footer className="border-t bg-background px-6 py-8">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <FooterColumn title="Explore">
          {exploreLinks.map((l) => (
            <FooterLink key={l.href} href={l.href} label={l.label} external={false} />
          ))}
        </FooterColumn>
        <FooterColumn title="Connect">
          {connectLinks.map((l) => (
            <FooterLink key={l.label} href={l.href} label={l.label} external={l.external} />
          ))}
        </FooterColumn>
        <FooterColumn title="Stack">
          <p className="text-sm text-muted-foreground">Next.js 16</p>
          <p className="text-sm text-muted-foreground">Prisma + Supabase</p>
          <p className="text-sm text-muted-foreground">Tailwind + shadcn/ui</p>
          <p className="text-sm text-muted-foreground">Deployed on Vercel</p>
        </FooterColumn>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-ink">{site.name}</h3>
          <p className="text-sm text-muted-foreground">
            {site.tagline} building practical, end-to-end software.
          </p>
          <div className="mt-1 flex items-center gap-3">
            <Link
              href="/feed.xml"
              className="text-muted-foreground transition-colors hover:text-ink"
              aria-label="RSS feed"
            >
              <Rss className="size-4" />
            </Link>
            <a
              href="https://github.com/Achmad-R"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-ink"
              aria-label="GitHub"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-muted-foreground transition-colors hover:text-ink"
              aria-label="Email"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl items-center justify-between border-t pt-4 text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>{site.tagline}</p>
      </div>
    </footer>
  );
}