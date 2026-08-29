"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Markdown } from "@/components/markdown";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function MarkdownEditor({ value, onChange, label = "Konten (markdown)" }: MarkdownEditorProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="grid gap-2 md:grid-cols-2">
        <Textarea
          rows={14}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono text-sm md:h-96"
        />
        <div className="max-h-96 min-h-64 overflow-y-auto rounded-md border p-4 md:h-96">
          {value ? (
            <Markdown content={value} />
          ) : (
            <p className="text-sm text-muted-foreground">Kosong, belum ada konten.</p>
          )}
        </div>
      </div>
    </div>
  );
}