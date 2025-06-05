import { FC, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonVariant = "solid" | "gradient" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
  xl: "text-xl px-10 py-5",
};

const variantClasses: Record<ButtonVariant, string> = {
  solid: "bg-accent text-white hover:bg-secondary",
  gradient:
    "bg-gradient-to-r from-primary via-secondary to-accent text-white hover:opacity-90",
  outline:
    "border-2 border-secondary text-primary hover:bg-panel",
};

export const Button: FC<ButtonProps> = ({
  size = "md",
  variant = "gradient",
  className,
  children,
  ...props
}) => (
  <button
    className={clsx(
      "rounded-full font-medium shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all duration-200",
      sizeClasses[size],
      variantClasses[variant],
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
