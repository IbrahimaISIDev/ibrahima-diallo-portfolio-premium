import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    title: "Développeur Full-Stack (Contrat)",
    company: "Saraya Tech Sénégal",
    period: "Décembre 2025 - Présent",
    description:
      "Développement et maintenance évolutive de plateformes industrielles complexes, de la conception à la mise en production.",
    highlights: [
      "Développement complet de modules de suivi GPS temps réel et de gestion de carburant",
      "Conception et implémentation d'APIs REST modulaires avec NestJS et synchronisation WebSockets",
      "Optimisation de la base de données PostgreSQL pour le traitement de flux de données télémétriques",
      "Déploiement et gestion des infrastructures conteneurisées avec Docker et pipelines CI/CD",
    ],
    technologies: ["NestJS", "PostgreSQL", "React", "Docker", "GitHub Actions"],
  },
  {
    title: "Stage Développeur Full-Stack",
    company: "Saraya Tech Sénégal",
    period: "Mars 2025 - Novembre 2025",
    description:
      "Participation au cycle complet de développement au sein d'une équipe agile.",
    highlights: [
      "Développement de l'application mobile 'Driver' (Flutter) pour le suivi des activités de terrain",
      "Mise en place d'interfaces utilisateurs intuitives et intégration des services Backend REST",
      "Modélisation de schémas de données et application des principes du Clean Code et SOLID",
      "Assurance qualité via des tests unitaires et participation active aux revues de code",
    ],
    technologies: ["React", "NestJS", "PostgreSQL", "Flutter"],
  },
  {
    title: "Licence 3 - Génie Logiciel",
    company: "ISI (Institut Supérieur d'Informatique)",
    period: "2025 - Présent (En cours)",
    description:
      "Formation académique approfondie sur les cycles de vie du logiciel et les architectures d'entreprise.",
    highlights: [
      "Conception orientée objet et application des Design Patterns fondamentaux",
      "Conduite de projets informatiques académiques suivant les normes de l'ingénierie logicielle",
      "Analyse et modélisation de systèmes complexes avec UML et Merise",
    ],
    technologies: ["Java", "UML", "SQL", "Architecture Logicielle"],
  },
  {
    title: "Licence 3 - Informatique & Dév. d'Applis",
    company: "UNCHK (Univ. Numérique Cheikh Hamidou Kane)",
    period: "2025 - Présent (En cours)",
    description:
      "Cursus focalisé sur le développement d'applications modernes et les nouvelles technologies numériques.",
    highlights: [
      "Développement web et mobile avancé (React, Flutter, Laravel)",
      "Gestion de bases de données relationnelles et systèmes distribués",
      "Projets pratiques de digitalisation et transformation numérique",
    ],
    technologies: ["React", "PHP/Laravel", "Mobile", "Algorithmie"],
  },
  {
    title: "Apprenant Développeur Web et Mobile",
    company: "Sonatel Academy",
    period: "2024",
    description:
      "Formation intensive (bootcamp) focalisée sur l'opérabilité immédiate et les technologies de pointe.",
    highlights: [
      "Développement d'applications Full-Stack avec l'écosystème React et Node.js",
      "Conception d'applications mobiles cross-platform et initiation aux architectures SPA",
      "Immersion dans les méthodes Agiles (Scrum) et le travail collaboratif sous Git",
      "Application des principes de performance et d'accessibilité web",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
  },
];
