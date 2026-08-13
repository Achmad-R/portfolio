import Link from "next/link";
import { Rss, Mail } from "lucide-react";
import { GithubIcon } from "@/components/github-icon";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name} — {site.tagline}
        </p>
        <div className="flex items-center gap-4">
          <Link href="/feed.xml" className="hover:text-foreground" aria-label="RSS feed">
            <Rss className="size-4" />
          </Link>
          <a
            href="https://github.com/Achmad-R"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
            aria-label="GitHub"
          >
            <GithubIcon className="size-4" />
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-foreground" aria-label="Email">
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}