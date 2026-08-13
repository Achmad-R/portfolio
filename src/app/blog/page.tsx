import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { POSTS_PER_PAGE } from "@/lib/site";
import { Pagination } from "@/components/pagination";
import { PostRow } from "@/components/post-row";

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
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-16 sm:py-24">
      <div className="flex max-w-2xl flex-col gap-3">
        <h1 className="text-5xl font-[340] leading-[1.1] tracking-[-0.96px] text-ink sm:text-6xl">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground">
          Writing about web development, tools, and things I&apos;m learning.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts published yet.</p>
      ) : (
        <>
          <div className="flex flex-col divide-y divide-border overflow-hidden rounded-[24px] border border-border bg-background">
            {posts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </div>
          <Pagination basePath="/blog" currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}