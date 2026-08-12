import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
}

export function Pagination({ basePath, currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageHref = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`;

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      <Link
        href={pageHref(currentPage - 1)}
        aria-disabled={currentPage <= 1}
        className={cn(
          "inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm",
          currentPage <= 1
            ? "pointer-events-none opacity-40"
            : "hover:border-primary/50 hover:text-primary"
        )}
      >
        <ChevronLeft className="size-4" /> Prev
      </Link>
      <span className="px-2 font-mono text-sm text-muted-foreground">
        {currentPage} / {totalPages}
      </span>
      <Link
        href={pageHref(currentPage + 1)}
        aria-disabled={currentPage >= totalPages}
        className={cn(
          "inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm",
          currentPage >= totalPages
            ? "pointer-events-none opacity-40"
            : "hover:border-primary/50 hover:text-primary"
        )}
      >
        Next <ChevronRight className="size-4" />
      </Link>
    </nav>
  );
}
