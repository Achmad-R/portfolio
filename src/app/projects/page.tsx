import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PromptLine } from "@/components/prompt-line";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of projects I've built.",
};

function lsDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <PromptLine command="ls -la ~/projects" />
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects published yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-card">
          <div className="hidden gap-4 border-b px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground md:flex">
            <span className="w-10">perm</span>
            <span className="w-24">date</span>
            <span className="flex-1">stack</span>
            <span>name</span>
          </div>
          <div className="flex flex-col divide-y">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-3 transition-colors hover:bg-accent"
              >
                <span className="font-mono text-xs">
                  <span className="text-live">{project.featured ? "drwx" : "r--r"}</span>
                  <span className="text-muted-foreground">----</span>
                </span>
                <span className="w-24 font-mono text-xs text-muted-foreground">
                  {lsDate(project.createdAt)}
                </span>
                <span className="hidden flex-1 truncate font-mono text-xs text-muted-foreground md:block">
                  {project.techStack.join(" ")}
                </span>
                <span className="text-sm font-medium group-hover:text-primary">
                  {project.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}