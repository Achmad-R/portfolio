import Link from "next/link";
import type { BlogPost } from "@prisma/client";
import { formatDate } from "@/lib/date";

export function PostRow({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-4 transition-colors hover:bg-accent"
    >
      <span className="w-24 shrink-0 font-mono text-xs text-muted-foreground">
        {formatDate(post.createdAt)}
      </span>
      <span className="flex-1 truncate text-base font-medium transition-colors group-hover:text-primary">
        {post.title}
      </span>
      {post.tags.length > 0 && (
        <span className="font-mono text-[10px] text-muted-foreground">
          {post.tags.map((tag) => `#${tag}`).join(" ")}
        </span>
      )}
    </Link>
  );
}