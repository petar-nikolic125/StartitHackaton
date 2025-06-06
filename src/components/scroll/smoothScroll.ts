export async function smoothScroll(target: HTMLElement) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = prefersReduced ? 'auto' : 'smooth';

  if ('scrollBehavior' in document.documentElement.style) {
    target.scrollIntoView({ behavior, block: 'start' });
  } else {
    const { polyfill } = await import('smoothscroll-polyfill');
    polyfill();
    target.scrollIntoView({ behavior, block: 'start' });
  }
}
