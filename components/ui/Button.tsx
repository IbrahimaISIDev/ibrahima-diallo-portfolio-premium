import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "gold" | "leaf" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-canvas hover:bg-ink-soft",
  outline: "border border-line-strong text-ink hover:border-ink-muted",
  gold: "bg-gold text-on-gold hover:brightness-110",
  leaf: "bg-leaf text-on-leaf hover:brightness-110",
  ghost: "text-ink-muted hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-[15px]",
  lg: "min-h-[52px] px-6 text-[15px]",
};

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  // Lien : interne (next/link) ou externe (http, mailto, tel…) ; sinon <button>
  href?: string;
  download?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  download,
  type = "button",
  disabled,
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2.5 rounded-2xl font-semibold transition-[background-color,border-color,color,filter] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external || download) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          download={download || undefined}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
