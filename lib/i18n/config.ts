// Langues du site : le français est servi à la racine (/about), l'anglais sous /en (/en/about).
// next.config.ts réécrit les URL françaises vers le segment app/[lang] (voir rewrites).
export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Texte ou donnée disponible dans chaque langue
export type Localized<T> = Record<Locale, T>;

// URL publique d'un chemin dans une langue : "/about" -> "/about" (fr) ou "/en/about" (en)
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

// Chemin sans préfixe de langue : "/en/about" -> "/about", "/en" -> "/".
// Retire aussi "/fr" : sous une URL réécrite, usePathname() renvoie le chemin interne.
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

// Locale BCP 47 complète (formatage des dates, balises Open Graph)
export const htmlLocale: Localized<string> = { fr: "fr_FR", en: "en_US" };
