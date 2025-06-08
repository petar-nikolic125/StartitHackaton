// src/components/scroll/useScrollSnap.tsx
import { useCallback } from 'react';
import { useScrollContext } from './ScrollProvider';
import { smoothScroll } from './smoothScroll';

export function useScrollSnap() {
    const { sections, setCurrentId } = useScrollContext();

    const scrollToId = useCallback(
        (id: string) => {
            const section = sections.current.find((s) => s.id === id);
            if (!section) return;
            setCurrentId(id);
            smoothScroll(section.el);
        },
        [sections, setCurrentId]
    );

    // Wheel and touch handlers removed; rely on CSS scroll-snap.

    return { scrollToId };
}
