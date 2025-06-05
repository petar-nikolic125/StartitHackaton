import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: FC<CardProps> = ({ children, className, hover = true }) => (
  <div
    className={clsx(
      'rounded-2xl bg-dark2 p-6 text-gray-100 shadow-lg',
      hover &&
        'transform transition-all duration-200 hover:-translate-y-1 hover:ring-2 hover:ring-primary/50',
      className
    )}
  >
    {children}
  </div>
);
