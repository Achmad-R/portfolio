import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { storagePublicUrl } from "@/lib/supabase";
import { formatDate } from "@/lib/date";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
    >
      {project.coverImageUrl ? (
        <div className="relative aspect-video overflow-hidden border-b">
          <Image
            src={storagePublicUrl(project.coverImageUrl)}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b bg-gradient-to-br from-primary/15 via-accent to-accent">
          <span className="font-mono text-xs uppercase tracking-widest text-primary/70">
            {project.title}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <span>{formatDate(project.createdAt)}</span>
          {project.featured && <Badge className="font-mono text-[10px]">Featured</Badge>}
        </div>
        <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.shortDescription}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="outline" className="font-mono text-[10px]">
              {tech}
            </Badge>
          ))}
        </div>
        <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary">
          View project
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}