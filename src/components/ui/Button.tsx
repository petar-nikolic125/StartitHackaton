import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'solid' | 'gradient';

const sizeMap: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const variantMap: Record<ButtonVariant, string> = {
  solid: 'bg-accent text-white hover:bg-secondary',
  gradient:
    'bg-gradient-to-r from-primary via-secondary to-accent text-white hover:opacity-90',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  size = 'md',
  variant = 'gradient',
  className,
  ...props
}) => (
  <button
    className={clsx(
      'rounded-full font-medium focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all duration-200',
      sizeMap[size],
      variantMap[variant],
      className
    )}
    {...props}
  >
    {children}
  </button>
);
