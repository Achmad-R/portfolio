import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of projects I've built.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:py-24">
      <div className="flex max-w-2xl flex-col gap-3">
        <h1 className="text-5xl font-[340] leading-[1.1] tracking-[-0.96px] text-ink sm:text-6xl">
          Projects
        </h1>
        <p className="text-lg text-muted-foreground">
          A selection of things I&apos;ve built — from fullstack applications to APIs and
          tooling.
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects published yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}