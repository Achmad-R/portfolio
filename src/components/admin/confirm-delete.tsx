"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteProps {
  action: () => Promise<{ error?: string } | undefined>;
  label?: string;
}

export function ConfirmDelete({ action, label = "Hapus" }: ConfirmDeleteProps) {
  return (
    <form
      action={async () => {
        if (window.confirm("Yakin ingin menghapus? Tindakan ini tidak bisa dibatalkan.")) {
          await action();
        }
      }}
    >
      <Button type="submit" variant="ghost" size="sm" className="text-destructive">
        <Trash2 className="size-4" />
        {label}
      </Button>
    </form>
  );
}
