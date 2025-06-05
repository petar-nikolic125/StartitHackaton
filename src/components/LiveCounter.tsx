import { useEffect, useState } from 'react';

export function LiveCounter({ className = '' }: { className?: string }) {
  const [count, setCount] = useState(100000);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 50), 1000);
    return () => clearInterval(id);
  }, []);
  const formatted = count.toLocaleString();
  return (
    <span className={`text-gray-200 ${className}`}>${formatted} earned by creators</span>
  );
}
