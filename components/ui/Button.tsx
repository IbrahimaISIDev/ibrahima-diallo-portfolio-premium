import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 cursor-pointer";

    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25",
      secondary:
        "bg-secondary text-background hover:bg-secondary-light hover:shadow-lg hover:shadow-secondary/25",
      outline:
        "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background",
      ghost:
        "text-foreground hover:bg-surface",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    if (href) {
      return (
        <a
          href={href}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
