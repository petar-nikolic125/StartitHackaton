import { useEffect, useState } from 'react'

export function LiveCounter({ className = '' }: { className?: string }) {
  const [count, setCount] = useState(100000)
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 50), 1000)
    return () => clearInterval(id)
  }, [])
  const formatted = count.toLocaleString()

  return (
      <span
          className={`
        flex items-center justify-center
        text-lg md:text-xl lg:text-2xl font-semibold
        text-transparent bg-clip-text
        bg-gradient-to-r from-electric-magenta via-hyper-purple to-cyber-teal
        animate-text-gradient                    /* NEW: continuous shimmer on the counter text */
        drop-shadow-2xl                          /* NEW: strong neon glow shadow */
        tracking-wide leading-tight
        ${className}
      `}
      >
      ${formatted} earned by founders
    </span>
  )
}
