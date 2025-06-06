import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

interface Section {
  id: string;
  el: HTMLElement;
}

interface ScrollContextValue {
  currentId: string;
  sections: React.MutableRefObject<Section[]>;
  setCurrentId: (id: string) => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useScrollContext() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error('useScrollContext must be used within ScrollProvider');
  return ctx;
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [currentId, setCurrentId] = useState('');
  const sections = useRef<Section[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const id = (entry.target as HTMLElement).dataset.sectionId!;
            setCurrentId(id);
            if (window.location.hash !== `#${id}`) {
              history.replaceState(null, '', `#${id}`);
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.current.forEach((s) => observer.observe(s.el));
    return () => observer.disconnect();
  }, []);

  const value = { currentId, sections, setCurrentId };
  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}
