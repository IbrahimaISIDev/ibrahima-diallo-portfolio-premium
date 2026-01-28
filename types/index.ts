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

export interface Skill {
  name: string;
  icon?: string;
  level?: number;
  category: "frontend" | "backend" | "mobile" | "database" | "devops";
}

export interface Experience {
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
