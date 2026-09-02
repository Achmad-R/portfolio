import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/date";
import { ArrowRight, Download } from "lucide-react";
import type { BlogPost } from "@prisma/client";
import { storagePublicUrl } from "@/lib/supabase";

function PostCardPlaceholder({
  title = "Cover belum tersedia",
}: {
  title?: string;
}) {
  return (
    <div
      className="relative aspect-[16/10] rounded-[12px] overflow-hidden bg-surface-soft text-block-fg sm:rounded-[16px]"
    >
      <div
        className="absolute inset-y-0 left-1/3 w-px bg-block-fg/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-2/3 w-px bg-block-fg/10"
        aria-hidden="true"
      />
      <div className="relative flex w-full flex-col items-end justify-between gap-4 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.12em]">
          <span>Cover not supplied</span>
          <span>Visual pending</span>
        </div>
        <div>
          <span className="text-sm font-medium tracking-[-0.02em] text-ink">
            {title}
          </span>
          <span className="text-xs text-block-fg/60">
            The story starts below.
          </span>
        </div>
      </div>
    </div>
  );
}

export function PostCard({ post }: { post: BlogPost }) {
  const postHref = `/blog/${post.slug}`;

  return (
    <article className="group flex min-h-[30rem] flex-col overflow-hidden rounded-[20px] border border-border bg-background transition-colors hover:bg-muted">
      {post.coverImageUrl ? (
        <Link
          href={postHref}
          aria-label={`Open blog: ${post.title}`}
          className="relative block min-h-[18rem] flex-1 overflow-hidden bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:min-h-[20rem]"
        >
          <Image
            src={storagePublicUrl(post.coverImageUrl)}
            alt=""
            fill
            unoptimized
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>
      ) : (
        <Link
          href={postHref}
          aria-label={`Open blog: ${post.title}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
          <PostCardPlaceholder title={post.title} />
        </Link>
      )}
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Added {formatDate(post.createdAt)}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-xl">
          <Link
            href={postHref}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {post.excerpt}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-sm bg-muted px-2.5 py-1 text-xs font-semibold text-ink"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center gap-3">
          <Link
            href={postHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            Baca artikel
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          {post.coverImageUrl && (
            <a
              href={storagePublicUrl(post.coverImageUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-input bg-background px-3 text-sm font-bold text-ink transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              download
            >
              <Download className="size-4" aria-hidden="true" />
              Unduh cover
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
