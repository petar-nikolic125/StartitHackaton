// src/components/scroll/Section.tsx
import { HTMLAttributes, useRef, ReactNode } from 'react';
import clsx from 'clsx';

interface Props extends HTMLAttributes<HTMLDivElement> {
    id: string;
    className?: string;
    children: ReactNode;
}

export function Section({ id, className, children, ...rest }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div
            id={id}
            ref={ref}
            className={clsx('min-h-screen', className)}
            {...rest}
        >
            {children}
        </div>
    );
}
