export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
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
  status?: "Live" | "En Développement" | "Concept";
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

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  availability: string;
}

export interface WorkflowStep {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  tasks: string[];
}
