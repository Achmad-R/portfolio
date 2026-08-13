import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post || !post.published) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${site.url}/blog/${post.slug}`,
      images: post.coverImageUrl
        ? [{ url: storagePublicUrl(post.coverImageUrl) }]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-16">
      <Link
        href="/blog"
        className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> All posts
      </Link>

      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
          <span>{formatDate(post.createdAt)}</span>
          {post.tags.map((tag) => (
            <Link key={tag} href={`/blog/tag/${tag}`}>
              <Badge variant="secondary" className="font-mono text-[10px] hover:text-primary">
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{post.title}</h1>
        <p className="text-lg text-muted-foreground">{post.excerpt}</p>
      </header>

      {post.coverImageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-lg border">
          <Image
            src={storagePublicUrl(post.coverImageUrl)}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <Markdown content={post.content} />
    </article>
  );
}
