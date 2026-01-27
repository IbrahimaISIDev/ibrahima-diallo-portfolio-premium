export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    title: "Développement Web",
    description:
      "Applications web modernes et performantes avec React, Next.js et TypeScript.",
    icon: "Monitor",
  },
  {
    title: "Développement Mobile",
    description:
      "Applications mobiles cross-platform avec Flutter et React Native.",
    icon: "Smartphone",
  },
  {
    title: "Backend & API",
    description:
      "APIs robustes et scalables avec Node.js, NestJS, Express et PostgreSQL.",
    icon: "Server",
  },
  {
    title: "E-commerce",
    description:
      "Plateformes de vente en ligne complètes, sécurisées et optimisées.",
    icon: "ShoppingCart",
  },
  {
    title: "UI/UX Design",
    description:
      "Interfaces intuitives et expériences utilisateur centrées sur la conversion.",
    icon: "Palette",
  },
  {
    title: "Consulting DevOps",
    description:
      "Déploiement, CI/CD, Docker et optimisation de l'infrastructure cloud.",
    icon: "Cloud",
  },
];
