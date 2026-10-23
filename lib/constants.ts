import { profile } from "@/content/profile";

// Configuration du site. L'identité vient de content/profile.ts ; les titres et
// descriptions de chaque langue sont dans lib/i18n/dictionaries.ts.
export const siteConfig = {
  name: profile.fullName,
  // Adresse de production (Vercel). À remplacer si un domaine personnalisé est branché.
  url: "https://ibrahima-devs-portfolio.vercel.app",
  keywords: [
    "développeur full-stack",
    "full-stack developer",
    "nestjs",
    "nextjs",
    "react",
    "flutter",
    "spring boot",
    "laravel",
    "devops",
    "dakar",
    "sénégal",
    "senegal",
    "freelance",
    "portfolio",
  ] as string[],
} as const;
