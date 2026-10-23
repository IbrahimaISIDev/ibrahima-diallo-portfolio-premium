import type { Metadata } from "next";
import { defaultLocale, htmlLocale, localePath, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

// Adresses d'une page dans chaque langue (balises hreflang). x-default : la version française.
export function alternateLanguages(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, localePath(locale, path)])),
    "x-default": localePath(defaultLocale, path),
  };
}

interface PageMetadataOptions {
  title: string;
  description: string;
  // Chemin de la page sans préfixe de langue, ex. "/about"
  path: string;
  locale?: Locale;
  type?: "website" | "article";
  // Route d'une image générée par opengraph-image.tsx (par défaut, celle du site)
  image?: string;
}

// Next fusionne les métadonnées clé par clé : une page qui ne redéfinit pas
// openGraph et twitter hérite du titre et de l'URL de l'accueil, et une page
// qui les redéfinit perd l'image injectée par app/opengraph-image.tsx.
// Ce helper les renseigne donc toujours ensemble, image, URL canonique et
// versions dans les autres langues comprises.
export function pageMetadata({
  title,
  description,
  path,
  locale = defaultLocale,
  type = "website",
  image = "/opengraph-image",
}: PageMetadataOptions): Metadata {
  const url = localePath(locale, path);
  const images = [{ url: image, width: 1200, height: 630, alt: title }];

  return {
    title,
    description,
    alternates: { canonical: url, languages: alternateLanguages(path) },
    openGraph: {
      type,
      locale: htmlLocale[locale],
      alternateLocale: locales
        .filter((other) => other !== locale)
        .map((other) => htmlLocale[other]),
      siteName: getDictionary(locale).meta.siteName,
      url,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
