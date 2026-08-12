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
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="text-primary">$</span> ls ./projects
      </h1>
      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects published yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
