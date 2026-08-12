"use client";

import { useState } from "react";
import { MailOpen, Mail, Trash2 } from "lucide-react";
import { toggleMessageRead, deleteMessage } from "@/lib/actions";

interface MessageActionsProps {
  id: string;
  isRead: boolean;
}

export function MessageActions({ id, isRead }: MessageActionsProps) {
  const [read, setRead] = useState(isRead);
  const [deleting, setDeleting] = useState(false);

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={async () => {
          setRead((v) => !v);
          await toggleMessageRead(id, !read);
        }}
        className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
        title={read ? "Tandai belum dibaca" : "Tandai sudah dibaca"}
      >
        {read ? <Mail className="size-4" /> : <MailOpen className="size-4" />}
        {read ? "Belum dibaca" : "Sudah dibaca"}
      </button>
      <button
        type="button"
        disabled={deleting}
        onClick={async () => {
          if (window.confirm("Yakin ingin menghapus pesan ini?")) {
            setDeleting(true);
            await deleteMessage(id);
          }
        }}
        className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm text-destructive hover:opacity-80"
      >
        <Trash2 className="size-4" /> Hapus
      </button>
    </div>
  );
}
