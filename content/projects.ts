import type { Localized } from "@/lib/i18n/config";
import type { Translatable } from "./types";

// Catégorie : identifiant stable (filtres) et libellé traduit
export const projectCategories = {
  edtech: { fr: "EdTech", en: "EdTech" },
  agritech: { fr: "AgriTech", en: "AgriTech" },
  health: { fr: "Santé", en: "Health" },
  media: { fr: "Média", en: "Media" },
  community: { fr: "Communauté", en: "Community" },
  realestate: { fr: "Immobilier", en: "Real estate" },
  ecommerce: { fr: "E-commerce", en: "E-commerce" },
  b2b: { fr: "B2B", en: "B2B" },
  web: { fr: "Web", en: "Web" },
} satisfies Record<string, Localized<string>>;

export type ProjectCategory = keyof typeof projectCategories;

export interface ProjectContent {
  slug: string;
  title: Translatable;
  description: Localized<string>;
  image: string;
  tags: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  impact: Localized<string>;
  architecture?: Localized<string>[];
  challenges?: Localized<string>[];
  codeSnippet?: string;
  // Mis en avant sur l'accueil (ordre d'apparition)
  featured?: boolean;
}

export const projects: ProjectContent[] = [
  {
    slug: "tekkil",
    title: "Tekkil",
    featured: true,
    description: {
      fr: "Plateforme SaaS de préparation aux concours nationaux au Sénégal : contenus pédagogiques protégés, QCM chronométrés, flashcards à répétition espacée et examens blancs.",
      en: "SaaS platform to prepare for national competitive exams in Senegal: protected learning content, timed quizzes, spaced-repetition flashcards and mock exams.",
    },
    image: "/images/projects/tekkil.webp",
    tags: ["NestJS", "Next.js", "Flutter", "HLS", "Mobile Money"],
    category: "edtech",
    liveUrl: "https://tekkilapp.com",
    impact: {
      fr: "Seul développeur de la V1 à la mise en production : API, back-office et application mobile Android/iOS",
      en: "Sole developer from V1 to production: API, back office and Android/iOS mobile app",
    },
    architecture: [
      {
        fr: "API NestJS partagée par le back-office et l'application mobile",
        en: "NestJS API shared by the back office and the mobile app",
      },
      {
        fr: "Back-office Next.js 15 pour la gestion des contenus, des abonnés et des paiements",
        en: "Next.js 15 back office to manage content, subscribers and payments",
      },
      {
        fr: "Application Flutter Android/iOS utilisable hors ligne (PDF, audio, vidéo HLS, QCM, flashcards)",
        en: "Flutter Android/iOS app that works offline (PDF, audio, HLS video, quizzes, flashcards)",
      },
      {
        fr: "Paiement Mobile Money (Orange Money, Wave) via le Strategy Pattern, avec webhooks et validation manuelle par l'administrateur",
        en: "Mobile Money payments (Orange Money, Wave) through the Strategy pattern, with webhooks and manual admin approval",
      },
    ],
    challenges: [
      {
        fr: "Protéger le contenu payant : FLAG_SECURE sur Android, overlay SwiftUI sur iOS, filigrane dynamique (CustomPainter), streaming HLS chiffré en AES-128 et URLs signées Cloudflare R2",
        en: "Protecting paid content: FLAG_SECURE on Android, a SwiftUI overlay on iOS, a dynamic watermark (CustomPainter), AES-128 encrypted HLS streaming and signed Cloudflare R2 URLs",
      },
      {
        fr: "Sécuriser les sessions : JWT avec révocation multi-appareil par session en base, refresh token rotatif sur 7 jours et rate limiting des routes sensibles",
        en: "Securing sessions: JWT with multi-device revocation through database sessions, 7-day rotating refresh tokens and rate limiting on sensitive routes",
      },
      {
        fr: "Permettre de réviser avec une connexion limitée : contenus protégés, QCM et flashcards (algorithme SM-2) disponibles hors ligne",
        en: "Studying on a poor connection: protected content, quizzes and flashcards (SM-2 algorithm) available offline",
      },
    ],
  },
  {
    slug: "agripont",
    title: "AgriPont",
    featured: true,
    description: {
      fr: "Plateforme AgriTech de vente en circuit court : les fruits et légumes de Casamance commandés en groupe et livrés à Dakar.",
      en: "Short-supply-chain AgriTech platform: fruit and vegetables from Casamance, ordered in groups and delivered to Dakar.",
    },
    image: "/images/projects/agripont.webp",
    tags: ["React", "NestJS", "PostgreSQL", "TypeORM", "Docker"],
    category: "agritech",
    liveUrl: "https://agripont.com",
    impact: {
      fr: "Co-fondée et déployée en production ; mémoire de fin de cycle soutenu à l'ISI",
      en: "Co-founded and deployed to production; final-year thesis defended at ISI",
    },
    architecture: [
      {
        fr: "Architecture 3-tiers : React.js et Tailwind CSS, API REST NestJS en TypeScript, PostgreSQL avec TypeORM",
        en: "Three-tier architecture: React.js and Tailwind CSS, a TypeScript NestJS REST API, PostgreSQL with TypeORM",
      },
      { fr: "Authentification JWT", en: "JWT authentication" },
      {
        fr: "Back-office d'administration : catalogue, clients, stock et pilotage des indicateurs",
        en: "Admin back office: catalogue, customers, stock and KPI tracking",
      },
      {
        fr: "Production conteneurisée avec Docker sur VPS, reverse proxy Nginx et certificat SSL",
        en: "Containerised production with Docker on a VPS, Nginx reverse proxy and SSL certificate",
      },
    ],
    challenges: [
      {
        fr: "Concevoir le moteur de commandes groupées : agrégation de la demande par fenêtre de commande et gestion du cycle producteur → consommateur",
        en: "Designing the grouped-ordering engine: aggregating demand per ordering window and managing the producer → consumer cycle",
      },
      {
        fr: "Piloter le projet en Scrum en autonomie complète, en cumulant les rôles de Product Owner, Scrum Master et développeur",
        en: "Running the project in Scrum fully autonomously, combining the Product Owner, Scrum Master and developer roles",
      },
    ],
  },
  {
    slug: "mimap",
    title: "MIMAP",
    featured: true,
    description: {
      fr: "Système de gestion complet pour une clinique médicale en Mauritanie. Digitalisation des dossiers patients, rendez-vous et facturation.",
      en: "Complete management system for a medical clinic in Mauritania: digital patient records, appointments and billing.",
    },
    image: "/images/projects/mimap.webp",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    category: "health",
    liveUrl: "https://mimapeds.com",
    impact: {
      fr: "Digitalisation complète d'une clinique médicale en Mauritanie",
      en: "Full digital transformation of a medical clinic in Mauritania",
    },
    architecture: [
      {
        fr: "Architecture client-serveur avec API REST",
        en: "Client-server architecture with a REST API",
      },
      {
        fr: "Gestion d'état avec React Context et Hooks",
        en: "State management with React Context and Hooks",
      },
      {
        fr: "Persistance des données sécurisée sur PostgreSQL",
        en: "Secure data persistence on PostgreSQL",
      },
      { fr: "Authentification basée sur JWT", en: "JWT-based authentication" },
    ],
    challenges: [
      {
        fr: "Gestion confidentielle et sécurisée des dossiers médicaux",
        en: "Confidential and secure handling of medical records",
      },
      {
        fr: "Optimisation de la recherche de patients parmi des milliers d'entrées",
        en: "Fast patient search across thousands of records",
      },
      {
        fr: "Interface utilisateur simplifiée pour le personnel soignant",
        en: "A simplified interface for medical staff",
      },
    ],
    codeSnippet: `const searchPatient = async (query) => {
  const result = await db.patients.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { ninu: { contains: query } }
      ]
    },
    take: 10
  });
  return result;
};`,
  },
  {
    slug: "abou-maryam-tv",
    title: "Abu Maryam TV",
    featured: true,
    description: {
      fr: "Plateforme éducative d'Oustaz Niang Mbaye : cours, conférences et khoutbas en wolof et en arabe, en direct chaque vendredi et à la demande.",
      en: "Educational platform of Oustaz Niang Mbaye: lessons, lectures and sermons in Wolof and Arabic, live every Friday and on demand.",
    },
    image: "/images/projects/abou-maryam.webp",
    tags: ["Next.js", "PWA"],
    category: "media",
    liveUrl: "https://abou-maryam.com",
    impact: {
      fr: "Enseignements accessibles en direct et à la demande, installable comme application",
      en: "Teachings available live and on demand, installable as an app",
    },
  },
  {
    slug: "shaolin-senegal",
    title: "Shaolin Si Sénégal (ADSS)",
    description: {
      fr: "Site officiel de l'Association Disciples Shaolin Si Sénégal : actualités, compétitions, galerie, carte des clubs et affiliation en ligne.",
      en: "Official website of the Association Disciples Shaolin Si Sénégal: news, competitions, gallery, club map and online membership.",
    },
    image: "/images/projects/shaolin.webp",
    tags: ["Next.js"],
    category: "community",
    liveUrl: "https://shaolin-senegal.com",
    impact: {
      fr: "Présence en ligne officielle et affiliation des membres pour l'association nationale",
      en: "Official online presence and member sign-up for the national association",
    },
  },
  {
    slug: "sn-immo",
    title: "SN Immo",
    description: {
      fr: "Site d'agence immobilière à Dakar : recherche de biens à l'achat ou à la location par type, quartier et budget.",
      en: "Real estate agency website in Dakar: search properties to buy or rent by type, neighbourhood and budget.",
    },
    image: "/images/projects/sn-immo.webp",
    tags: ["Next.js"],
    category: "realestate",
    liveUrl: "https://sn-immo.vercel.app",
    impact: {
      fr: "Recherche de biens immobiliers par critères pour une agence dakaroise",
      en: "Criteria-based property search for a Dakar agency",
    },
  },
  {
    slug: "fily-mode-royale",
    title: "Fily Mode Royale",
    description: {
      fr: "Boutique en ligne de prêt-à-porter féminin : catalogue, nouveautés, promotions et panier.",
      en: "Online women's fashion store: catalogue, new arrivals, sales and cart.",
    },
    image: "/images/projects/fily-mode-royale.webp",
    tags: ["React", "Vite"],
    category: "ecommerce",
    liveUrl: "https://filymoderoyale.com",
    impact: {
      fr: "Vente en ligne d'une marque de mode sénégalaise",
      en: "Online sales for a Senegalese fashion brand",
    },
  },
  {
    slug: "gestion-flotte",
    title: { fr: "Gestion de Flotte", en: "Fleet Management" },
    description: {
      fr: "Solution B2B pour Saraya Tech permettant d'optimiser la gestion de flottes automobiles avec suivi en temps réel.",
      en: "B2B solution for Saraya Tech to optimise vehicle fleet management with real-time tracking.",
    },
    image: "/images/projects/flotte.webp",
    tags: ["NestJS", "PostgreSQL", "Flutter", "Docker"],
    category: "b2b",
    impact: {
      fr: "Optimisation de la gestion de flottes automobiles",
      en: "More efficient vehicle fleet management",
    },
    architecture: [
      {
        fr: "Backend découplé avec NestJS (architecture modulaire)",
        en: "Decoupled NestJS backend (modular architecture)",
      },
      {
        fr: "Application mobile cross-platform avec Flutter",
        en: "Cross-platform mobile app with Flutter",
      },
      {
        fr: "Infrastructure conteneurisée avec Docker",
        en: "Containerised infrastructure with Docker",
      },
      {
        fr: "Intégration temps réel avec WebSockets",
        en: "Real-time integration with WebSockets",
      },
    ],
    challenges: [
      {
        fr: "Synchronisation des données en temps réel pour le suivi GPS",
        en: "Real-time data synchronisation for GPS tracking",
      },
      {
        fr: "Gestion de gros volumes de logs de trajet rattachés aux véhicules",
        en: "Handling large volumes of trip logs attached to vehicles",
      },
      {
        fr: "Calcul complexe de la consommation de carburant et de la maintenance",
        en: "Complex fuel consumption and maintenance calculations",
      },
    ],
  },
  {
    slug: "aem-unchk",
    title: "AEM-UNCHK Connect",
    description: {
      fr: "Plateforme communautaire digitalisant l'Association des Étudiants Musulmans de l'UN-CHK.",
      en: "Community platform digitalising the Muslim Students' Association of UN-CHK.",
    },
    image: "/images/projects/aem-unchk.webp",
    tags: ["React", "Firebase", "Tailwind CSS"],
    category: "community",
    liveUrl: "https://aem-unchk-connect.vercel.app",
    impact: {
      fr: "Digitalisation de l'Association des Étudiants Musulmans de l'UN-CHK",
      en: "Digital platform for the Muslim Students' Association of UN-CHK",
    },
  },
  {
    slug: "workspace-ln-entreprise",
    title: "Workspace L&N Entreprise",
    description: {
      fr: "Espace d'administration interne de L&N Entreprise, réservé à ses administrateurs.",
      en: "Internal administration workspace of L&N Entreprise, restricted to its administrators.",
    },
    image: "/images/projects/workspace.webp",
    tags: ["React", "TypeScript", "Vite"],
    category: "b2b",
    liveUrl: "https://workspace.lnterprise.com",
    impact: {
      fr: "Outil de gestion interne en production pour une entreprise",
      en: "Internal management tool in production for a company",
    },
  },
  {
    slug: "portfolio",
    title: { fr: "Portfolio Personnel", en: "Personal Portfolio" },
    description: {
      fr: "Ce portfolio — conçu et développé avec Next.js 16, Tailwind CSS v4 et TypeScript, en français et en anglais.",
      en: "This portfolio — designed and built with Next.js 16, Tailwind CSS v4 and TypeScript, in French and English.",
    },
    image: "/images/projects/portfolio.webp",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "web",
    impact: {
      fr: "Vitrine professionnelle bilingue, testée et accessible",
      en: "Bilingual, tested and accessible professional showcase",
    },
  },
  {
    slug: "dashboard-analytics",
    title: "Dashboard Analytics",
    description: {
      fr: "Tableau de bord interactif de visualisation de données pour le suivi de KPIs métier.",
      en: "Interactive data visualisation dashboard to track business KPIs.",
    },
    image: "/images/projects/dashboard.webp",
    tags: ["React", "D3.js", "Node.js", "MongoDB"],
    category: "web",
    impact: {
      fr: "Suivi en temps réel des indicateurs de performance",
      en: "Real-time tracking of performance indicators",
    },
  },
];
