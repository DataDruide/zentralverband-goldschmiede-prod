import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
  outline:
    "border border-border bg-card text-foreground hover:border-accent hover:text-accent",
  ghost:
    "text-foreground/80 hover:text-accent hover:bg-secondary/60",
  accent:
    "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm gap-1.5",
  md: "min-h-11 px-5 sm:px-6 text-sm gap-2",
  lg: "min-h-12 px-6 sm:px-7 text-base gap-2",
};

const base =
  "inline-flex items-center justify-center rounded-full font-medium leading-none whitespace-nowrap transition-all duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", fullWidth, className = "", children, ...rest }, ref) => {
    const cls = [
      base,
      variants[variant],
      sizes[size],
      fullWidth ? "w-full" : "",
      className,
    ].join(" ");
    return (
      <button ref={ref} className={cls} {...rest}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    to: string;
    external?: boolean;
  };

export function LinkButton({
  variant = "primary",
  size = "md",
  fullWidth,
  className = "",
  children,
  to,
  external,
  ...rest
}: LinkButtonProps) {
  const cls = [
    base,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full sm:w-auto" : "",
    className,
  ].join(" ");

  if (external || to.startsWith("http") || to.startsWith("mailto:") || to.startsWith("tel:")) {
    return (
      <a href={to} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  );
}
