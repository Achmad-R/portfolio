export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateSlug(title: string): string {
  const base = slugify(title) || "untitled";
  return `${base}-${Date.now().toString(36).slice(-4)}`;
}
