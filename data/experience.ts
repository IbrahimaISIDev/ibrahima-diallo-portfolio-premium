import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    title: "Développeur Full-Stack",
    company: "Saraya Tech",
    period: "2025 - Présent",
    description:
      "Conception et développement de solutions logicielles B2B pour des entreprises sénégalaises et ouest-africaines.",
    highlights: [
      "Développement d'un système de gestion de flotte automobile complet",
      "Mise en place d'architectures microservices avec NestJS et PostgreSQL",
      "Développement d'applications mobiles cross-platform avec Flutter",
      "Intégration CI/CD avec GitHub Actions et Docker",
    ],
    technologies: ["NestJS", "PostgreSQL", "Flutter", "Docker", "GitHub Actions"],
  },
  {
    title: "Fondateur & Lead Developer",
    company: "Teranga Farm ",
    period: "2024",
    description:
      "Création d'une marketplace B2B connectant les producteurs agricoles de Casamance aux transformateurs de Dakar.",
    highlights: [
      "Conception de l'architecture complète de la plateforme e-commerce",
      "Développement front-end avec Next.js et intégration Stripe",
      "Gestion d'équipe et coordination technique du projet",
      "Impact : connecter producteurs ruraux et marché urbain",
    ],
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
  },
  {
    title: "Responsable Technique",
    company: "AEM-UNCHK (PTN)",
    period: "2024",
    description:
      "Leadership technique pour la digitalisation de l'Association des Étudiants Musulmans de l'UN-CHK.",
    highlights: [
      "Développement d'une plateforme communautaire avec React et Firebase",
      "Formation et encadrement d'une équipe de développeurs juniors",
      "Mise en place des processus de développement et bonnes pratiques",
      "Digitalisation complète des processus associatifs",
    ],
    technologies: ["React", "Firebase", "Tailwind CSS", "Git"],
  },
  {
    title: "Apprenant Développeur",
    company: "Sonatel Academy",
    period: "2024",
    description:
      "Formation intensive en développement web et mobile, avec focus sur les technologies modernes.",
    highlights: [
      "Formation en React, Node.js, et développement Full-Stack",
      "Réalisation de projets pratiques en équipe (méthodes agiles)",
      "Apprentissage approfondi de TypeScript et architectures modernes",
      "Projet de fin de formation : système de gestion clinique (MIMAP)",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
  },
];
