import Link from "next/link";
import type { BlogPost } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/date";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-2 rounded-lg border bg-card p-5 transition-colors hover:border-primary/50"
    >
      <div className="font-mono text-xs text-muted-foreground">
        {formatDate(post.createdAt)}
      </div>
      <h3 className="font-heading text-lg font-semibold leading-snug group-hover:text-primary">
        {post.title}
      </h3>
      <p className="text-sm text-muted-foreground">{post.excerpt}</p>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="font-mono text-[10px]">
            #{tag}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
