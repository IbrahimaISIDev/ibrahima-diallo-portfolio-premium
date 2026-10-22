import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

interface PageMetadataOptions {
  title: string;
  description: string;
  // Chemin absolu de la page, ex. "/about"
  path: string;
  type?: "website" | "article";
  // Route d'une image générée par opengraph-image.tsx (par défaut, celle du site)
  image?: string;
}

// Next fusionne les métadonnées clé par clé : une page qui ne redéfinit pas
// openGraph et twitter hérite du titre et de l'URL de l'accueil, et une page
// qui les redéfinit perd l'image injectée par app/opengraph-image.tsx.
// Ce helper les renseigne donc toujours ensemble, image et URL canonique comprises.
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image = "/opengraph-image",
}: PageMetadataOptions): Metadata {
  const images = [{ url: image, width: 1200, height: 630, alt: title }];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "fr_FR",
      siteName: `${siteConfig.name} - Portfolio`,
      url: path,
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
