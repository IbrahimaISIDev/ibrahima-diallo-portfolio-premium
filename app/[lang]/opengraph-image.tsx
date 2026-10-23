import { getContent } from "@/content";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ogSize, renderOgImage } from "@/lib/og";

// Image de partage (LinkedIn, WhatsApp, X…) de chaque langue, générée au build
export const alt = "Ibrahima Sory Diallo — Portfolio";
export const size = ogSize;
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const { profile, featuredStack } = getContent(locale);

  return renderOgImage({
    title: profile.fullName,
    accent: profile.shortHeadline,
    details: featuredStack.slice(0, 5).join(" · "),
    footer: `${profile.location} · ${getDictionary(locale).hero.available}`,
  });
}
