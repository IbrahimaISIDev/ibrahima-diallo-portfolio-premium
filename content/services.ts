import type { Localized } from "@/lib/i18n/config";
import type { Translatable } from "./types";

export type ServiceIcon =
  "Monitor" | "Smartphone" | "Server" | "ShoppingCart" | "Palette" | "Cloud";

export interface ServiceContent {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
  icon: ServiceIcon;
  technologies: Translatable[];
}

export const services: ServiceContent[] = [
  {
    id: "web",
    title: { fr: "Développement Web", en: "Web development" },
    description: {
      fr: "Applications web modernes et performantes avec React, Next.js et TypeScript.",
      en: "Modern, fast web applications with React, Next.js and TypeScript.",
    },
    icon: "Monitor",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "mobile",
    title: { fr: "Développement Mobile", en: "Mobile development" },
    description: {
      fr: "Applications mobiles cross-platform avec Flutter et React Native.",
      en: "Cross-platform mobile apps with Flutter and React Native.",
    },
    icon: "Smartphone",
    technologies: ["Flutter", "Dart", "Firebase", "iOS & Android"],
  },
  {
    id: "backend",
    title: { fr: "Backend & API", en: "Backend & APIs" },
    description: {
      fr: "APIs robustes et scalables avec Node.js, NestJS, Spring Boot, Laravel et PostgreSQL.",
      en: "Robust, scalable APIs with Node.js, NestJS, Spring Boot, Laravel and PostgreSQL.",
    },
    icon: "Server",
    technologies: ["NestJS", "Node.js", "Spring Boot", "Laravel", "PostgreSQL", "GraphQL"],
  },
  {
    id: "ecommerce",
    title: { fr: "E-commerce", en: "E-commerce" },
    description: {
      fr: "Plateformes de vente en ligne complètes, sécurisées et optimisées.",
      en: "Complete, secure and optimised online stores.",
    },
    icon: "ShoppingCart",
    technologies: ["Stripe", "WooCommerce", "Next.js Commerce", "CMS"],
  },
  {
    id: "design",
    title: { fr: "UI/UX Design", en: "UI/UX design" },
    description: {
      fr: "Interfaces intuitives et expériences utilisateur centrées sur la conversion.",
      en: "Intuitive interfaces and conversion-focused user experiences.",
    },
    icon: "Palette",
    technologies: [
      "Figma",
      { fr: "Prototypage", en: "Prototyping" },
      "Design Systems",
      "User Testing",
    ],
  },
  {
    id: "devops",
    title: { fr: "Consulting DevOps", en: "DevOps consulting" },
    description: {
      fr: "Mise en production sur serveur VPS Linux, configuration des noms de domaine et des certificats SSL, CI/CD et Docker.",
      en: "Production deployment on Linux VPS servers, domain name and SSL certificate setup, CI/CD and Docker.",
    },
    icon: "Cloud",
    technologies: [
      "VPS Linux",
      "Nginx",
      { fr: "DNS & domaines", en: "DNS & domains" },
      "Docker",
      "GitHub Actions",
      "AWS",
      "Vercel",
    ],
  },
];
