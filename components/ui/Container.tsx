import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Largeur de page commune à toutes les sections (1240 px, marges latérales fluides)
export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
