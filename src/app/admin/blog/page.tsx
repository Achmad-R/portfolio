import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deletePost } from "@/lib/actions";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Blog — Admin",
};

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-primary">$</span> blog
        </h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" /> Post baru
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">Belum ada post.</p>
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {post.tags.map((tag) => `#${tag}`).join(" ")}
                  </TableCell>
                  <TableCell>
                    {post.published ? (
                      <Badge variant="outline" className="font-mono text-[10px] text-primary">
                        published
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="font-mono text-[10px]">
                        draft
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="size-4" /> Edit
                      </Link>
                      <ConfirmDelete action={deletePost} entityId={post.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
