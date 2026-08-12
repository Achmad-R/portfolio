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
    <div className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-16">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">about</h1>
        <div className="font-mono text-xs text-muted-foreground">
          <span className="text-primary">NAME</span>
          <span className="text-muted-foreground">(1)</span> — {site.name}, {site.tagline}.
          Building fast, maintainable web applications from Jakarta — clean architecture,
          sensible tooling, interfaces that feel right.
        </div>
        <p className="text-muted-foreground">
          When I&apos;m not shipping code, I&apos;m writing about what I learn on this
          blog, or contributing to open source.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-lg font-semibold">
          <span className="text-primary">STACK</span>
          <span className="text-muted-foreground">(2)</span>
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
          <span className="text-primary">HISTORY</span>
          <span className="text-muted-foreground">(3)</span>
        </h2>
        <div className="flex flex-col gap-6">
          {history.map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="font-mono text-xs text-primary">{item.year}</div>
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