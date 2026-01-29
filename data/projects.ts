import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "MIMAP",
    slug: "mimap",
    description:
      "Système de gestion complet pour une clinique médicale en Mauritanie. Digitalisation des dossiers patients, rendez-vous et facturation.",
    image: "/images/projects/mimap.png",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    category: "Santé",
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
    title: "Gestion de Flotte",
    slug: "gestion-flotte",
    description:
      "Solution B2B pour Saraya Tech permettant d'optimiser la gestion de flottes automobiles avec suivi en temps réel.",
    image: "/images/projects/flotte.png",
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
    title: "Teranga Farm",
    slug: "teranga-farm",
    description:
      "Marketplace B2B connectant les producteurs agricoles de Casamance aux transformateurs de Dakar.",
    image: "/images/projects/teranga-farm.png",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    category: "E-commerce",
    impact: "Connexion producteurs de Casamance et transformateurs de Dakar",
    status: "Live",
    architecture: [
      "Frontend SSR avec Next.js pour un SEO optimal",
      "Base de données NoSQL MongoDB pour la flexibilité des produits",
      "Paiements intégrés avec l'API Stripe",
      "Gestion d'images avec Cloudinary"
    ],
    challenges: [
      "Mise en place d'un système multi-vendeurs complexe",
      "Optimisation de la logistique entre régions éloignées",
      "Système de notifications SMS pour les producteurs ruraux"
    ],
    codeSnippet: `// Exemple de logique multi-vendeurs
export const calculateCommission = (amount) => {
  const platformFee = amount * 0.15; // 15% commission
  const vendorShare = amount - platformFee;
  return { platformFee, vendorShare };
};`
  },
  {
    title: "AEM-UNCHK Connect",
    slug: "aem-unchk",
    description:
      "Plateforme communautaire digitalisant l'Association des Étudiants Musulmans de l'UN-CHK.",
    image: "/images/projects/aem-unchk.png",
    tags: ["React", "Firebase", "Tailwind CSS"],
    category: "Communauté",
    impact: "Digitalisation de l'Association des Étudiants Musulmans de l'UN-CHK",
    status: "Live"
  },
  {
    title: "Portfolio Personnel",
    slug: "portfolio",
    description:
      "Ce portfolio — conçu et développé avec Next.js 15, Tailwind CSS v4 et TypeScript.",
    image: "/images/projects/portfolio.png",
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
    image: "/images/projects/dashboard.png",
    tags: ["React", "D3.js", "Node.js", "MongoDB"],
    category: "Web",
    impact: "Suivi en temps réel des indicateurs de performance",
    status: "Live"
  },
];

export const projectCategories = [
  "Tous",
  "Web",
  "Santé",
  "B2B",
  "E-commerce",
  "Communauté",
];
