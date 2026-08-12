import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { POSTS_PER_PAGE } from "@/lib/site";
import { Pagination } from "@/components/pagination";
import { PromptLine } from "@/components/prompt-line";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Posts tagged "${tag}"`,
    description: `Blog posts tagged with "${tag}".`,
  };
}

function lsDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export default async function TagPage({ params, searchParams }: PageProps) {
  const { tag } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);
  const decodedTag = decodeURIComponent(tag);

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true, tags: { has: decodedTag } },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    }),
    prisma.blogPost.count({ where: { published: true, tags: { has: decodedTag } } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-16">
      <div className="flex flex-col gap-2">
        <Link
          href="/blog"
          className="font-mono text-xs text-muted-foreground hover:text-link"
        >
          ← all posts
        </Link>
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <Badge variant="secondary" className="font-mono">
            #{decodedTag}
          </Badge>
        </h1>
        <PromptLine command={`grep -r "${decodedTag}" ~/blog`} />
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts with this tag yet.</p>
      ) : (
        <>
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
              </Link>
            ))}
          </div>
          <Pagination
            basePath={`/blog/tag/${tag}`}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}