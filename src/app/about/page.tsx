import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — ${site.tagline}.`,
};

const skills = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Prisma",
  "Tailwind CSS",
  "Docker",
  "Git",
];

const history = [
  {
    year: "2026",
    title: "Portfolio with custom CMS",
    text: "Built this site end-to-end: Next.js frontend, Supabase backend, custom admin panel for content.",
  },
  {
    year: "2025",
    title: "Realtime applications",
    text: "Explored WebSockets and realtime architectures, shipping a chat application with presence.",
  },
  {
    year: "2024",
    title: "Started fullstack journey",
    text: "Fell in love with the full stack — from REST APIs and databases to polished user interfaces.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-14 px-4 py-16 sm:py-24">
      <section className="flex flex-col gap-4">
        <h1 className="text-5xl font-[340] leading-[1.1] tracking-[-0.96px] text-ink sm:text-6xl">
          About
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Hi, I&apos;m {site.name} — {site.tagline}. I build fast, maintainable web
          applications, and I care about the details: clean architecture, sensible
          tooling, and interfaces that feel right.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          When I&apos;m not shipping code, I&apos;m writing about what I learn on this
          blog, or contributing to open source.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[26px] font-[540] leading-[1.35] tracking-[-0.26px] text-ink">
          Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[26px] font-[540] leading-[1.35] tracking-[-0.26px] text-ink">
          Timeline
        </h2>
        <div className="flex flex-col gap-8">
          {history.map((item) => (
            <div key={item.title} className="grid gap-2 sm:grid-cols-[100px_1fr] sm:gap-6">
              <div className="font-mono text-xs uppercase tracking-[0.54px] text-muted-foreground">
                {item.year}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}