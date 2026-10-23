import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { cardClass } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/Typography";
import type { ProjectView, SiteContent } from "@/content";
import { localePath } from "@/lib/i18n/config";
import { format, type Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import ProjectShot from "./ProjectShot";

interface FeaturedProjectsProps {
  content: SiteContent;
  dict: Dictionary;
}

// Gabarit de chaque carte mise en avant, dans l'ordre de content/projects.ts
const layouts = [
  {
    span: "md:col-span-8",
    shot: "aspect-video",
    sizes: "(min-width: 1240px) 760px, (min-width: 768px) 62vw, 100vw",
    size: "lg",
  },
  {
    span: "md:col-span-4",
    shot: "aspect-[4/3]",
    sizes: "(min-width: 1240px) 360px, (min-width: 768px) 30vw, 100vw",
    size: "lg",
  },
  {
    span: "md:col-span-4",
    shot: "aspect-[16/10]",
    sizes: "(min-width: 1240px) 360px, (min-width: 768px) 30vw, 100vw",
    size: "md",
  },
  {
    span: "md:col-span-4",
    shot: "aspect-[16/10]",
    sizes: "(min-width: 1240px) 360px, (min-width: 768px) 30vw, 100vw",
    size: "md",
  },
] as const;

function ProjectCard({
  project,
  layout,
  href,
}: {
  project: ProjectView;
  layout: (typeof layouts)[number];
  href: string;
}) {
  const large = layout.size === "lg";

  return (
    <Link
      href={href}
      className={cn(
        cardClass({ interactive: true, size: layout.size }),
        "group flex h-full flex-col gap-5 p-5 outline-none focus-visible:ring-2 focus-visible:ring-gold sm:p-6",
        large && "lg:p-7",
      )}
    >
      <ProjectShot src={project.image} alt="" sizes={layout.sizes} className={layout.shot} />
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="flex items-baseline gap-2 font-display font-bold tracking-[-0.03em] text-ink">
          <span className={large ? "text-2xl sm:text-[28px]" : "text-xl"}>{project.title}</span>
          <span className="font-body text-sm font-medium tracking-normal text-ink-muted">
            · {project.categoryLabel}
          </span>
          <ArrowUpRight
            size={18}
            aria-hidden="true"
            className="ml-auto shrink-0 self-center text-ink-muted transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-ink"
          />
        </h3>
        {large && (
          <p className="line-clamp-3 text-[15px] leading-relaxed text-ink-muted">
            {project.description}
          </p>
        )}
        <p className="mt-auto pt-2 font-mono text-xs text-ink-muted">
          {project.tags.slice(0, 3).join(" · ")}
        </p>
      </div>
    </Link>
  );
}

// Projets mis en avant en bento, et une carte vers les autres projets
export default function FeaturedProjects({ content, dict }: FeaturedProjectsProps) {
  const { projects, featuredProjects, locale } = content;
  const others = projects.filter((project) => !project.featured);
  const allProjectsHref = localePath(locale, "/projects");

  return (
    <section id="projects" aria-labelledby="projects-title" className="pt-24 sm:pt-32">
      <Reveal>
        <SectionHeader
          id="projects-title"
          eyebrow={dict.home.projectsEyebrow}
          title={dict.home.projectsTitle}
          action={
            <Link
              href={allProjectsHref}
              className="group inline-flex items-center gap-2 rounded text-sm text-ink-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-gold"
            >
              {format(dict.home.allProjects, { count: projects.length })}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          }
        />
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-12">
        {featuredProjects.slice(0, layouts.length).map((project, index) => (
          <Reveal key={project.slug} index={index % 3} className={layouts[index].span}>
            <ProjectCard
              project={project}
              layout={layouts[index]}
              href={localePath(locale, `/projects/${project.slug}`)}
            />
          </Reveal>
        ))}

        <Reveal index={2} className="md:col-span-4">
          <Link
            href={allProjectsHref}
            className={cn(
              cardClass({ interactive: true, size: "md" }),
              "group flex h-full min-h-[220px] flex-col justify-between gap-6 border-leaf bg-leaf p-7 text-on-leaf outline-none hover:border-leaf focus-visible:ring-2 focus-visible:ring-gold",
            )}
          >
            <span className="font-display text-[56px] leading-none font-bold tracking-[-0.04em]">
              +{others.length}
            </span>
            <span className="flex flex-col gap-3 text-base leading-normal">
              <span className="text-on-leaf/85">
                {others
                  .slice(0, 5)
                  .map((project) => project.title)
                  .join(", ")}
                …
              </span>
              <span className="inline-flex items-center gap-2 font-semibold">
                {dict.home.moreProjectsHint}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
