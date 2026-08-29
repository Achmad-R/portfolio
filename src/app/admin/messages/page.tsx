import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MessageActions } from "@/components/admin/message-actions";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/date";

export const metadata: Metadata = {
  title: "Messages - Admin",
};

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-[-1.2px] text-ink">
        Messages
        <span className="ml-2 text-sm font-normal text-muted-foreground">
          ({messages.filter((m) => !m.isRead).length} belum dibaca)
        </span>
      </h1>

      {messages.length === 0 ? (
        <p className="text-sm text-muted-foreground">Belum ada pesan masuk.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-[24px] border border-border bg-card p-6 ${
                !message.isRead ? "ring-1 ring-ink" : ""
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    {!message.isRead && (
                      <span className="size-2 rounded-full bg-primary" />
                    )}
                    <span className="text-base font-semibold text-ink">
                      {message.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      &lt;{message.email}&gt;
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary" className="text-[10px]">
                      {message.subject}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(message.createdAt)}
                    </span>
                  </div>
                </div>
                <MessageActions id={message.id} isRead={message.isRead} />
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">
                {message.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
