import { useEffect, useState } from 'react';

export function ProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const pct = Math.min(diff / (4 * 60 * 1000), 1) * 100;
      setWidth(pct);
      if (pct >= 100) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-dark2 z-50">
      <div
        className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
