// src/components/scroll/smoothScroll.ts

/**
 * Simply invoke the browser’s native smooth‐scroll.
 * Most modern browsers support CSS `scroll‐behavior: smooth` by default.
 */
export function smoothScroll(target: HTMLElement): void {
  // If the user has “reduced motion” preference, use instant jump:
  const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  target.scrollIntoView({
    behavior: prefersReduced ? 'auto' : 'smooth',
    block: 'start',
    inline: 'nearest',
  });
}
