import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { POSTS_PER_PAGE } from "@/lib/site";
import { PostCard } from "@/components/post-card";
import { Pagination } from "@/components/pagination";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about web development, tools, and things I'm learning.",
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
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
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="text-primary">$</span> ls ./blog
      </h1>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts published yet.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination
            basePath="/blog"
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}
