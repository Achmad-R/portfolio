import type { Metadata } from "next";
import { PostForm } from "@/components/admin/post-form";

export const metadata: Metadata = {
  title: "Post Baru — Admin",
};

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold tracking-tight">
        <span className="text-primary">$</span> blog/new
      </h1>
      <PostForm mode="create" />
    </div>
  );
}
