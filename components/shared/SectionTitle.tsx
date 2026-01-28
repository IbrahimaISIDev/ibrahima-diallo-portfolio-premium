import { cn } from "@/lib/utils";
import MaskedReveal from "./MaskedReveal";

interface SectionTitleProps {
  subtitle: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  subtitle,
  title,
  description,
  align = "center",
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-16 max-w-2xl space-y-4",
        align === "center" && "mx-auto text-center"
      )}
    >
      <MaskedReveal>
        <span className="inline-block text-sm font-semibold uppercase tracking-widest text-secondary">
          {subtitle}
        </span>
      </MaskedReveal>
      <MaskedReveal delay={0.1}>
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </MaskedReveal>
      {description && (
        <MaskedReveal delay={0.2}>
          <p className="text-lg leading-relaxed text-muted">{description}</p>
        </MaskedReveal>
      )}
    </div>
  );
}
