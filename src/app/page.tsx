import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-16 px-4 py-16">
      <section className="flex flex-col gap-6">
        <div className="font-mono text-sm text-primary">
          <span className="text-muted-foreground">$</span> whoami
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {site.name}
            <span className="text-primary">_</span>
          </h1>
          <p className="text-xl text-muted-foreground">{site.tagline}</p>
        </div>
        <p className="max-w-2xl text-muted-foreground">{site.description}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            View projects <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/50 hover:text-primary"
          >
            Contact me
          </Link>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold">
              <span className="text-primary">#</span> Featured projects
            </h2>
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary">
              all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold">
              <span className="text-primary">#</span> Latest posts
            </h2>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
              all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3 rounded-lg border bg-card p-6">
        <h2 className="font-heading text-lg font-semibold">
          <span className="text-primary">$</span> status
        </h2>
        <p className="text-sm text-muted-foreground">
          Open to full-time roles and freelance projects.{" "}
          <Badge variant="outline" className="ml-1 font-mono text-[10px] text-primary">
            AVAILABLE
          </Badge>
        </p>
      </section>
    </div>
  );
}
