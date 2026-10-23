import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Github } from "@/components/shared/BrandIcons";
import LightboxImage from "@/components/shared/LightboxImage";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import Card, { cardClass } from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { Chip, Eyebrow } from "@/components/ui/Typography";
import { getContent } from "@/content";
import { projects } from "@/content/projects";
import { defaultLocale, isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const project = getContent(locale).projects.find((item) => item.slug === slug);
  if (!project) return {};

  const { meta } = getDictionary(locale);
  return pageMetadata({
    title: `${project.title} — ${meta.caseStudySuffix} | Ibrahima Sory Diallo`,
    description: project.description,
    path: `/projects/${project.slug}`,
    locale,
    type: "article",
    // Image générée par ./opengraph-image.tsx
    image: `${localePath(locale, `/projects/${project.slug}`)}/opengraph-image`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const { projects: all } = getContent(lang);
  const index = all.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const project = all[index];
  const previous = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];
  const { projects: t, common, nav } = getDictionary(lang);

  // Appel à l'action : dans la colonne latérale sur grand écran, après l'étude de cas sur mobile
  const cta = (visibility: string) => (
    <Card
      size="md"
      className={cn("relative flex-col gap-3 overflow-hidden p-6 sm:p-7", visibility)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-16 h-48 w-48 rounded-full bg-gold/15 blur-3xl"
      />
      <h2 className="relative font-display text-xl font-bold tracking-[-0.02em] text-ink">
        {t.ctaTitle}
      </h2>
      <p className="relative text-[15px] leading-relaxed text-ink-muted">{t.ctaText}</p>
      <Button
        href={localePath(lang, "/contact")}
        variant="gold"
        className="relative mt-2 self-start"
      >
        {nav.contact}
        <ArrowRight size={16} aria-hidden="true" />
      </Button>
    </Card>
  );

  return (
    <main id="main">
      <Container>
        <article>
          <header className="rise flex flex-col gap-8 pt-10 sm:pt-16">
            <Link
              href={localePath(lang, "/projects")}
              className="group inline-flex items-center gap-2 self-start rounded text-sm text-ink-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-gold"
            >
              <ArrowLeft
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-0.5"
              />
              {t.back}
            </Link>

            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="flex max-w-3xl flex-col gap-5">
                <Eyebrow>
                  {common.caseStudy} · {project.categoryLabel}
                </Eyebrow>
                <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] font-bold tracking-[-0.045em] text-balance text-ink">
                  {project.title}
                </h1>
                <p className="text-lg leading-relaxed text-ink-muted sm:text-xl">
                  {project.description}
                </p>
              </div>

              {(project.liveUrl || project.githubUrl) && (
                <div className="flex flex-wrap gap-3 lg:shrink-0">
                  {project.liveUrl && (
                    <Button href={project.liveUrl} variant="leaf" size="lg">
                      {common.visitSite}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button href={project.githubUrl} variant="outline" size="lg">
                      <Github size={16} aria-hidden="true" />
                      {common.sourceCode}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </header>

          <div className="rise mt-10 sm:mt-14" style={{ "--i": 1 } as React.CSSProperties}>
            <LightboxImage
              src={project.image}
              alt={project.description}
              title={project.title}
              zoomLabel={t.zoom}
            />
          </div>

          <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-12">
            <aside className="flex flex-col gap-3 sm:gap-4 lg:sticky lg:top-28 lg:order-last lg:col-span-4 lg:self-start">
              <Card size="md" className="flex flex-col gap-6 p-6 sm:p-7">
                <dl className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <dt className="font-mono text-xs tracking-[0.12em] text-gold-ink uppercase">
                      {t.status}
                    </dt>
                    <dd
                      className={cn(
                        "inline-flex items-center gap-2 font-medium",
                        project.liveUrl ? "text-leaf-ink" : "text-ink",
                      )}
                    >
                      {project.liveUrl && (
                        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-leaf-ink" />
                      )}
                      {project.liveUrl ? common.live : common.privateProject}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <dt className="font-mono text-xs tracking-[0.12em] text-gold-ink uppercase">
                      {t.impact}
                    </dt>
                    <dd className="leading-relaxed text-ink-soft">{project.impact}</dd>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <dt className="font-mono text-xs tracking-[0.12em] text-gold-ink uppercase">
                      {t.stack}
                    </dt>
                    <dd>
                      <ul className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li key={tag}>
                            <Chip>{tag}</Chip>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </Card>

              {cta("hidden lg:flex")}
            </aside>

            <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-8">
              {project.architecture && (
                <Reveal>
                  <Card className="flex flex-col gap-6 p-7 sm:p-9">
                    <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">
                      {t.architecture}
                    </h2>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {project.architecture.map((item) => (
                        <li
                          key={item}
                          className="rounded-2xl border border-line bg-card-2 p-5 text-[15px] leading-relaxed text-ink-soft"
                        >
                          <span
                            aria-hidden="true"
                            className="mb-3 block h-1 w-6 rounded-full bg-gold"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Reveal>
              )}

              {project.challenges && (
                <Reveal>
                  <Card className="flex flex-col gap-6 p-7 sm:p-9">
                    <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">
                      {t.challenges}
                    </h2>
                    <ol className="flex flex-col">
                      {project.challenges.map((challenge, i) => (
                        <li
                          key={challenge}
                          className="flex gap-5 border-b border-line py-4 last:border-b-0"
                        >
                          <span className="pt-0.5 font-mono text-sm text-gold-ink">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="text-[15px] leading-relaxed text-ink-soft sm:text-base">
                            {challenge}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </Card>
                </Reveal>
              )}

              {project.codeSnippet && (
                <Reveal>
                  <Card className="flex flex-col gap-6 p-7 sm:p-9">
                    <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">
                      {t.code}
                    </h2>
                    {/* Fond sombre fixe dans les deux thèmes : lisibilité du code */}
                    <pre
                      tabIndex={0}
                      className="overflow-x-auto rounded-2xl border border-line bg-[#0d0d0f] p-6 font-mono text-sm leading-relaxed text-[#e4e4e7] outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <code>{project.codeSnippet}</code>
                    </pre>
                  </Card>
                </Reveal>
              )}

              {!project.architecture && !project.challenges && !project.codeSnippet && (
                <Card className="flex flex-col gap-3 p-7 sm:p-9">
                  <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">
                    {t.impact}
                  </h2>
                  <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
                    {project.impact}
                  </p>
                </Card>
              )}

              {cta("flex lg:hidden")}
            </div>
          </div>
        </article>

        <nav aria-label={t.back} className="mt-16 grid gap-3 sm:mt-24 sm:grid-cols-2 sm:gap-4">
          {[
            { project: previous, label: t.previous, align: "items-start" },
            { project: next, label: t.next, align: "items-end text-right" },
          ].map(({ project: item, label, align }) => (
            <Link
              key={label}
              href={localePath(lang, `/projects/${item.slug}`)}
              className={cn(
                cardClass({ interactive: true }),
                "group flex flex-col gap-3 p-7 outline-none focus-visible:ring-2 focus-visible:ring-gold sm:p-9",
                align,
              )}
            >
              <span className="font-mono text-xs tracking-[0.12em] text-ink-muted uppercase transition-colors group-hover:text-gold-ink">
                {label}
              </span>
              <span className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">
                {item.title}
              </span>
              <span className="text-sm text-ink-muted">{item.categoryLabel}</span>
            </Link>
          ))}
        </nav>
      </Container>
    </main>
  );
}
