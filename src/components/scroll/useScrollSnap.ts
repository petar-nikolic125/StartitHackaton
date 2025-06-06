import { useCallback, useEffect, useRef } from 'react';
import { useScrollContext } from './ScrollProvider';
import { smoothScroll } from './smoothScroll';

export function useScrollSnap() {
  const { currentId, sections } = useScrollContext();
  const animating = useRef(false);
  const touchStart = useRef(0);

  const scrollToId = useCallback(
    (id: string) => {
      const el = sections.current.find((s) => s.id === id)?.el;
      if (el) {
        animating.current = true;
        smoothScroll(el).then(() => {
          setTimeout(() => {
            animating.current = false;
          }, 100);
        });
      }
    },
    [sections]
  );

  const handler = useCallback(
    (dir: number) => {
      if (animating.current) return;
      const index = sections.current.findIndex((s) => s.id === currentId);
      const next = sections.current[index + dir];
      if (next) scrollToId(next.id);
    },
    [currentId, scrollToId, sections]
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 50) return;
      e.preventDefault();
      handler(e.deltaY > 0 ? 1 : -1);
    };
    const onTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const diff = touchStart.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) {
        e.preventDefault();
        handler(diff > 0 ? 1 : -1);
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [handler]);

  return { scrollToId };
}
