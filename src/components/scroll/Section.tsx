import { HTMLAttributes, useEffect, useRef } from 'react';
import { useScrollContext } from './ScrollProvider';
import clsx from 'clsx';

interface Props extends HTMLAttributes<HTMLDivElement> {
  id: string;
  snap?: 'start' | 'center' | 'end';
}

export function Section({ id, snap = 'start', className, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { sections } = useScrollContext();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    sections.current.push({ id, el });
    el.dataset.sectionId = id;
    return () => {
      sections.current = sections.current.filter((s) => s.id !== id);
    };
  }, [id, sections]);

  return (
    <div
      id={id}
      ref={ref}
      data-section-id={id}
      className={clsx('min-h-screen', `snap-${snap}`, className)}
      {...rest}
    />
  );
}
