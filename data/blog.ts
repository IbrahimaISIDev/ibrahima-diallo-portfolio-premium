export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Comment j'ai construit un système de gestion de flotte avec ReactJS",
    slug: "gestion-flotte-reactjs",
    excerpt:
      "Retour d'expérience sur la conception et le développement d'une application complexe de gestion de flotte automobile pour Saraya Tech.",
    category: "Retour d'expérience",
    date: "2025-01-15",
    readTime: "8 min",
  },
  {
    title: "Guide : Déployer une app Flutter avec CI/CD",
    slug: "deployer-flutter-cicd",
    excerpt:
      "Un guide complet pour automatiser le déploiement de vos applications Flutter avec GitHub Actions et CodeMagic.",
    category: "Tutoriel",
    date: "2025-01-08",
    readTime: "12 min",
  },
  {
    title: "De Sonatel Academy à Saraya Tech : Mon parcours de développeur",
    slug: "parcours-developpeur-senegal",
    excerpt:
      "Mon parcours de développeur au Sénégal, de la formation intensive à Sonatel Academy jusqu'à mon rôle actuel chez Saraya Tech.",
    category: "Parcours",
    date: "2024-12-20",
    readTime: "6 min",
  },
];
