"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteProps {
  action: (id: string) => Promise<{ error?: string } | undefined>;
  entityId: string;
  label?: string;
}

export function ConfirmDelete({ action, entityId, label = "Hapus" }: ConfirmDeleteProps) {
  return (
    <form
      action={async () => {
        if (window.confirm("Yakin ingin menghapus? Tindakan ini tidak bisa dibatalkan.")) {
          await action(entityId);
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
