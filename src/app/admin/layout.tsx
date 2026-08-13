import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { LayoutDashboard, FolderKanban, FileText, Inbox, ExternalLink } from "lucide-react";
import { auth } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/logout-button";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
];

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const pathname = (await headers()).get("x-invoke-path") ?? "";
  if (!session?.user && pathname && pathname !== "/admin/login") {
    redirect("/admin/login");
  }
  const loggedIn = Boolean(session?.user);

  return (
    <div className="flex min-h-dvh">
      {loggedIn && (
        <aside className="flex w-56 shrink-0 flex-col border-r bg-sidebar">
          <Link
            href="/admin"
            className="border-b px-4 py-4 text-sm font-semibold text-ink"
          >
            Admin
          </Link>
          <nav className="flex flex-1 flex-col gap-1 p-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-1 border-t p-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <ExternalLink className="size-4" />
              Lihat situs
            </Link>
            <LogoutButton />
          </div>
        </aside>
      )}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
