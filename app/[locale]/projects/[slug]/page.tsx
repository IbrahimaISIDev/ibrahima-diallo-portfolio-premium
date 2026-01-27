import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const locales = ["fr", "en"];
  const params: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    projects.forEach((project) => {
      params.push({ locale, slug: project.slug });
    });
  });

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Projet introuvable" };

  const t = await getTranslations({ locale, namespace: "Portfolio" });

  return {
    title: `${t(`projects.${project.slug}.title`)} - Ibrahima Sory Diallo`,
    description: t(`projects.${project.slug}.description`),
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Portfolio" });
  const tDetails = await getTranslations({ locale, namespace: "Portfolio.details" });

  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];

  const pKey = `projects.${project.slug}`;

  return (
    <main className="pt-20">
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-secondary"
        >
          <ArrowLeft size={16} />
          {t("backToProjects")}
        </Link>

        {/* Header */}
        <header className="mb-12 space-y-6">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-secondary">
            {t(`categories.${project.category.toLowerCase()}`)}
          </span>
          <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            {t(`${pKey}.title`)}
          </h1>
          <p className="text-xl leading-relaxed text-muted">
            {t(`${pKey}.description`)}
          </p>

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
                {t("viewProject")}
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
                {t("viewCode")}
              </a>
            )}
          </div>
        </header>

        {/* Hero Image placeholder */}
        <div className="mb-16 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-light">
          <span className="font-display text-3xl font-bold text-muted/20">
            {t(`${pKey}.title`)}
          </span>
        </div>

        {/* Case Study Content */}
        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {tDetails("challenge")}
            </h2>
            <p className="leading-relaxed text-muted">
              {t(`${pKey}.impact`)}.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {tDetails("techStack")}
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
              {tDetails("results")}
            </h2>
            <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-8">
              <p className="text-lg font-medium text-secondary">
                {t(`${pKey}.impact`)}
              </p>
            </div>
          </section>
        </div>

        {/* Navigation between projects */}
        <nav className="mt-20 grid gap-4 border-t border-border pt-12 sm:grid-cols-2">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-secondary/50"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              {tDetails("prevProject")}
            </span>
            <p className="mt-2 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-secondary">
              {t(`projects.${prevProject.slug}.title`)}
            </p>
          </Link>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group rounded-2xl border border-border bg-surface p-6 text-right transition-all duration-300 hover:border-secondary/50"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              {tDetails("nextProject")}
            </span>
            <p className="mt-2 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-secondary">
              {t(`projects.${nextProject.slug}.title`)}
            </p>
          </Link>
        </nav>
      </article>
    </main>
  );
}
