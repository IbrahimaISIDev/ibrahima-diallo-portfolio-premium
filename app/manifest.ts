import type { MetadataRoute } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";

// Manifeste de la version française (adresse racine) ; couleurs du thème sombre par défaut
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: getDictionary("fr").meta.siteName,
    short_name: "Ibrahima",
    description: getDictionary("fr").meta.homeDescription,
    start_url: "/",
    display: "browser",
    background_color: "#09090a",
    theme_color: "#09090a",
    lang: "fr",
    icons: [
      { src: "/icon/medium", sizes: "192x192", type: "image/png" },
      { src: "/icon/large", sizes: "512x512", type: "image/png" },
    ],
  };
}
