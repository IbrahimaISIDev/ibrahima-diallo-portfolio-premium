export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  image: string;
  video?: string;
  tags: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  impact: string;
  architecture?: string[];
  challenges?: string[];
  codeSnippet?: string;
  status?: ProjectStatus;
}

export type ProjectStatus = "Live" | "En Développement" | "Concept";

// Icônes disponibles pour les services (voir components/sections/Services.tsx)
export type ServiceIcon =
  "Monitor" | "Smartphone" | "Server" | "ShoppingCart" | "Palette" | "Cloud";

export interface Service {
  title: string;
  description: string;
  icon: ServiceIcon;
  technologies: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatarColor?: string;
  // Profil LinkedIn de l'auteur : rend le témoignage vérifiable
  linkedin?: string;
}

// Compétences groupées par domaine, sans niveau chiffré
export interface SkillGroup {
  id:
    | "frontend"
    | "backend-node"
    | "backend-java"
    | "laravel"
    | "mobile"
    | "data-devops"
    | "security";
  label: string;
  items: string[];
}

export interface Experience {
  // Identifiant stable, utilisé comme clé React
  id: string;
  // Sépare le parcours professionnel de la formation (CV, timeline)
  type: "work" | "education";
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

// Icônes disponibles pour les étapes du processus (voir ProcessSection.tsx)
export type WorkflowIcon = "Search" | "Layers" | "Code2" | "Rocket";

export interface WorkflowStep {
  title: string;
  subtitle: string;
  description: string;
  icon: WorkflowIcon;
  tasks: string[];
}
