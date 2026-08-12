"use client";

import { useState } from "react";
import type { BlogPost } from "@prisma/client";
import { createPost, updatePost } from "@/lib/actions";
import { generateSlug } from "@/lib/slugify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "@/components/admin/image-upload";
import { MarkdownEditor } from "@/components/admin/markdown-editor";

type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  tags: string;
  published: boolean;
};

type PostFormProps = {
  mode: "create" | "edit";
  post?: BlogPost;
};

function toForm(post?: BlogPost): PostInput {
  return {
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    coverImageUrl: post?.coverImageUrl ?? "",
    tags: post?.tags.join(", ") ?? "",
    published: post?.published ?? false,
  };
}

export function PostForm({ mode, post }: PostFormProps) {
  const [form, setForm] = useState<PostInput>(() => toForm(post));
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof PostInput>(key: K, value: PostInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function handleTitleChange(value: string) {
    set("title", value);
    if (!slugTouched) {
      set("slug", generateSlug(value));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const result =
      mode === "create" ? await createPost(payload) : await updatePost(post!.id, payload);

    if (result?.error) {
      setError(result.error);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Judul</Label>
        <Input
          id="title"
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={form.slug}
          onChange={(e) => {
            setSlugTouched(true);
            set("slug", e.target.value);
          }}
          className="font-mono"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="excerpt">Ringkasan</Label>
        <Textarea
          id="excerpt"
          rows={2}
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          required
        />
      </div>

      <MarkdownEditor
        value={form.content}
        onChange={(v) => set("content", v)}
        label="Konten (markdown)"
      />

      <ImageUpload
        value={form.coverImageUrl}
        onChange={(v) => set("coverImageUrl", v)}
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="tags">Tags (pisahkan dengan koma)</Label>
        <Input
          id="tags"
          value={form.tags}
          onChange={(e) => set("tags", e.target.value)}
          placeholder="Next.js, Supabase"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <Checkbox
          checked={form.published}
          onCheckedChange={(v) => set("published", Boolean(v))}
        />
        Terbitkan
      </label>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Menyimpan..." : mode === "create" ? "Buat post" : "Simpan perubahan"}
        </Button>
      </div>
    </form>
  );
}
