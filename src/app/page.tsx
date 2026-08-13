import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";
import { ProjectCard } from "@/components/project-card";
import { PostRow } from "@/components/post-row";

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
    <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-16 sm:py-24">
      <section className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Fullstack developer · Jakarta, ID
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tighter sm:text-6xl lg:text-7xl">
            {site.name}
            <span className="text-primary">.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I build fast, maintainable web applications — clean architecture, sensible
            tooling, and interfaces that feel right.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View projects <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50 hover:text-primary"
            >
              Contact
            </Link>
          </div>
        </div>

        <aside className="flex flex-col gap-6 rounded-xl border bg-card p-6 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-150">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Now
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-xs text-live">
              <span className="size-2 rounded-full bg-live" aria-hidden="true" />
              Available
            </span>
          </div>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3 text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              Based in Jakarta — remote-friendly, open to full-time roles and freelance
              projects.
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="hover:text-primary">
                {site.email}
              </a>
            </li>
          </ul>
          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            More about me <ArrowUpRight className="size-4" />
          </Link>
        </aside>
      </section>

      {projects.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Featured projects
              </h2>
              <p className="text-sm text-muted-foreground">
                A selection of things I&apos;ve built recently.
              </p>
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              View all
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Latest posts
              </h2>
              <p className="text-sm text-muted-foreground">
                Notes on web development and tools.
              </p>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Read all
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="flex flex-col divide-y overflow-hidden rounded-xl border bg-card">
            {posts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col items-start justify-between gap-6 rounded-xl border border-primary/30 bg-primary/5 p-8 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight">Have a project in mind?</h2>
          <p className="text-muted-foreground">
            I&apos;m currently available for freelance and full-time opportunities.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Start a conversation <ArrowUpRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}