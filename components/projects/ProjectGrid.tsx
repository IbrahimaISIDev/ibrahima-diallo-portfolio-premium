"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectShot from "@/components/home/ProjectShot";
import { cardClass } from "@/components/ui/Card";
import type { ProjectView, SiteContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  locale: Locale;
  projects: ProjectView[];
  categories: SiteContent["projectCategories"];
  labels: Pick<Dictionary["projects"], "filterLabel" | "all" | "count"> &
    Pick<Dictionary["common"], "live" | "privateProject">;
}

// Filtres par catégorie et grille des projets, chaque carte menant à son étude de cas
export default function ProjectGrid({ locale, projects, categories, labels }: ProjectGridProps) {
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? projects.filter((project) => project.category === active) : projects;
  const filters = [{ id: null, label: labels.all }, ...categories];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={labels.filterLabel} className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const selected = filter.id === active;
            return (
              <button
                key={filter.id ?? "all"}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(filter.id)}
                className={cn(
                  "relative min-h-10 rounded-full border px-4 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-gold",
                  selected
                    ? "border-ink text-canvas"
                    : "border-line text-ink-muted hover:border-line-strong hover:text-ink",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative">{filter.label}</span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="font-mono text-xs text-ink-muted">
          {visible.length} {labels.count}
        </p>
      </div>

      <motion.ul
        id="project-list"
        layout
        className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={localePath(locale, `/projects/${project.slug}`)}
                className={cn(
                  cardClass({ interactive: true, size: "md" }),
                  "group flex h-full flex-col gap-5 p-5 outline-none focus-visible:ring-2 focus-visible:ring-gold sm:p-6",
                )}
              >
                <ProjectShot
                  src={project.image}
                  alt=""
                  sizes="(min-width: 1240px) 370px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                  className="aspect-[16/10]"
                  // Première rangée, visible dès l'arrivée sur la page
                  priority={index < 3}
                />
                <div className="flex flex-1 flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-3 font-mono text-xs text-ink-muted">
                    <span>{project.categoryLabel}</span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5",
                        project.liveUrl && "text-leaf-ink",
                      )}
                    >
                      {project.liveUrl && (
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-leaf-ink" />
                      )}
                      {project.liveUrl ? labels.live : labels.privateProject}
                    </span>
                  </div>
                  <h2 className="flex items-center gap-2 font-display text-xl font-bold tracking-[-0.03em] text-ink">
                    {project.title}
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="ml-auto shrink-0 text-ink-muted transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-ink"
                    />
                  </h2>
                  <p className="line-clamp-3 text-[15px] leading-relaxed text-ink-muted">
                    {project.description}
                  </p>
                  <p className="mt-auto pt-2 font-mono text-xs text-ink-muted">
                    {project.tags.slice(0, 3).join(" · ")}
                  </p>
                </div>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
