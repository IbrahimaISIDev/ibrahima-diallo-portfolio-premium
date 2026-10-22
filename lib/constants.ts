import { personalInfo } from "@/data/personal";

// Configuration du site. L'identité (nom, contact, réseaux) vient de
// data/personal.ts, seule source de vérité.
export const siteConfig = {
  name: personalInfo.fullName,
  title: `${personalInfo.fullName} - ${personalInfo.title} | ${personalInfo.location}`,
  description: `Portfolio de ${personalInfo.fullName}, développeur Full-Stack spécialisé en React, Next.js, Node.js et Flutter. Basé à ${personalInfo.location}.`,
  // Adresse de production (Vercel). À remplacer si un domaine personnalisé est branché.
  url: "https://ibrahima-devs-portfolio.vercel.app",
  keywords: [
    "développeur full-stack",
    "react",
    "nextjs",
    "nodejs",
    "flutter",
    "angular",
    "java",
    "spring boot",
    "laravel",
    "dakar",
    "sénégal",
    "freelance",
    "portfolio",
  ] as string[],
} as const;
