import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { GithubIcon } from "@/components/github-icon";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";
import { storagePublicUrl } from "@/lib/supabase";
import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/date";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project || !project.published) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      url: `${site.url}/projects/${project.slug}`,
      images: project.coverImageUrl
        ? [{ url: storagePublicUrl(project.coverImageUrl) }]
        : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project || !project.published) {
    notFound();
  }

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-16">
      <Link
        href="/projects"
        className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> All projects
      </Link>

      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{formatDate(project.createdAt)}</span>
          {project.featured && <Badge>Featured</Badge>}
        </div>
        <h1 className="text-[44px] font-bold tracking-[-0.8px] text-ink sm:text-5xl">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground transition-colors hover:bg-[#cc001f]"
            >
              <ExternalLink className="size-4" /> Live demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-input bg-background px-5 text-sm font-bold text-ink transition-colors hover:bg-surface-card"
            >
              <GithubIcon className="size-4" /> Source code
            </a>
          )}
        </div>
      </header>

      {project.coverImageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-md bg-surface-card">
          <Image
            src={storagePublicUrl(project.coverImageUrl)}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <Markdown content={project.content} />
    </article>
  );
}
