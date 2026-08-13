import Link from "next/link";
import type { BlogPost } from "@prisma/client";
import { formatDate } from "@/lib/date";

export function PostRow({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 px-6 py-5 transition-colors hover:bg-muted"
    >
      <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.54px] text-muted-foreground">
        {formatDate(post.createdAt)}
      </span>
      <span className="flex-1 truncate text-base font-semibold text-ink">
        {post.title}
      </span>
      {post.tags.length > 0 && (
        <span className="text-xs text-muted-foreground">
          {post.tags.map((tag) => `#${tag}`).join(" ")}
        </span>
      )}
    </Link>
  );
}