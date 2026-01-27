export interface Service {
  title: string;
  description: string;
  icon: string;
  technologies: string[];
}

export const services: Service[] = [
  {
    title: "Développement Web",
    description:
      "Applications web modernes et performantes avec React, Next.js et TypeScript.",
    icon: "Monitor",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Développement Mobile",
    description:
      "Applications mobiles cross-platform avec Flutter et React Native.",
    icon: "Smartphone",
    technologies: ["Flutter", "Dart", "Firebase", "iOS & Android"],
  },
  {
    title: "Backend & API",
    description:
      "APIs robustes et scalables avec Node.js, NestJS, Express, PHP, Laravel et PostgreSQL.",
    icon: "Server",
    technologies: ["NestJS", "Node.js", "PostgreSQL", "Laravel", "PHP"],
  },
  {
    title: "E-commerce",
    description:
      "Plateformes de vente en ligne complètes, sécurisées et optimisées.",
    icon: "ShoppingCart",
    technologies: ["Stripe", "WooCommerce", "Next.js Commerce", "CMS"],
  },
  {
    title: "UI/UX Design",
    description:
      "Interfaces intuitives et expériences utilisateur centrées sur la conversion.",
    icon: "Palette",
    technologies: ["Figma", "Prototypage", "Design Systems", "User Testing"],
  },
  {
    title: "Consulting DevOps",
    description:
      "Déploiement, CI/CD, Docker et optimisation de l'infrastructure cloud.",
    icon: "Cloud",
    technologies: ["Docker", "GitHub Actions", "AWS", "Vercel"],
  },
];
