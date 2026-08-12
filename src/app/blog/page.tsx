import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { POSTS_PER_PAGE } from "@/lib/site";
import { Pagination } from "@/components/pagination";
import { PromptLine } from "@/components/prompt-line";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about web development, tools, and things I'm learning.",
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

function lsDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    }),
    prisma.blogPost.count({ where: { published: true } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <PromptLine command="ls ~/blog" />
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts published yet.</p>
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
                {post.tags.length > 0 && (
                  <span className="font-mono text-[10px] text-link">
                    {post.tags.map((tag) => `#${tag}`).join(" ")}
                  </span>
                )}
              </Link>
            ))}
          </div>
          <Pagination basePath="/blog" currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}