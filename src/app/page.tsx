import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";
import { TypingCommand } from "@/components/typing-command";
import { PromptLine } from "@/components/prompt-line";

function lsDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

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
        <TypingCommand prefix="~/achmad-ridho" command="whoami" />
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
            Browse projects <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/50 hover:text-primary"
          >
            Contact
          </Link>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <PromptLine command="ls feature/" />
            <Link
              href="/projects"
              className="font-mono text-xs text-muted-foreground hover:text-primary"
            >
              cd ../projects →
            </Link>
          </div>
          <div className="flex flex-col divide-y rounded-lg border bg-card">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-3 transition-colors hover:bg-accent"
              >
                <span className="font-mono text-xs text-primary">
                  {project.featured ? "✦" : "–"}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {lsDate(project.createdAt)}
                </span>
                <span className="hidden flex-1 truncate font-mono text-xs text-muted-foreground sm:block">
                  {project.techStack.slice(0, 4).join(" ")}
                </span>
                <span className="text-sm font-medium group-hover:text-primary">
                  {project.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <PromptLine command="tail -n 3 ~/blog" />
            <Link
              href="/blog"
              className="font-mono text-xs text-muted-foreground hover:text-primary"
            >
              cd ../blog →
            </Link>
          </div>
          <div className="flex flex-col divide-y rounded-lg border bg-card">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-3 transition-colors hover:bg-accent"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  [{lsDate(post.createdAt)}]
                </span>
                <span className="flex-1 truncate text-sm font-medium group-hover:text-primary">
                  {post.title}
                </span>
                {post.tags.length > 0 && (
                  <span className="font-mono text-[10px] text-link">
                    #{post.tags[0]}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}