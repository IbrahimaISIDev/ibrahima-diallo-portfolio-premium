import { getContent } from "@/content";
import { projects } from "@/content/projects";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ogSize, renderOgImage } from "@/lib/og";

// Image de partage propre à chaque étude de cas, dans chaque langue
export const alt = "Ibrahima Sory Diallo — Case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const { profile, projects: all } = getContent(locale);
  const project = all.find((item) => item.slug === slug);
  const { common } = getDictionary(locale);

  return renderOgImage({
    title: project?.title ?? profile.fullName,
    accent: project ? `${common.caseStudy} · ${project.categoryLabel}` : profile.shortHeadline,
    details: project?.tags.join(" · ") ?? "",
    footer: `${profile.fullName} · ${profile.title}`,
  });
}
