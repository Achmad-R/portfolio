"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Markdown } from "@/components/markdown";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function MarkdownEditor({ value, onChange, label = "Content (markdown)" }: MarkdownEditorProps) {
  const [mode, setMode] = useState<"write" | "preview">("write");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex gap-1 font-mono text-xs">
          <button
            type="button"
            onClick={() => setMode("write")}
            className={`rounded px-2 py-0.5 ${mode === "write" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            write
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`rounded px-2 py-0.5 ${mode === "preview" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            preview
          </button>
        </div>
      </div>

      {mode === "write" ? (
        <Textarea
          rows={14}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono text-sm"
        />
      ) : (
        <div className="max-h-96 min-h-64 overflow-y-auto rounded-md border p-4">
          {value ? (
            <Markdown content={value} />
          ) : (
            <p className="text-sm text-muted-foreground">Kosong — belum ada konten.</p>
          )}
        </div>
      )}
    </div>
  );
}
