import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";
import { ProjectCard } from "@/components/project-card";
import { PostRow } from "@/components/post-row";

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

const timeline = [
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

export default async function HomePage() {
  const [projects, posts] = await Promise.all([
    prisma.project.findMany({
      where: { published: true, featured: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-16 sm:py-24">
      <section className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-7 animate-in fade-in duration-500">
          <p className="font-mono text-xs uppercase tracking-[0.54px] text-muted-foreground">
            Fullstack developer · Jakarta, ID
          </p>
          <h1 className="text-6xl font-[340] leading-[1.05] tracking-[-1.72px] text-ink sm:text-7xl lg:text-[80px]">
            {site.name}
            <span className="text-ink">.</span>
          </h1>
          <p className="max-w-xl text-lg font-[330] leading-[1.45] text-ink sm:text-xl">
            I build fast, maintainable web applications — clean architecture,
            sensible tooling, and interfaces that feel right.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              View projects <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-input bg-background px-6 text-sm font-bold text-ink transition-colors hover:bg-muted"
            >
              Contact
            </Link>
          </div>
        </div>

        <aside className="flex flex-col gap-6 rounded-[24px] border border-border bg-background p-8 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-150">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-ink">Now</span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="size-2 rounded-full bg-live" aria-hidden="true" />
              Available
            </span>
          </div>
          <ul className="flex flex-col gap-4 text-base leading-[1.45] text-ink">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-ink" aria-hidden="true" />
              Based in Jakarta — remote-friendly, open to full-time roles and
              freelance projects.
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-1 size-4 shrink-0 text-ink" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="text-ink hover:underline">
                {site.email}
              </a>
            </li>
          </ul>
          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-base font-semibold text-ink hover:underline"
          >
            More about me <ArrowUpRight className="size-4" />
          </Link>
        </aside>
      </section>

      {projects.length > 0 && (
        <section className="flex flex-col gap-8">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-[26px] font-[540] leading-[1.35] tracking-[-0.26px] text-ink">
                Featured projects
              </h2>
              <p className="text-base text-muted-foreground">
                A selection of things I&apos;ve built recently.
              </p>
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1 text-base font-semibold text-ink hover:underline"
            >
              View all
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-6 rounded-[24px] bg-block-lime p-12 text-ink">
        <h2 className="text-[26px] font-[540] leading-[1.35] tracking-[-0.26px]">
          Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-sm bg-background px-3 py-1.5 text-sm font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {posts.length > 0 && (
        <section className="flex flex-col gap-8">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-[26px] font-[540] leading-[1.35] tracking-[-0.26px] text-ink">
                Latest posts
              </h2>
              <p className="text-base text-muted-foreground">
                Notes on web development and tools.
              </p>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1 text-base font-semibold text-ink hover:underline"
            >
              Read all
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-border overflow-hidden rounded-[24px] border border-border bg-background">
            {posts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-8 rounded-[24px] bg-block-navy p-12 text-inverse-ink">
        <h2 className="text-[26px] font-[540] leading-[1.35] tracking-[-0.26px]">
          Timeline
        </h2>
        <div className="flex flex-col gap-8">
          {timeline.map((item) => (
            <div
              key={item.title}
              className="grid gap-2 sm:grid-cols-[100px_1fr] sm:gap-6"
            >
              <div className="font-mono text-xs uppercase tracking-[0.54px] opacity-80">
                {item.year}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed opacity-80">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start justify-between gap-8 rounded-[24px] bg-block-coral p-12 text-ink sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-[26px] font-[540] leading-[1.35] tracking-[-0.26px]">
            Have a project in mind?
          </h2>
          <p className="text-base leading-[1.45]">
            I&apos;m currently available for freelance and full-time opportunities.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-ink px-6 text-sm font-bold text-background transition-opacity hover:opacity-90"
        >
          Start a conversation <ArrowUpRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}