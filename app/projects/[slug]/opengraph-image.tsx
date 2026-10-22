import { projects } from "@/data/projects";
import { personalInfo } from "@/data/personal";
import { ogSize, renderOgImage } from "@/lib/og";

// Image de partage propre à chaque étude de cas
export const alt = "Étude de cas - Ibrahima Sory Diallo";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  return renderOgImage({
    title: project?.title ?? personalInfo.fullName,
    accent: project ? `Étude de cas · ${project.category}` : personalInfo.title,
    details: project?.tags.join(" · ") ?? "",
    footer: `${personalInfo.fullName} · ${personalInfo.title}`,
  });
}
