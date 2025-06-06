// src/components/scroll/useScrollSnap.tsx
import { useCallback, useEffect, useRef } from 'react';
import { useScrollContext } from './ScrollProvider';
import { smoothScroll } from './smoothScroll';

export function useScrollSnap() {
    const { currentId, sections, setCurrentId } = useScrollContext();
    const animating = useRef(false);

    const scrollToId = useCallback(
        (id: string) => {
            const section = sections.current.find((s) => s.id === id);
            if (!section) return;
            animating.current = true;

            setCurrentId(id);
            smoothScroll(section.el);

            setTimeout(() => {
                animating.current = false;
            }, 600); // ↑ increased duration to 600ms
        },
        [sections, setCurrentId]
    );

    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) < 30) return; // ↑ require a stronger flick

            const dir = e.deltaY > 0 ? 1 : -1;
            const idx = sections.current.findIndex((s) => s.id === currentId);
            const next = sections.current[idx + dir];

            if (!next || animating.current) {
                return;
            }

            e.preventDefault();
            scrollToId(next.id);
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        return () => window.removeEventListener('wheel', onWheel);
    }, [currentId, scrollToId, sections]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.2) { // ↑ threshold 0.2
                        const id = (entry.target as HTMLElement).dataset.sectionId!;
                        setCurrentId(id);
                        if (window.location.hash !== `#${id}`) {
                            history.replaceState(null, '', `#${id}`);
                        }
                    }
                });
            },
            { threshold: 0.2 } // ↑ threshold 0.2
        );

        sections.current.forEach((s) => observer.observe(s.el));
        return () => observer.disconnect();
    }, [sections, setCurrentId]);

    return { scrollToId };
}
