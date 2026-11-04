import type { Localized } from "@/lib/i18n/config";
import type { Translatable } from "./types";

export interface ExperienceContent {
  // Identifiant stable, utilisé comme clé React
  id: string;
  // Sépare le parcours professionnel de la formation
  type: "work" | "education";
  title: Localized<string>;
  organization: Translatable;
  // Mois au format AAAA-MM ; "present" pour une activité en cours
  start: string;
  end: string | "present";
  description: Localized<string>;
  highlights: Localized<string>[];
  technologies: Translatable[];
}

export const experiences: ExperienceContent[] = [
  // Parcours professionnel
  {
    id: "nixacom",
    type: "work",
    title: { fr: "Développeur Web/Mobile", en: "Web/Mobile Developer" },
    organization: "Nixacom",
    start: "2026-06",
    end: "present",
    description: {
      fr: "Conception et développement d'applications web et mobiles performantes, de la phase d'architecture à la mise en production, au sein d'une équipe technique à distance.",
      en: "Designing and building high-performance web and mobile applications, from architecture to production, within a remote engineering team.",
    },
    highlights: [
      {
        fr: "Maintenance évolutive et corrective des solutions existantes pour garantir une expérience utilisateur optimale",
        en: "Evolutive and corrective maintenance of existing products to keep the user experience at its best",
      },
      {
        fr: "Collaboration à distance au sein de l'équipe technique, avec des outils de gestion de projet et de versioning (Git)",
        en: "Remote collaboration within the engineering team, using project management and version control tools (Git)",
      },
      {
        fr: "Optimisation des performances et de la sécurité des applications pour répondre aux standards du marché",
        en: "Improving application performance and security to meet industry standards",
      },
      {
        fr: "Veille technologique constante pour intégrer les meilleures pratiques du développement moderne",
        en: "Continuous technology watch to bring in modern development best practices",
      },
    ],
    technologies: [
      { fr: "Applications web", en: "Web applications" },
      { fr: "Applications mobiles", en: "Mobile applications" },
      "Git",
      { fr: "Travail à distance", en: "Remote work" },
    ],
  },
  {
    id: "tekkil",
    type: "work",
    title: { fr: "Développeur Full-Stack (Freelance)", en: "Full-Stack Developer (Freelance)" },
    organization: { fr: "Tekkil — Préparation aux concours", en: "Tekkil — Exam preparation" },
    start: "2026-02",
    end: "present",
    description: {
      fr: "Conception et développement, en tant que seul développeur de la V1 à la mise en production, d'une plateforme SaaS de préparation aux concours au Sénégal : contenu pédagogique protégé, QCM chronométrés, flashcards SM-2 et examens blancs.",
      en: "Designed and built, as the sole developer from V1 to production, a SaaS platform to prepare for competitive exams in Senegal: protected learning content, timed quizzes, SM-2 flashcards and mock exams.",
    },
    highlights: [
      {
        fr: "Architecture en trois projets : API NestJS, back-office Next.js 15 et application Flutter Android/iOS",
        en: "Three-project architecture: NestJS API, Next.js 15 back office and Flutter Android/iOS app",
      },
      {
        fr: "Paiement Mobile Money (Orange Money, Wave) via le Strategy Pattern, avec webhooks et validation manuelle par l'administrateur",
        en: "Mobile Money payments (Orange Money, Wave) through the Strategy pattern, with webhooks and manual admin approval",
      },
      {
        fr: "Protection DRM du contenu : FLAG_SECURE Android, overlay SwiftUI iOS, filigrane dynamique, streaming HLS AES-128 et URLs signées R2",
        en: "DRM content protection: Android FLAG_SECURE, iOS SwiftUI overlay, dynamic watermark, AES-128 HLS streaming and signed R2 URLs",
      },
      {
        fr: "Authentification JWT avec révocation multi-appareil, refresh token rotatif sur 7 jours et rate limiting des routes sensibles",
        en: "JWT authentication with multi-device revocation, 7-day rotating refresh tokens and rate limiting on sensitive routes",
      },
      {
        fr: "Conception offline/online : contenus protégés, QCM et flashcards utilisables avec une connexion limitée",
        en: "Offline/online design: protected content, quizzes and flashcards usable on a poor connection",
      },
    ],
    technologies: ["NestJS", "Next.js", "Flutter", "HLS", "Mobile Money"],
  },
  {
    id: "agripont",
    type: "work",
    title: { fr: "Co-fondateur & Développeur Full-Stack", en: "Co-founder & Full-Stack Developer" },
    organization: "AgriPont",
    start: "2026-02",
    end: "2026-08",
    description: {
      fr: "Co-fondation et développement complet d'une plateforme AgriTech de vente en circuit court, de l'idée à la mise en production.",
      en: "Co-founded and fully built a short-supply-chain AgriTech platform, from idea to production.",
    },
    highlights: [
      {
        fr: "Architecture 3-tiers : React.js et Tailwind CSS, API REST NestJS en TypeScript avec authentification JWT, PostgreSQL et TypeORM",
        en: "Three-tier architecture: React.js and Tailwind CSS, a TypeScript NestJS REST API with JWT authentication, PostgreSQL and TypeORM",
      },
      {
        fr: "Moteur de commandes groupées : agrégation de la demande par fenêtre de commande et gestion du cycle producteur → consommateur",
        en: "Grouped-ordering engine: demand aggregated per ordering window, managing the producer → consumer cycle",
      },
      {
        fr: "Back-office administrateur complet : catalogue, clients, stock et pilotage des indicateurs",
        en: "Complete admin back office: catalogue, customers, stock and KPI tracking",
      },
      {
        fr: "Déploiement en production : conteneurisation Docker, hébergement VPS, reverse proxy Nginx et certificat SSL",
        en: "Production deployment: Docker containers, VPS hosting, Nginx reverse proxy and SSL certificate",
      },
      {
        fr: "Pilotage en Scrum en autonomie complète (Product Owner, Scrum Master et développeur) ; mémoire de fin de cycle soutenu à l'ISI",
        en: "Run in Scrum fully autonomously (Product Owner, Scrum Master and developer); final-year thesis defended at ISI",
      },
    ],
    technologies: ["React", "NestJS", "PostgreSQL", "TypeORM", "Docker", "Nginx"],
  },
  {
    id: "saraya-tech-fullstack",
    type: "work",
    title: { fr: "Développeur Full-Stack", en: "Full-Stack Developer" },
    organization: { fr: "Saraya Tech Sénégal", en: "Saraya Tech Senegal" },
    start: "2025-10",
    end: "2026-06",
    description: {
      fr: "Développement d'applications web et mobiles complètes de A à Z : analyse, architecture, développement et déploiement.",
      en: "Built complete web and mobile applications end to end: analysis, architecture, development and deployment.",
    },
    highlights: [
      {
        fr: "Conception d'APIs REST robustes avec NestJS et Node.js, authentification JWT et sécurité applicative",
        en: "Designed robust REST APIs with NestJS and Node.js, JWT authentication and application security",
      },
      {
        fr: "Développement frontend React, TypeScript et Next.js, et mobile Flutter avec synchronisation offline/online",
        en: "Frontend development with React, TypeScript and Next.js, and Flutter mobile apps with offline/online sync",
      },
      {
        fr: "Mise en place de pipelines CI/CD automatisés et de déploiement continu",
        en: "Set up automated CI/CD pipelines and continuous deployment",
      },
    ],
    technologies: ["NestJS", "Node.js", "React", "Next.js", "Flutter", "CI/CD"],
  },
  {
    id: "saraya-tech-stage",
    type: "work",
    title: { fr: "Stage Développeur Front-End", en: "Front-End Developer Intern" },
    organization: { fr: "Saraya Tech Sénégal", en: "Saraya Tech Senegal" },
    start: "2025-03",
    end: "2025-10",
    description: {
      fr: "Participation au développement d'applications web avec React et Next.js au sein d'une équipe agile.",
      en: "Contributed to web applications built with React and Next.js within an agile team.",
    },
    highlights: [
      {
        fr: "Intégration d'API REST et gestion des données côté frontend",
        en: "Integrated REST APIs and handled frontend data",
      },
      { fr: "Création de composants UI réutilisables", en: "Built reusable UI components" },
      {
        fr: "Correction de bugs et amélioration de l'expérience utilisateur",
        en: "Fixed bugs and improved the user experience",
      },
      {
        fr: "Collaboration en équipe avec Git, contribution au déploiement et aux tests des applications",
        en: "Team collaboration with Git, contributing to deployment and testing",
      },
    ],
    technologies: ["React", "Next.js", "TypeScript", "Git"],
  },

  // Formation
  {
    id: "isi-licence-gl",
    type: "education",
    title: {
      fr: "Licence 3 en Informatique – Génie Logiciel",
      en: "Bachelor's in Computer Science – Software Engineering",
    },
    organization: "ISI (Institut Supérieur d'Informatique)",
    start: "2025-11",
    end: "2026-08",
    description: {
      fr: "Licence en Génie Logiciel obtenue avec la Mention Bien, après un parcours récompensé par un Prix d'Excellence.",
      en: "Software Engineering degree awarded with Honours, after a path recognised by an Award of Excellence.",
    },
    highlights: [
      { fr: "Mention Bien", en: "Graduated with Honours" },
      {
        fr: "Prix d'Excellence en Licence 2 : 3ᵉ de tout le campus avec 17,37/20 de moyenne",
        en: "Award of Excellence in second year: ranked 3rd across the whole campus with a 17.37/20 average",
      },
      {
        fr: "Mémoire de fin de cycle : AgriPont, plateforme AgriTech déployée en production",
        en: "Final-year thesis: AgriPont, an AgriTech platform deployed to production",
      },
    ],
    technologies: [
      { fr: "Génie logiciel", en: "Software engineering" },
      "UML",
      "SQL",
      { fr: "Architecture logicielle", en: "Software architecture" },
    ],
  },
  {
    id: "unchk-licence-info",
    type: "education",
    title: {
      fr: "Licence 3 en Informatique (Développement d'Applications)",
      en: "Bachelor's in Computer Science (Application Development)",
    },
    organization: "UNCHK (Université Numérique Cheikh Hamidou Kane, ex-UVS)",
    start: "2025-12",
    end: "present",
    description: {
      fr: "Cursus focalisé sur le développement d'applications modernes et les nouvelles technologies numériques.",
      en: "Programme focused on modern application development and new digital technologies.",
    },
    highlights: [
      {
        fr: "Moyenne cumulative de 15,67/20 sur les 4 premiers semestres",
        en: "15.67/20 cumulative average over the first four semesters",
      },
      {
        fr: "Développement web et mobile avancé (React, Flutter, Laravel)",
        en: "Advanced web and mobile development (React, Flutter, Laravel)",
      },
      {
        fr: "Bases de données relationnelles et systèmes distribués",
        en: "Relational databases and distributed systems",
      },
    ],
    technologies: ["React", "Flutter", "PHP/Laravel", { fr: "Algorithmique", en: "Algorithms" }],
  },
  {
    id: "sonatel-academy",
    type: "education",
    title: {
      fr: "Formation certifiante Développeur Web/Mobile",
      en: "Web/Mobile Developer Certification Programme",
    },
    organization: "École du Code – Orange Digital Center (Sonatel Academy)",
    start: "2024-02",
    end: "2024-11",
    description: {
      fr: "Formation intensive certifiante, validée avec la note maximale de 20/20 (Mention Excellent).",
      en: "Intensive certification programme, completed with the top mark of 20/20 (highest distinction).",
    },
    highlights: [
      {
        fr: "Certification validée avec 20/20, Mention Excellent",
        en: "Certified with 20/20, highest distinction",
      },
      {
        fr: "Développement d'applications Full-Stack avec l'écosystème React et Node.js",
        en: "Full-stack application development with the React and Node.js ecosystem",
      },
      {
        fr: "Méthodes agiles (Scrum) et travail collaboratif sous Git",
        en: "Agile methods (Scrum) and collaborative work with Git",
      },
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
  },
  {
    id: "anglais-technique",
    type: "education",
    title: { fr: "Formation en anglais technique", en: "Technical English course" },
    organization: {
      fr: "Anglais orienté développement logiciel et communication IT",
      en: "English for software development and IT communication",
    },
    start: "2025-03",
    end: "2025-10",
    description: {
      fr: "Anglais technique appliqué au développement logiciel et à la communication dans les équipes IT.",
      en: "Technical English applied to software development and communication in IT teams.",
    },
    highlights: [],
    technologies: [],
  },
  {
    id: "baccalaureat",
    type: "education",
    title: {
      fr: "Baccalauréat Scientifique (Série S2)",
      en: "Scientific Baccalaureate (S2 series)",
    },
    organization: "Lycée Blaise Diagne",
    start: "2022-07",
    end: "2022-07",
    description: {
      fr: "Baccalauréat scientifique, série S2.",
      en: "Scientific baccalaureate, S2 series.",
    },
    highlights: [],
    technologies: [],
  },
];
