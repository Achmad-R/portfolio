"use client";

import { useEffect, useState } from "react";

export function TerminalStatus() {
  const [now, setNow] = useState("--:--:--");

  useEffect(() => {
    const tick = () =>
      setNow(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-[11px] text-muted-foreground">
      <span className="text-live">●</span> available · cwd ~/achmad-ridho ·{" "}
      <span className="text-primary">local {now}</span>
    </div>
  );
}