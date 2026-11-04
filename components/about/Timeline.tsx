import type { ExperienceView } from "@/content";

// Parcours vertical : période, poste, organisation et description, sur un rail
export default function Timeline({ items }: { items: ExperienceView[] }) {
  return (
    <ol className="relative flex flex-col gap-8 border-l border-line pl-6">
      {items.map((item, index) => (
        <li key={item.id} className="relative flex flex-col gap-1.5">
          {/* Repère sur le rail : or pour l'étape la plus récente */}
          <span
            aria-hidden="true"
            className={
              index === 0
                ? "absolute top-1.5 -left-[29px] h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-gold/15"
                : "absolute top-1.5 -left-[28px] h-2 w-2 rounded-full border border-line-strong bg-card"
            }
          />
          <span className="font-mono text-xs text-ink-muted">{item.period}</span>
          <h3 className="font-display text-lg leading-snug font-bold tracking-[-0.02em] text-ink">
            {item.title}
          </h3>
          <p className="text-sm font-medium text-gold-ink">{item.organization}</p>
          <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
