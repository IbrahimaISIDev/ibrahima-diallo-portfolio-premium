import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectGrid from "@/components/projects/ProjectGrid";
import Container from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/Typography";
import { getContent } from "@/content";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const { meta } = getDictionary(locale);
  return pageMetadata({
    title: meta.projectsTitle,
    description: meta.projectsDescription,
    path: "/projects",
    locale,
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { projects, projectCategories } = getContent(lang);
  const dict = getDictionary(lang);

  return (
    <main id="main">
      <Container className="flex flex-col gap-12 sm:gap-16">
        <PageHeader
          eyebrow={dict.projects.eyebrow}
          title={dict.projects.title}
          intro={dict.projects.intro}
        />
        <ProjectGrid
          locale={lang}
          projects={projects}
          categories={projectCategories}
          labels={{ ...dict.projects, ...dict.common }}
        />
      </Container>
    </main>
  );
}
