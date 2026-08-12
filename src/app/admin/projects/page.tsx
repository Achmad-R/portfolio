import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "@/lib/actions";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Projects — Admin",
};

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-primary">$</span> projects
        </h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" /> Project baru
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-sm text-muted-foreground">Belum ada project.</p>
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {project.slug}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {project.published && (
                        <Badge variant="outline" className="font-mono text-[10px] text-primary">
                          published
                        </Badge>
                      )}
                      {project.featured && (
                        <Badge variant="secondary" className="font-mono text-[10px]">
                          featured
                        </Badge>
                      )}
                      {!project.published && (
                        <Badge variant="secondary" className="font-mono text-[10px]">
                          draft
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="size-4" /> Edit
                      </Link>
                      <ConfirmDelete action={() => deleteProject(project.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
