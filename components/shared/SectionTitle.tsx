import { cn } from "@/lib/utils";

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
      <span className="inline-block text-sm font-semibold uppercase tracking-widest text-secondary">
        {subtitle}
      </span>
      <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-lg leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
