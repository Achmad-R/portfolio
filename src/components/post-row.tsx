import Link from "next/link";
import type { BlogPost } from "@prisma/client";
import { formatDate } from "@/lib/date";

export function PostRow({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-3 px-5 py-5 transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[6rem_minmax(0,1fr)_auto] sm:items-center sm:gap-5"
    >
      <time
        dateTime={post.createdAt.toISOString()}
        className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
      >
        {formatDate(post.createdAt)}
      </time>
      <span className="min-w-0 text-base font-semibold leading-snug text-ink">
        {post.title}
      </span>
      {post.tags.length > 0 && (
        <span className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </span>
      )}
    </Link>
  );
}
