import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@prisma/client";
import { storagePublicUrl } from "@/lib/supabase";
import { formatDate } from "@/lib/date";

function CoverPlaceholder({ featured = false }: { featured?: boolean }) {
  if (featured) {
    return (
      <div className="relative flex min-h-[18rem] flex-1 overflow-hidden bg-block-lilac text-block-fg sm:min-h-[20rem]">
        <div
          className="absolute inset-y-0 left-1/3 w-px bg-block-fg/10"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 left-2/3 w-px bg-block-fg/10"
          aria-hidden="true"
        />
        <div className="relative flex w-full flex-col justify-between gap-8 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.12em]">
            <span>Cover not supplied</span>
            <span>Visual pending</span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <span className="text-5xl font-[340] leading-none tracking-[-0.06em] sm:text-7xl">
              WORK
            </span>
            <span className="max-w-[12ch] text-right text-sm leading-relaxed text-block-fg/70">
              The project story starts below.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex aspect-video items-end overflow-hidden rounded-[12px] bg-surface-soft p-4">
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        Cover not supplied
      </span>
    </div>
  );
}

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`Open case study: ${project.title}`}
      className="group flex min-h-[34rem] flex-col overflow-hidden rounded-[24px] border border-border bg-background transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {project.coverImageUrl ? (
        <div className="relative min-h-[18rem] flex-1 overflow-hidden bg-surface-soft sm:min-h-[20rem]">
          <Image
            src={storagePublicUrl(project.coverImageUrl)}
            alt=""
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <CoverPlaceholder featured />
      )}
      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Added {formatDate(project.createdAt)}
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-3xl">
              {project.title}
            </h3>
          </div>
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-soft text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </span>
        </div>
        <p className="max-w-[58ch] text-base leading-[1.55] text-muted-foreground sm:text-lg">
          {project.shortDescription}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-sm bg-muted px-2.5 py-1 text-xs font-semibold text-ink"
              >
                {tech}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
            Open case study
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`Open project: ${project.title}`}
      className="group flex h-full flex-col gap-4 rounded-[20px] border border-border bg-background p-4 transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {project.coverImageUrl ? (
        <div className="relative aspect-video overflow-hidden rounded-[12px] bg-surface-soft">
          <Image
            src={storagePublicUrl(project.coverImageUrl)}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <CoverPlaceholder />
      )}

      <div className="flex flex-1 flex-col gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Added {formatDate(project.createdAt)}
        </p>
        <h3 className="text-xl font-semibold leading-snug tracking-[-0.02em] text-ink">
          {project.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.shortDescription}
        </p>
        {project.techStack.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-sm bg-muted px-2.5 py-1 text-xs font-semibold text-ink"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
