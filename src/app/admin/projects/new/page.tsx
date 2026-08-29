import type { Metadata } from "next";
import { ProjectForm } from "@/components/admin/project-form";

export const metadata: Metadata = {
  title: "Project Baru - Admin",
};

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-[-1.2px] text-ink">Project baru</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
