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

const journey = [
  {
    period: "2026",
    title: "Portfolio with custom CMS",
    text: "Built this site end-to-end: Next.js frontend, Supabase backend, custom admin panel for content.",
  },
  {
    period: "2025",
    title: "Realtime applications",
    text: "Explored WebSockets and realtime architectures, shipping a chat application with presence.",
  },
  {
    period: "2024",
    title: "Started fullstack journey",
    text: "Fell in love with the full stack — from REST APIs and databases to polished user interfaces.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-16">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-primary">$</span> cat about.txt
        </h1>
        <p className="text-muted-foreground">
          Hi, I&apos;m {site.name} — {site.tagline}. I build fast, maintainable web
          applications, and I care about the details: clean architecture, sensible
          tooling, and interfaces that feel right.
        </p>
        <p className="text-muted-foreground">
          When I&apos;m not shipping code, I&apos;m writing about what I learn on this
          blog, or contributing to open source.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-lg font-semibold">
          <span className="text-primary">#</span> stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="outline" className="font-mono text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-lg font-semibold">
          <span className="text-primary">#</span> timeline
        </h2>
        <div className="flex flex-col gap-6">
          {journey.map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="font-mono text-xs text-primary">{item.period}</div>
              <div className="flex flex-col gap-1">
                <h3 className="font-heading text-sm font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
