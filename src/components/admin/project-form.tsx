"use client";

import { useState } from "react";
import type { Project } from "@prisma/client";
import { createProject, updateProject } from "@/lib/actions";
import { generateSlug } from "@/lib/slugify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "@/components/admin/image-upload";
import { MarkdownEditor } from "@/components/admin/markdown-editor";

type ProjectInput = {
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  liveUrl: string;
  repoUrl: string;
  coverImageUrl: string;
  techStack: string;
  featured: boolean;
  published: boolean;
};

type ProjectFormProps = {
  mode: "create" | "edit";
  project?: Project;
};

function toForm(project?: Project): ProjectInput {
  return {
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    shortDescription: project?.shortDescription ?? "",
    content: project?.content ?? "",
    liveUrl: project?.liveUrl ?? "",
    repoUrl: project?.repoUrl ?? "",
    coverImageUrl: project?.coverImageUrl ?? "",
    techStack: project?.techStack.join(", ") ?? "",
    featured: project?.featured ?? false,
    published: project?.published ?? false,
  };
}

export function ProjectForm({ mode, project }: ProjectFormProps) {
  const [form, setForm] = useState<ProjectInput>(() => toForm(project));
  const [slugTouched, setSlugTouched] = useState(Boolean(project?.slug));
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) =>
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
      techStack: form.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const result =
      mode === "create"
        ? await createProject(payload)
        : await updateProject(project!.id, payload);

    if (result?.error) {
      setError(result.error);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
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
        <p className="text-xs text-muted-foreground">
          Auto-generate dari title. Atur manual lalu edit sesuai kebutuhan.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="shortDescription">Short description</Label>
        <Textarea
          id="shortDescription"
          rows={2}
          value={form.shortDescription}
          onChange={(e) => set("shortDescription", e.target.value)}
          required
        />
      </div>

      <MarkdownEditor
        value={form.content}
        onChange={(v) => set("content", v)}
        label="Content (markdown)"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="liveUrl">Live URL (opsional)</Label>
          <Input
            id="liveUrl"
            type="url"
            placeholder="https://..."
            value={form.liveUrl}
            onChange={(e) => set("liveUrl", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="repoUrl">Repo URL (opsional)</Label>
          <Input
            id="repoUrl"
            type="url"
            placeholder="https://github.com/..."
            value={form.repoUrl}
            onChange={(e) => set("repoUrl", e.target.value)}
          />
        </div>
      </div>

      <ImageUpload
        value={form.coverImageUrl}
        onChange={(v) => set("coverImageUrl", v)}
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="techStack">Tech stack (pisahkan dengan koma)</Label>
        <Input
          id="techStack"
          value={form.techStack}
          onChange={(e) => set("techStack", e.target.value)}
          placeholder="Next.js, TypeScript, Supabase"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={form.featured}
            onCheckedChange={(v) => set("featured", Boolean(v))}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={form.published}
            onCheckedChange={(v) => set("published", Boolean(v))}
          />
          Published
        </label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Menyimpan..." : mode === "create" ? "Buat project" : "Simpan perubahan"}
        </Button>
      </div>
    </form>
  );
}
