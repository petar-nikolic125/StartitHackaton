// src/components/LiveCounter.tsx
import { FC, useEffect, useState } from "react";

export interface LiveCounterProps {
  className?: string;
}

export const LiveCounter: FC<LiveCounterProps> = ({ className }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // fake live increment
    const target = 124_932;
    let current = 0;
    const step = Math.ceil(target / 100);
    const iv = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(iv);
    }, 50);
    return () => clearInterval(iv);
  }, []);

  return (
      <div className={className}>
      <span className="text-lg md:text-xl font-medium">
        💸 ${count.toLocaleString()} earned by creators this month
      </span>
      </div>
  );
};
