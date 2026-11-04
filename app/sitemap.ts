import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteConfig } from "@/lib/constants";
import { localePath, locales } from "@/lib/i18n/config";
import { alternateLanguages } from "@/lib/metadata";

// Chaque page dans chaque langue, avec ses versions alternatives (hreflang).
// lastModified est volontairement omis : une date de build fausse est pire qu'aucune date.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    ...["/projects", "/about", "/cv", "/contact"].map((path) => ({ path, priority: 0.8 })),
    ...projects.map((project) => ({ path: `/projects/${project.slug}`, priority: 0.6 })),
  ];
  const absolute = (path: string) => `${siteConfig.url}${path === "/" ? "" : path}`;

  return pages.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: absolute(localePath(locale, path)),
      priority,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(alternateLanguages(path)).map(([lang, href]) => [lang, absolute(href)]),
        ),
      },
    })),
  );
}
