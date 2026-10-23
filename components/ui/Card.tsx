import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardOptions {
  // Carte cliquable : légère élévation et bordure renforcée au survol
  interactive?: boolean;
  // Grande carte (rayon 28 px) ou carte secondaire (rayon 24 px)
  size?: "lg" | "md";
}

// Classes de la carte bento, réutilisables sur un <Link> ou un <a>
export function cardClass({ interactive = false, size = "lg" }: CardOptions = {}) {
  return cn(
    "border border-line bg-card",
    size === "lg" ? "rounded-[28px]" : "rounded-3xl",
    interactive &&
      "transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-line-strong focus-visible:-translate-y-0.5 focus-visible:border-line-strong",
  );
}

interface CardProps extends CardOptions {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
}

export default function Card({
  as: Tag = "div",
  className,
  children,
  interactive,
  size,
  id,
}: CardProps) {
  return (
    <Tag id={id} className={cn(cardClass({ interactive, size }), className)}>
      {children}
    </Tag>
  );
}
