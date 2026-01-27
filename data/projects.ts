import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "MIMAP",
    slug: "mimap",
    description:
      "Système de gestion complet pour une clinique médicale en Mauritanie. Digitalisation des dossiers patients, rendez-vous et facturation.",
    image: "/images/projects/mimap.jpg",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    category: "Healthcare",
    impact: "Digitalisation complète d'une clinique médicale en Mauritanie",
  },
  {
    title: "Gestion de Flotte",
    slug: "gestion-flotte",
    description:
      "Solution B2B pour Saraya Tech permettant d'optimiser la gestion de flottes automobiles avec suivi en temps réel.",
    image: "/images/projects/flotte.jpg",
    tags: ["NestJS", "PostgreSQL", "Flutter", "Docker"],
    category: "B2B",
    impact: "Optimisation de la gestion de flottes automobiles",
  },
  {
    title: "Teranga Farm ",
    slug: "Teranga Farm ",
    description:
      "Marketplace B2B connectant les producteurs agricoles de Casamance aux transformateurs de Dakar.",
    image: "/images/projects/Teranga Farm .jpg",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    category: "E-commerce",
    impact:
      "Connexion producteurs de Casamance et transformateurs de Dakar",
  },
  {
    title: "AEM-UNCHK Connect",
    slug: "aem-unchk",
    description:
      "Plateforme communautaire digitalisant l'Association des Étudiants Musulmans de l'UN-CHK.",
    image: "/images/projects/aem-unchk.jpg",
    tags: ["React", "Firebase", "Tailwind CSS"],
    category: "Community",
    impact:
      "Digitalisation de l'Association des Étudiants Musulmans de l'UN-CHK",
  },
  {
    title: "Portfolio Personnel",
    slug: "portfolio",
    description:
      "Ce portfolio — conçu et développé avec Next.js 15, Tailwind CSS v4 et TypeScript.",
    image: "/images/projects/portfolio.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Web",
    impact: "Vitrine professionnelle moderne et performante",
  },
  {
    title: "Dashboard Analytics",
    slug: "dashboard-analytics",
    description:
      "Tableau de bord interactif de visualisation de données pour le suivi de KPIs métier.",
    image: "/images/projects/dashboard.jpg",
    tags: ["React", "D3.js", "Node.js", "MongoDB"],
    category: "Web",
    impact: "Suivi en temps réel des indicateurs de performance",
  },
];

export const projectCategories = [
  "Tous",
  "Web",
  "Healthcare",
  "B2B",
  "E-commerce",
  "Community",
];
