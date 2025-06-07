import { useEffect, useState } from "react";

interface Props {
  currentStep?: number;
  total?: number;
}

export function TimerBar({ currentStep, total }: Props) {
  if (
    typeof currentStep !== "number" ||
    typeof total !== "number" ||
    total <= 0
  ) {
    return null;
  }
  const pct = Math.min(Math.max(currentStep / total, 0), 1) * 100;
  const [width, setWidth] = useState(pct);

  useEffect(() => {
    setWidth(pct);
  }, [pct]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-dark2 z-50">
      <div
        className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
