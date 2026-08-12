import type { Metadata } from "next";
import Link from "next/link";
import { FolderKanban, FileText, Inbox, ArrowRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/date";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard — Admin",
};

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const [projectCount, postCount, messageCount, unreadCount, recentMessages] =
    await Promise.all([
      prisma.project.count(),
      prisma.blogPost.count(),
      prisma.message.count(),
      prisma.message.count({ where: { isRead: false } }),
      prisma.message.findMany({
        where: { isRead: false },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const stats = [
    { label: "Projects", value: projectCount, href: "/admin/projects", icon: FolderKanban },
    { label: "Posts", value: postCount, href: "/admin/blog", icon: FileText },
    {
      label: "Messages",
      value: messageCount,
      href: "/admin/messages",
      icon: Inbox,
      badge: unreadCount > 0 ? `${unreadCount} belum dibaca` : undefined,
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-primary">$</span> dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Masuk sebagai {session.user.email}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition-colors hover:border-primary/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="size-4 text-primary" />
              </CardHeader>
              <CardContent className="flex items-center gap-2">
                <span className="font-heading text-3xl font-bold">{stat.value}</span>
                {stat.badge && (
                  <Badge variant="outline" className="font-mono text-[10px] text-primary">
                    {stat.badge}
                  </Badge>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold">
            <span className="text-primary">#</span> Pesan belum dibaca
          </h2>
          <Link
            href="/admin/messages"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            Semua <ArrowRight className="size-4" />
          </Link>
        </div>
        {recentMessages.length === 0 ? (
          <p className="text-sm text-muted-foreground">Tidak ada pesan belum dibaca.</p>
        ) : (
          <div className="flex flex-col divide-y rounded-lg border bg-card">
            {recentMessages.map((message) => (
              <div key={message.id} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {!message.isRead && (
                      <span className="size-2 shrink-0 rounded-full bg-primary" />
                    )}
                    <span className="truncate font-heading text-sm font-semibold">
                      {message.name}
                    </span>
                    <span className="truncate font-mono text-xs text-muted-foreground">
                      {message.subject}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {message.message}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {formatDateTime(message.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
