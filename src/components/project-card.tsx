import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/github-icon";
import type { Project } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { storagePublicUrl } from "@/lib/supabase";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border bg-card transition-colors hover:border-primary/50"
    >
      {project.coverImageUrl ? (
        <div className="relative aspect-video overflow-hidden border-b">
          <Image
            src={storagePublicUrl(project.coverImageUrl)}
            alt={project.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center border-b bg-muted font-heading text-sm text-muted-foreground">
          {project.title}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-heading text-base font-semibold group-hover:text-primary">
          {project.title}
        </h3>
        <p className="flex-1 text-sm text-muted-foreground">
          {project.shortDescription}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="outline" className="font-mono text-[10px]">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="mt-1 flex gap-4">
          {project.liveUrl && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
              <ExternalLink className="size-3" /> Live
            </span>
          )}
          {project.repoUrl && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
              <GithubIcon className="size-3" /> Source
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
