import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Projet introuvable" };

  return {
    title: `${project.title} - Ibrahima Sory Diallo`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];

  return (
    <main className="pt-20">
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Back button */}
        <a
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-secondary"
        >
          <ArrowLeft size={16} />
          Retour aux projets
        </a>

        {/* Header */}
        <header className="mb-12 space-y-6">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-secondary">
            {project.category}
          </span>
          <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            {project.title}
          </h1>
          <p className="text-xl leading-relaxed text-muted">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface px-4 py-1.5 text-sm font-medium text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 font-semibold text-background transition-all duration-300 hover:bg-secondary-light"
              >
                <ExternalLink size={18} />
                Voir le site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-border px-6 py-3 font-semibold text-foreground transition-all duration-300 hover:border-foreground"
              >
                <Github size={18} />
                Code source
              </a>
            )}
          </div>
        </header>

        {/* Hero Image placeholder */}
        <div className="mb-16 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-light">
          <span className="font-display text-3xl font-bold text-muted/20">
            {project.title}
          </span>
        </div>

        {/* Case Study Content */}
        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Le Défi
            </h2>
            <p className="leading-relaxed text-muted">
              {project.impact}. Ce projet nécessitait une approche technique
              rigoureuse pour répondre aux besoins spécifiques du client tout en
              garantissant performance, sécurité et évolutivité.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Ma Solution
            </h2>
            <p className="leading-relaxed text-muted">
              J&apos;ai conçu et développé une solution complète en utilisant{" "}
              {project.tags.join(", ")}. L&apos;architecture a été pensée pour
              être modulaire, maintenable et scalable, permettant des évolutions
              futures sans refonte majeure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Stack Technique
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4"
                >
                  <div className="h-3 w-3 rounded-full bg-secondary" />
                  <span className="text-sm font-medium text-foreground">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Résultats
            </h2>
            <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-8">
              <p className="text-lg font-medium text-secondary">
                {project.impact}
              </p>
            </div>
          </section>
        </div>

        {/* Navigation between projects */}
        <nav className="mt-20 grid gap-4 border-t border-border pt-12 sm:grid-cols-2">
          <a
            href={`/projects/${prevProject.slug}`}
            className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-secondary/50"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              Projet précédent
            </span>
            <p className="mt-2 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-secondary">
              {prevProject.title}
            </p>
          </a>
          <a
            href={`/projects/${nextProject.slug}`}
            className="group rounded-2xl border border-border bg-surface p-6 text-right transition-all duration-300 hover:border-secondary/50"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              Projet suivant
            </span>
            <p className="mt-2 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-secondary">
              {nextProject.title}
            </p>
          </a>
        </nav>
      </article>
    </main>
  );
}
