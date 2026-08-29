import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";
import {
  FeaturedProjectCard,
  ProjectCard,
} from "@/components/project-card";
import { PostRow } from "@/components/post-row";

function EmptyFeaturedStage() {
  return (
    <div className="relative isolate overflow-hidden rounded-[24px] border border-block-fg/15 bg-block-lilac p-6 text-block-fg sm:p-8">
      <div
        className="absolute inset-y-0 left-1/3 w-px bg-block-fg/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-2/3 w-px bg-block-fg/10"
        aria-hidden="true"
      />
      <div className="relative flex min-h-[22rem] flex-col justify-between gap-10">
        <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.12em]">
          <span>Case study slot</span>
          <span>Open</span>
        </div>
        <div className="max-w-sm">
          <h3 className="max-w-[16ch] text-3xl font-[540] leading-tight tracking-[-0.03em]">
            A place for verified work.
          </h3>
          <p className="mt-4 max-w-[38ch] text-base leading-relaxed text-block-fg/75">
            The first case study will live here when its story and evidence are
            ready to share.
          </p>
        </div>
        <div className="flex items-end justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-block-fg/70">
            Add through the CMS
          </span>
          <ArrowUpRight className="size-6" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

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

  const featuredProject = projects[0] ?? null;
  const supportingProjects = projects.slice(1);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-16 sm:py-20">
      <section
        aria-labelledby="intro-heading"
        className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end"
      >
        <div className="flex flex-col gap-8">
          <h1
            id="intro-heading"
            className="max-w-[8ch] text-6xl font-[340] leading-[1.02] tracking-[-0.055em] text-ink sm:text-7xl lg:text-[80px]"
          >
            {site.name}.
          </h1>
          <div className="flex flex-col gap-4">
            <p className="max-w-xl text-xl font-[430] leading-[1.3] tracking-[-0.02em] text-ink sm:text-2xl">
              End-to-end product builder for dependable web applications.
            </p>
            <p className="max-w-lg text-base leading-[1.55] text-muted-foreground sm:text-lg">
              I work across interface, backend, data, and deployment to turn a
              clear problem into a product people can use.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#featured-work"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              See the work <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-input bg-background px-6 text-sm font-bold text-ink transition-colors hover:bg-muted"
            >
              Start a conversation
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-ink">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-live" aria-hidden="true" />
              Available
            </span>
            <span aria-hidden="true" className="text-muted-foreground">
              ·
            </span>
            <span>Jakarta, Indonesia</span>
            <span aria-hidden="true" className="text-muted-foreground">
              ·
            </span>
            <span>Full-time and freelance</span>
          </div>
        </div>

        <div id="featured-work" className="flex min-w-0 flex-col gap-4">
          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-[26px] font-[540] leading-[1.2] tracking-[-0.02em] text-ink">
                Featured work
              </h2>
              <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
                {featuredProject
                  ? "One project, examined end to end."
                  : "A place for the first verified case study."}
              </p>
            </div>
            {featuredProject && (
              <Link
                href="/projects"
                className="group inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-semibold text-ink hover:underline"
              >
                View all
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
          {featuredProject ? (
            <FeaturedProjectCard project={featuredProject} />
          ) : (
            <EmptyFeaturedStage />
          )}
        </div>
      </section>

      {supportingProjects.length > 0 && (
        <section aria-labelledby="more-work-heading" className="flex flex-col gap-8">
          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h2
                id="more-work-heading"
                className="text-[26px] font-[540] leading-[1.2] tracking-[-0.02em] text-ink"
              >
                More work
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Other projects worth a closer look.
              </p>
            </div>
            <Link
              href="/projects"
              className="group inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-ink hover:underline"
            >
              Browse projects
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {supportingProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section aria-labelledby="latest-posts-heading" className="flex flex-col gap-8">
          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h2
                id="latest-posts-heading"
                className="text-[26px] font-[540] leading-[1.2] tracking-[-0.02em] text-ink"
              >
                Latest writing
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Notes from the build process.
              </p>
            </div>
            <Link
              href="/blog"
              className="group inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-ink hover:underline"
            >
              Read all
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-border overflow-hidden rounded-[24px] border border-border bg-background">
            {posts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      <section
        aria-labelledby="contact-heading"
        className="flex flex-col items-start justify-between gap-8 rounded-[24px] bg-block-coral p-8 text-block-fg sm:flex-row sm:items-center sm:p-12"
      >
        <div className="flex flex-col gap-3">
          <h2
            id="contact-heading"
            className="max-w-[18ch] text-[26px] font-[540] leading-[1.2] tracking-[-0.02em]"
          >
            Have a project in mind?
          </h2>
          <p className="max-w-xl text-base leading-[1.5]">
            I&apos;m currently available for freelance and full-time opportunities.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-block-fg px-6 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          Start a conversation <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
