import React, { AnchorHTMLAttributes } from 'react';
import clsx from 'clsx';
import { useScrollContext } from './ScrollProvider';
import { smoothScroll } from './smoothScroll';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string; // expects “#sectionId”
  className?: string;
}

export function SmoothLink({ href, className, children, ...rest }: Props) {
  const { sections, currentId } = useScrollContext();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = sections.current.find((s) => s.id === id)?.el;
    if (el) smoothScroll(el);
  };

  const active = currentId === href.replace('#', '');

  return (
      <a
          href={href}
          onClick={handleClick}
          className={clsx(className, active && 'active')}
          aria-current={active ? 'page' : undefined}
          {...rest}
      >
        {children}
      </a>
  );
}
