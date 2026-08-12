import { cn } from "@/lib/utils";

export function PromptLine({
  command,
  className,
}: {
  command: string;
  className?: string;
}) {
  return (
    <div className={cn("font-mono text-sm", className)}>
      <span className="text-link">~/achmad-ridho</span>
      <span className="text-primary"> $ </span>
      <span className="text-foreground">{command}</span>
    </div>
  );
}