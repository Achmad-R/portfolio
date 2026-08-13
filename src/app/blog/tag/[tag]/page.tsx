import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { POSTS_PER_PAGE } from "@/lib/site";
import { Pagination } from "@/components/pagination";
import { PostRow } from "@/components/post-row";
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
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-16 sm:py-24">
      <div className="flex flex-col gap-3">
        <Link
          href="/blog"
          className="text-xs text-muted-foreground hover:text-ink"
        >
          ← All posts
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-5xl font-[340] leading-[1.1] tracking-[-0.96px] text-ink sm:text-6xl">
            Posts tagged
          </h1>
          <Badge variant="secondary">#{decodedTag}</Badge>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts with this tag yet.</p>
      ) : (
        <>
          <div className="flex flex-col divide-y divide-border overflow-hidden rounded-[24px] border border-border bg-background">
            {posts.map((post) => (
              <PostRow key={post.id} post={post} />
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