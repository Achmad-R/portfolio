import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.SUPABASE_URL!;

export const storageBucket = "covers";

export function storagePublicUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${supabaseUrl}/storage/v1/object/public/${storageBucket}/${path}`;
}

export function storagePathFromUrl(url: string): string | null {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${storageBucket}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

export function getAdminStorageClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY belum di-set.");
  }
  return createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
}
