import type { MetadataRoute } from "next";
import { personalInfo } from "@/data/personal";
import { siteConfig } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${personalInfo.fullName} - Portfolio`,
    short_name: "Ibrahima",
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    background_color: "#111111",
    theme_color: "#111111",
    lang: "fr",
    icons: [
      { src: "/icon/medium", sizes: "192x192", type: "image/png" },
      { src: "/icon/large", sizes: "512x512", type: "image/png" },
    ],
  };
}
