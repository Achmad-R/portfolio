import Link from "next/link";
import Image from "next/image";
import type { Project } from "@prisma/client";
import { storagePublicUrl } from "@/lib/supabase";
import { formatDate } from "@/lib/date";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-3 rounded-md bg-surface-soft p-4 transition-colors hover:bg-accent"
    >
      {project.coverImageUrl ? (
        <div className="relative aspect-video overflow-hidden rounded-md">
          <Image
            src={storagePublicUrl(project.coverImageUrl)}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          {project.featured && (
            <span className="absolute left-2.5 top-2.5 rounded-sm bg-ink px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-background">
              Featured
            </span>
          )}
        </div>
      ) : (
        <div className="relative flex aspect-video w-full items-center justify-center rounded-md bg-accent">
          <span className="px-6 text-center text-base font-semibold text-ink">
            {project.title}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.54px] text-muted-foreground">
          {formatDate(project.createdAt)}
        </span>
        <h3 className="text-lg font-semibold leading-snug text-ink">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {project.shortDescription}
        </p>
        {project.techStack.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-sm bg-muted px-2 py-0.5 text-xs font-semibold text-ink"
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