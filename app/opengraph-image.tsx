import { personalInfo } from "@/data/personal";
import { siteConfig } from "@/lib/constants";
import { ogSize, renderOgImage } from "@/lib/og";

// Image de partage (LinkedIn, WhatsApp, X…) générée au build
export const alt = siteConfig.title;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    title: personalInfo.fullName,
    accent: personalInfo.headline,
    details: "React · Next.js · NestJS · Flutter · PostgreSQL",
    footer: personalInfo.location,
  });
}
