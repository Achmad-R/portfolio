"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidateProject, revalidatePost } from "@/lib/revalidate";
import {
  getAdminStorageClient,
  storageBucket,
  storagePathFromUrl,
} from "@/lib/supabase";

const emptyToNull = (v: unknown) => (typeof v === "string" && v.trim() === "" ? null : v);

const projectSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z
    .string()
    .min(2)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda strip."),
  shortDescription: z.string().min(10).max(500),
  content: z.string().min(10),
  liveUrl: z.preprocess(emptyToNull, z.string().url().nullable().optional()),
  repoUrl: z.preprocess(emptyToNull, z.string().url().nullable().optional()),
  coverImageUrl: z.string().max(500).optional().default(""),
  techStack: z.array(z.string().min(1).max(40)).max(20),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
});

const postSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z
    .string()
    .min(2)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda strip."),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(10),
  coverImageUrl: z.string().max(500).optional().default(""),
  tags: z.array(z.string().min(1).max(40)).max(20),
  published: z.boolean().default(false),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }
}

async function removeCoverImage(url: string) {
  const path = storagePathFromUrl(url);
  if (!path) return;
  try {
    const admin = getAdminStorageClient();
    await admin.storage.from(storageBucket).remove([path]);
  } catch {
    // best-effort: gagal hapus image tidak memblokir operasi utama
  }
}

interface DeleteContentOptions {
  notFound: string;
  find: () => Promise<{ slug: string; coverImageUrl: string | null } | null>;
  remove: () => Promise<unknown>;
  revalidate: (slug: string) => void;
  redirectTo: string;
}

async function deleteContentItem(options: DeleteContentOptions) {
  await requireAdmin();
  const item = await options.find();
  if (!item) {
    return { error: options.notFound };
  }
  await options.remove();
  if (item.coverImageUrl) {
    await removeCoverImage(item.coverImageUrl);
  }
  options.revalidate(item.slug);
  redirect(options.redirectTo);
}

export async function createProject(input: unknown) {
  await requireAdmin();
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Validasi gagal." };
  }

  const existing = await prisma.project.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return { error: "Slug sudah dipakai. Ganti slug atau biarkan auto-generate." };
  }

  const project = await prisma.project.create({ data: parsed.data });
  revalidateProject(project.slug);
  redirect("/admin/projects");
}

export async function updateProject(id: string, input: unknown) {
  await requireAdmin();
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Validasi gagal." };
  }

  const existing = await prisma.project.findUnique({
    where: { id },
    select: { slug: true, coverImageUrl: true },
  });
  if (!existing) {
    return { error: "Project tidak ditemukan." };
  }

  const duplicate = await prisma.project.findFirst({
    where: { slug: parsed.data.slug, NOT: { id } },
    select: { id: true },
  });
  if (duplicate) {
    return { error: "Slug sudah dipakai project lain." };
  }

  const project = await prisma.project.update({
    where: { id },
    data: parsed.data,
  });

  if (existing.coverImageUrl && existing.coverImageUrl !== parsed.data.coverImageUrl) {
    await removeCoverImage(existing.coverImageUrl);
  }

  revalidateProject(existing.slug);
  revalidateProject(project.slug);
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  return deleteContentItem({
    notFound: "Project tidak ditemukan.",
    find: () =>
      prisma.project.findUnique({
        where: { id },
        select: { slug: true, coverImageUrl: true },
      }),
    remove: () => prisma.project.delete({ where: { id } }),
    revalidate: revalidateProject,
    redirectTo: "/admin/projects",
  });
}

export async function createPost(input: unknown) {
  await requireAdmin();
  const parsed = postSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Validasi gagal." };
  }

  const existing = await prisma.blogPost.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return { error: "Slug sudah dipakai. Ganti slug atau biarkan auto-generate." };
  }

  const post = await prisma.blogPost.create({ data: parsed.data });
  revalidatePost(post.slug);
  redirect("/admin/blog");
}

export async function updatePost(id: string, input: unknown) {
  await requireAdmin();
  const parsed = postSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Validasi gagal." };
  }

  const existing = await prisma.blogPost.findUnique({
    where: { id },
    select: { slug: true, coverImageUrl: true },
  });
  if (!existing) {
    return { error: "Post tidak ditemukan." };
  }

  const duplicate = await prisma.blogPost.findFirst({
    where: { slug: parsed.data.slug, NOT: { id } },
    select: { id: true },
  });
  if (duplicate) {
    return { error: "Slug sudah dipakai post lain." };
  }

  const post = await prisma.blogPost.update({
    where: { id },
    data: parsed.data,
  });

  if (existing.coverImageUrl && existing.coverImageUrl !== parsed.data.coverImageUrl) {
    await removeCoverImage(existing.coverImageUrl);
  }

  revalidatePost(existing.slug);
  revalidatePost(post.slug);
  redirect("/admin/blog");
}

export async function deletePost(id: string) {
  return deleteContentItem({
    notFound: "Post tidak ditemukan.",
    find: () =>
      prisma.blogPost.findUnique({
        where: { id },
        select: { slug: true, coverImageUrl: true },
      }),
    remove: () => prisma.blogPost.delete({ where: { id } }),
    revalidate: revalidatePost,
    redirectTo: "/admin/blog",
  });
}

export async function toggleMessageRead(id: string, isRead: boolean) {
  await requireAdmin();
  await prisma.message.update({ where: { id }, data: { isRead } });
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await prisma.message.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}
