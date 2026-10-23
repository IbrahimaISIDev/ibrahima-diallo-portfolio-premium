import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Petit libellé en capitales, police mono, couleur or : annonce une section ou une carte
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "font-mono text-xs font-medium uppercase tracking-[0.12em] text-gold-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

// En-tête de section : libellé, titre h2 et, en option, un lien ou une action à droite
export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  id,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-6", className)}>
      <div className="flex max-w-2xl flex-col gap-3">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          id={id}
          className="font-display text-3xl font-bold tracking-[-0.035em] text-ink text-balance sm:text-4xl"
        >
          {title}
        </h2>
        {description && <p className="text-base leading-relaxed text-ink-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

// Étiquette de technologie ou de compétence
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[10px] border border-line bg-card-2 px-3.5 py-2 text-sm text-ink-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}
