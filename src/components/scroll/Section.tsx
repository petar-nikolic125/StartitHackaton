// src/components/scroll/Section.tsx
import { HTMLAttributes, useRef, ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import { useScrollContext } from './ScrollProvider';

interface Props extends HTMLAttributes<HTMLDivElement> {
    id: string;
    className?: string;
    children: ReactNode;
}

export function Section({ id, className, children, ...rest }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const { register } = useScrollContext();

    useEffect(() => {
        if (ref.current) {
            register(id, ref.current);
        }
    }, [id, register]);

    return (
        <div
            id={id}
            ref={ref}
            data-section-id={id}
            className={clsx('min-h-screen', className)}
            {...rest}
        >
            {children}
        </div>
    );
}
