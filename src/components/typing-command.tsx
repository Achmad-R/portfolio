"use client";

import { useEffect, useState } from "react";

export function TypingCommand({
  prefix,
  command,
}: {
  prefix: string;
  command: string;
}) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const timer = setInterval(() => {
        setTyped(command);
        clearInterval(timer);
      }, 10);
      return () => clearInterval(timer);
    }
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setTyped(command.slice(0, i));
      if (i >= command.length) {
        clearInterval(timer);
      }
    }, 45);
    return () => clearInterval(timer);
  }, [command]);

  return (
    <div className="font-mono text-sm text-muted-foreground">
      <span className="text-link">{prefix}</span>
      <span className="text-primary"> $ </span>
      <span className="text-foreground">
        {typed}
        <span className="cursor-blink text-primary" aria-hidden="true">
          █
        </span>
      </span>
    </div>
  );
}