import type { Metadata } from "next";
import { PostForm } from "@/components/admin/post-form";

export const metadata: Metadata = {
  title: "Post Baru — Admin",
};

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-[-1.2px] text-ink">Post baru</h1>
      <PostForm mode="create" />
    </div>
  );
}
