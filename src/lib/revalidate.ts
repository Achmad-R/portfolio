import "server-only";
import { revalidatePath } from "next/cache";

export function revalidateAll() {
  revalidatePath("/", "layout");
}

export function revalidateProject(slug?: string) {
  revalidatePath("/", "layout");
  if (slug) revalidatePath(`/projects/${slug}`);
}

export function revalidatePost(slug?: string) {
  revalidatePath("/", "layout");
  if (slug) revalidatePath(`/blog/${slug}`);
}
