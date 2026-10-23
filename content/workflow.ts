import type { Localized } from "@/lib/i18n/config";

export type WorkflowIcon = "Search" | "Layers" | "Code2" | "Rocket";

export interface WorkflowStepContent {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
  icon: WorkflowIcon;
  tasks: Localized<string>[];
}

export const workflowSteps: WorkflowStepContent[] = [
  {
    id: "discovery",
    title: { fr: "Découverte", en: "Discovery" },
    description: {
      fr: "Comprendre vos objectifs, vos utilisateurs et les contraintes techniques, puis définir ensemble le périmètre du projet.",
      en: "Understand your goals, your users and the technical constraints, then define the project scope together.",
    },
    icon: "Search",
    tasks: [
      { fr: "Étude de faisabilité technique", en: "Technical feasibility study" },
      { fr: "User stories", en: "User stories" },
      { fr: "Choix de la stack", en: "Stack selection" },
    ],
  },
  {
    id: "architecture",
    title: { fr: "Architecture", en: "Architecture" },
    description: {
      fr: "Concevoir une architecture robuste et évolutive, pensée pour la performance, la sécurité et la maintenance.",
      en: "Design a robust, scalable architecture built for performance, security and maintainability.",
    },
    icon: "Layers",
    tasks: [
      { fr: "Modèle de données", en: "Data model" },
      { fr: "Conception de l'API", en: "API design" },
      { fr: "Maquettes UI/UX", en: "UI/UX mock-ups" },
    ],
  },
  {
    id: "development",
    title: { fr: "Développement", en: "Development" },
    description: {
      fr: "Livrer par itérations courtes, avec tests, revues de code et intégration continue.",
      en: "Ship in short iterations, with tests, code reviews and continuous integration.",
    },
    icon: "Code2",
    tasks: [
      { fr: "Frontend, backend et mobile", en: "Frontend, backend and mobile" },
      { fr: "Tests unitaires et d'intégration", en: "Unit and integration tests" },
      { fr: "CI/CD", en: "CI/CD" },
    ],
  },
  {
    id: "launch",
    title: { fr: "Lancement", en: "Launch" },
    description: {
      fr: "Mettre en production sur une infrastructure fiable, optimiser, puis accompagner après le lancement.",
      en: "Deploy to a reliable infrastructure, optimise, then support you after launch.",
    },
    icon: "Rocket",
    tasks: [
      { fr: "Déploiement VPS ou Vercel", en: "VPS or Vercel deployment" },
      { fr: "Performance et SEO", en: "Performance and SEO" },
      { fr: "Maintenance et support", en: "Maintenance and support" },
    ],
  },
];
