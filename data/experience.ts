import type { Experience } from "@/types";

export const experiences: Experience[] = [
  // Parcours professionnel
  {
    id: "nixacom",
    type: "work",
    title: "Développeur Web/Mobile",
    company: "Nixacom",
    period: "Juin 2026 - Présent",
    description:
      "Conception et développement d'applications web et mobiles performantes, de la phase d'architecture à la mise en production, au sein d'une équipe technique à distance.",
    highlights: [
      "Maintenance évolutive et corrective des solutions existantes pour garantir une expérience utilisateur optimale",
      "Collaboration à distance au sein de l'équipe technique, avec des outils de gestion de projet et de versioning (Git)",
      "Optimisation des performances et de la sécurité des applications pour répondre aux standards du marché",
      "Veille technologique constante pour intégrer les meilleures pratiques du développement moderne",
    ],
    technologies: ["Applications web", "Applications mobiles", "Git", "Travail à distance"],
  },
  {
    id: "tekkil",
    type: "work",
    title: "Développeur Full-Stack (Freelance)",
    company: "Tekkil — Préparation aux concours",
    period: "Février 2026 - Présent",
    description:
      "Conception et développement, en tant que seul développeur de la V1 à la mise en production, d'une plateforme SaaS de préparation aux concours au Sénégal : contenu pédagogique protégé, QCM chronométrés, flashcards SM-2 et examens blancs.",
    highlights: [
      "Architecture en trois projets : API NestJS, back-office Next.js 15 et application Flutter Android/iOS",
      "Paiement Mobile Money (Orange Money, Wave) via le Strategy Pattern, avec webhooks et validation manuelle par l'administrateur",
      "Protection DRM du contenu : FLAG_SECURE Android, overlay SwiftUI iOS, filigrane dynamique, streaming HLS AES-128 et URLs signées R2",
      "Authentification JWT avec révocation multi-appareil, refresh token rotatif sur 7 jours et rate limiting des routes sensibles",
      "Conception offline/online : contenus protégés, QCM et flashcards utilisables avec une connexion limitée",
    ],
    technologies: ["NestJS", "Next.js", "Flutter", "HLS", "Mobile Money"],
  },
  {
    id: "agripont",
    type: "work",
    title: "Co-fondateur & Développeur Full-Stack",
    company: "AgriPont",
    period: "Février 2026 - Août 2026",
    description:
      "Co-fondation et développement complet d'une plateforme AgriTech de vente en circuit court, de l'idée à la mise en production.",
    highlights: [
      "Architecture 3-tiers : React.js et Tailwind CSS, API REST NestJS en TypeScript avec authentification JWT, PostgreSQL et TypeORM",
      "Moteur de commandes groupées : agrégation de la demande par fenêtre de commande et gestion du cycle producteur → consommateur",
      "Back-office administrateur complet : catalogue, clients, stock et pilotage des indicateurs",
      "Déploiement en production : conteneurisation Docker, hébergement VPS, reverse proxy Nginx et certificat SSL",
      "Pilotage en Scrum en autonomie complète (Product Owner, Scrum Master et développeur) ; mémoire de fin de cycle soutenu à l'ISI",
    ],
    technologies: ["React", "NestJS", "PostgreSQL", "TypeORM", "Docker", "Nginx"],
  },
  {
    id: "saraya-tech-fullstack",
    type: "work",
    title: "Développeur Full-Stack",
    company: "Saraya Tech Sénégal",
    period: "Octobre 2025 - Juin 2026",
    description:
      "Développement d'applications web et mobiles complètes de A à Z : analyse, architecture, développement et déploiement.",
    highlights: [
      "Conception d'APIs REST robustes avec NestJS et Node.js, authentification JWT et sécurité applicative",
      "Développement frontend React, TypeScript et Next.js, et mobile Flutter avec synchronisation offline/online",
      "Mise en place de pipelines CI/CD automatisés et de déploiement continu",
    ],
    technologies: ["NestJS", "Node.js", "React", "Next.js", "Flutter", "CI/CD"],
  },
  {
    id: "saraya-tech-stage",
    type: "work",
    title: "Stage Développeur Front-End",
    company: "Saraya Tech Sénégal",
    period: "Mars 2025 - Octobre 2025",
    description:
      "Participation au développement d'applications web avec React et Next.js au sein d'une équipe agile.",
    highlights: [
      "Intégration d'API REST et gestion des données côté frontend",
      "Création de composants UI réutilisables",
      "Correction de bugs et amélioration de l'expérience utilisateur",
      "Collaboration en équipe avec Git, contribution au déploiement et aux tests des applications",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Git"],
  },

  // Formation
  {
    id: "isi-licence-gl",
    type: "education",
    title: "Licence 3 en Informatique – Génie Logiciel",
    company: "ISI (Institut Supérieur d'Informatique)",
    period: "Novembre 2025 - Août 2026",
    description:
      "Licence en Génie Logiciel obtenue avec la Mention Bien, après un parcours récompensé par un Prix d'Excellence.",
    highlights: [
      "Mention Bien",
      "Prix d'Excellence en Licence 2 : 3ᵉ de tout le campus avec 17,37/20 de moyenne",
      "Mémoire de fin de cycle : AgriPont, plateforme AgriTech déployée en production",
    ],
    technologies: ["Génie logiciel", "UML", "SQL", "Architecture logicielle"],
  },
  {
    id: "unchk-licence-info",
    type: "education",
    title: "Licence 3 en Informatique (Développement d'Applications)",
    company: "UNCHK (Université Numérique Cheikh Hamidou Kane, ex-UVS)",
    period: "Décembre 2025 - Présent",
    description:
      "Cursus focalisé sur le développement d'applications modernes et les nouvelles technologies numériques.",
    highlights: [
      "Moyenne cumulative de 15,67/20 sur les 4 premiers semestres",
      "Développement web et mobile avancé (React, Flutter, Laravel)",
      "Bases de données relationnelles et systèmes distribués",
    ],
    technologies: ["React", "Flutter", "PHP/Laravel", "Algorithmique"],
  },
  {
    id: "sonatel-academy",
    type: "education",
    title: "Formation certifiante Développeur Web/Mobile",
    company: "École du Code – Orange Digital Center (Sonatel Academy)",
    period: "Février 2024 - Novembre 2024",
    description:
      "Formation intensive certifiante, validée avec la note maximale de 20/20 (Mention Excellent).",
    highlights: [
      "Certification validée avec 20/20, Mention Excellent",
      "Développement d'applications Full-Stack avec l'écosystème React et Node.js",
      "Méthodes agiles (Scrum) et travail collaboratif sous Git",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
  },
  {
    id: "anglais-technique",
    type: "education",
    title: "Formation en anglais technique",
    company: "Anglais orienté développement logiciel et communication IT",
    period: "Mars 2025 - Octobre 2025",
    description:
      "Anglais technique appliqué au développement logiciel et à la communication dans les équipes IT.",
    highlights: [],
    technologies: [],
  },
  {
    id: "baccalaureat",
    type: "education",
    title: "Baccalauréat Scientifique (Série S2)",
    company: "Lycée Blaise Diagne",
    period: "Juillet 2022",
    description: "Baccalauréat scientifique, série S2.",
    highlights: [],
    technologies: [],
  },
];
