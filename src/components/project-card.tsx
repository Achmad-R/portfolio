import Link from "next/link";
import Image from "next/image";
import type { Project } from "@prisma/client";
import { storagePublicUrl } from "@/lib/supabase";
import { formatDate } from "@/lib/date";

const aspects = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]"] as const;

export function ProjectCard({ project }: { project: Project }) {
  const aspect =
    aspects[
      project.slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
        aspects.length
    ];

  const overlay = project.featured ? "Featured" : project.techStack[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group mb-2 flex break-inside-avoid flex-col overflow-hidden rounded-md bg-surface-card transition-colors hover:bg-secondary-bg"
    >
      {project.coverImageUrl ? (
        <div className={`relative w-full overflow-hidden ${aspect}`}>
          <Image
            src={storagePublicUrl(project.coverImageUrl)}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          {overlay && (
            <span className="absolute left-3 top-3 rounded-full bg-background px-3 py-1.5 text-xs font-bold text-ink">
              {overlay}
            </span>
          )}
        </div>
      ) : (
        <div className={`relative flex w-full items-center justify-center ${aspect} bg-secondary-bg`}>
          <span className="px-6 text-center text-base font-semibold text-ink">
            {project.title}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-base font-semibold leading-snug text-ink">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {project.shortDescription}
        </p>
        <span className="text-xs text-muted-foreground">
          {formatDate(project.createdAt)}
        </span>
      </div>
    </Link>
  );
}