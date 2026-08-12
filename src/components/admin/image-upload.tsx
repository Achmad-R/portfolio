"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storagePublicUrl } from "@/lib/supabase";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Upload gagal.");
        return;
      }
      onChange(data.url);
    } catch {
      setError("Upload gagal. Coba lagi.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>Cover image</Label>
      {value ? (
        <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-md border">
          <Image
            src={storagePublicUrl(value)}
            alt="Cover preview"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-video w-full max-w-md items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          Belum ada cover image
        </div>
      )}
      <div className="flex items-center gap-3">
        <Input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => onChange("")}
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          {uploading ? "Uploading..." : "Remove"}
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <Input type="hidden" name="coverImageUrl" value={value} readOnly />
    </div>
  );
}
