import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostForm } from "@/components/admin/post-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Post — Admin",
};

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-[-1.2px] text-ink">Edit post</h1>
      <PostForm mode="edit" post={post} />
    </div>
  );
}
