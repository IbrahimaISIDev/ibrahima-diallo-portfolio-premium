import type { Project, ProjectStatus } from "@/types";

// Libellés affichés pour chaque statut (la valeur "Live" reste interne)
export const projectStatusLabels: Record<ProjectStatus, string> = {
  Live: "En ligne",
  "En Développement": "En développement",
  Concept: "Concept",
};

export const projects: Project[] = [
  {
    title: "Tekkil",
    slug: "tekkil",
    description:
      "Plateforme SaaS de préparation aux concours nationaux au Sénégal : contenus pédagogiques protégés, QCM chronométrés, flashcards à répétition espacée et examens blancs.",
    image: "/images/projects/tekkil.webp",
    tags: ["NestJS", "Next.js", "Flutter", "HLS", "Mobile Money"],
    category: "EdTech",
    liveUrl: "https://tekkilapp.com",
    impact:
      "Seul développeur de la V1 à la mise en production : API, back-office et application mobile Android/iOS",
    status: "Live",
    architecture: [
      "API NestJS partagée par le back-office et l'application mobile",
      "Back-office Next.js 15 pour la gestion des contenus, des abonnés et des paiements",
      "Application Flutter Android/iOS utilisable hors ligne (PDF, audio, vidéo HLS, QCM, flashcards)",
      "Paiement Mobile Money (Orange Money, Wave) via le Strategy Pattern, avec webhooks et validation manuelle par l'administrateur",
    ],
    challenges: [
      "Protéger le contenu payant : FLAG_SECURE sur Android, overlay SwiftUI sur iOS, filigrane dynamique (CustomPainter), streaming HLS chiffré en AES-128 et URLs signées Cloudflare R2",
      "Sécuriser les sessions : JWT avec révocation multi-appareil par session en base, refresh token rotatif sur 7 jours et rate limiting des routes sensibles",
      "Permettre de réviser avec une connexion limitée : contenus protégés, QCM et flashcards (algorithme SM-2) disponibles hors ligne",
    ],
  },
  {
    title: "AgriPont",
    slug: "agripont",
    description:
      "Plateforme AgriTech de vente en circuit court : les fruits et légumes de Casamance commandés en groupe et livrés à Dakar.",
    image: "/images/projects/agripont.webp",
    tags: ["React", "NestJS", "PostgreSQL", "TypeORM", "Docker"],
    category: "AgriTech",
    liveUrl: "https://agripont.com",
    impact:
      "Co-fondée et déployée en production ; mémoire de fin de cycle soutenu à l'ISI",
    status: "Live",
    architecture: [
      "Architecture 3-tiers : React.js et Tailwind CSS, API REST NestJS en TypeScript, PostgreSQL avec TypeORM",
      "Authentification JWT",
      "Back-office d'administration : catalogue, clients, stock et pilotage des indicateurs",
      "Production conteneurisée avec Docker sur VPS, reverse proxy Nginx et certificat SSL",
    ],
    challenges: [
      "Concevoir le moteur de commandes groupées : agrégation de la demande par fenêtre de commande et gestion du cycle producteur → consommateur",
      "Piloter le projet en Scrum en autonomie complète, en cumulant les rôles de Product Owner, Scrum Master et développeur",
    ],
  },
  {
    title: "MIMAP",
    slug: "mimap",
    description:
      "Système de gestion complet pour une clinique médicale en Mauritanie. Digitalisation des dossiers patients, rendez-vous et facturation.",
    image: "/images/projects/mimap.webp",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    category: "Santé",
    liveUrl: "https://mimapeds.com",
    impact: "Digitalisation complète d'une clinique médicale en Mauritanie",
    status: "Live",
    architecture: [
      "Architecture Client-Serveur avec REST API",
      "Gestion d'état avec React Context & Hooks",
      "Persistance des données sécurisée sur PostgreSQL",
      "Authentification basée sur JWT"
    ],
    challenges: [
      "Gestion confidentielle et sécurisée des dossiers médicaux",
      "Optimisation de la recherche de patients parmi des milliers d'entrées",
      "Interface utilisateur simplifiée pour le personnel soignant"
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
};`
  },
  {
    title: "Abu Maryam TV",
    slug: "abou-maryam-tv",
    description:
      "Plateforme éducative d'Oustaz Niang Mbaye : cours, conférences et khoutbas en wolof et en arabe, en direct chaque vendredi et à la demande.",
    image: "/images/projects/abou-maryam.webp",
    tags: ["Next.js", "PWA"],
    category: "Média",
    liveUrl: "https://abou-maryam.com",
    impact: "Enseignements accessibles en direct et à la demande, installable comme application",
    status: "Live",
  },
  {
    title: "Shaolin Si Sénégal (ADSS)",
    slug: "shaolin-senegal",
    description:
      "Site officiel de l'Association Disciples Shaolin Si Sénégal : actualités, compétitions, galerie, carte des clubs et affiliation en ligne.",
    image: "/images/projects/shaolin.webp",
    tags: ["Next.js"],
    category: "Communauté",
    liveUrl: "https://shaolin-senegal.com",
    impact: "Présence en ligne officielle et affiliation des membres pour l'association nationale",
    status: "Live",
  },
  {
    title: "SN Immo",
    slug: "sn-immo",
    description:
      "Site d'agence immobilière à Dakar : recherche de biens à l'achat ou à la location par type, quartier et budget.",
    image: "/images/projects/sn-immo.webp",
    tags: ["Next.js"],
    category: "Immobilier",
    liveUrl: "https://sn-immo.vercel.app",
    impact: "Recherche de biens immobiliers par critères pour une agence dakaroise",
    status: "Live",
  },
  {
    title: "Fily Mode Royale",
    slug: "fily-mode-royale",
    description:
      "Boutique en ligne de prêt-à-porter féminin : catalogue, nouveautés, promotions et panier.",
    image: "/images/projects/fily-mode-royale.webp",
    tags: ["React", "Vite"],
    category: "E-commerce",
    liveUrl: "https://filymoderoyale.com",
    impact: "Vente en ligne d'une marque de mode sénégalaise",
    status: "Live",
  },
  {
    title: "Gestion de Flotte",
    slug: "gestion-flotte",
    description:
      "Solution B2B pour Saraya Tech permettant d'optimiser la gestion de flottes automobiles avec suivi en temps réel.",
    image: "/images/projects/flotte.webp",
    tags: ["NestJS", "PostgreSQL", "Flutter", "Docker"],
    category: "B2B",
    impact: "Optimisation de la gestion de flottes automobiles",
    status: "Live",
    architecture: [
      "Backend découplé avec NestJS (Modular Architecture)",
      "Application mobile cross-platform avec Flutter",
      "Infrastructure conteneurisée avec Docker",
      "Intégration temps-réel avec WebSockets"
    ],
    challenges: [
      "Synchronisation des données en temps réel pour le suivi GPS",
      "Gestion de gros volumes de logs de trajet rattachés aux véhicules",
      "Calcul complexe de la consommation de carburant et maintenance"
    ]
  },

  {
    title: "AEM-UNCHK Connect",
    slug: "aem-unchk",
    description:
      "Plateforme communautaire digitalisant l'Association des Étudiants Musulmans de l'UN-CHK.",
    image: "/images/projects/aem-unchk.webp",
    tags: ["React", "Firebase", "Tailwind CSS"],
    category: "Communauté",
    liveUrl: "https://aem-unchk-connect.vercel.app",
    impact: "Digitalisation de l'Association des Étudiants Musulmans de l'UN-CHK",
    status: "Live"
  },
  {
    title: "Workspace L&N Entreprise",
    slug: "workspace-ln-entreprise",
    description:
      "Espace d'administration interne de L&N Entreprise, réservé à ses administrateurs.",
    image: "/images/projects/workspace.webp",
    tags: ["React", "TypeScript", "Vite"],
    category: "B2B",
    liveUrl: "https://workspace.lnterprise.com",
    impact: "Outil de gestion interne en production pour une entreprise",
    status: "Live",
  },
  {
    title: "Portfolio Personnel",
    slug: "portfolio",
    description:
      "Ce portfolio — conçu et développé avec Next.js 16, Tailwind CSS v4 et TypeScript.",
    image: "/images/projects/portfolio.webp",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Web",
    impact: "Vitrine professionnelle moderne et performante",
    status: "Live"
  },
  {
    title: "Dashboard Analytics",
    slug: "dashboard-analytics",
    description:
      "Tableau de bord interactif de visualisation de données pour le suivi de KPIs métier.",
    image: "/images/projects/dashboard.webp",
    tags: ["React", "D3.js", "Node.js", "MongoDB"],
    category: "Web",
    impact: "Suivi en temps réel des indicateurs de performance",
    status: "Live"
  },
];

// Filtres du portfolio, déduits des projets : pas de catégorie vide, pas d'oubli
export const projectCategories = [
  "Tous",
  ...new Set(projects.map((project) => project.category)),
];
