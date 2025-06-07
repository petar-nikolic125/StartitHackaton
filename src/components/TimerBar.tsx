import { useEffect, useState } from "react";

interface TimerBarProps {
  currentStep?: number;
  total?: number;
}

export function TimerBar({ currentStep, total }: TimerBarProps) {
  // ── 1.  Figure out the percentage first ────────────────────────────────
  const pct =
      typeof currentStep === "number" &&
      typeof total === "number" &&
      total > 0
          ? Math.min(Math.max(currentStep / total, 0), 1) * 100
          : 0;

  // ── 2.  Hooks are now unconditional (always executed) ──────────────────
  const [width, setWidth] = useState(pct);

  useEffect(() => {
    setWidth(pct);
  }, [pct]);

  // ── 3.  Bail-out render after hooks have run ────────────────────────────
  if (
      typeof currentStep !== "number" ||
      typeof total !== "number" ||
      total <= 0
  ) {
    return null;
  }

  // ── 4.  Render the animated bar ─────────────────────────────────────────
  return (
      <div className="fixed top-0 left-0 w-full h-1 bg-dark2 z-50">
        <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300"
            style={{ width: `${width}%` }}
        />
      </div>
  );
}
