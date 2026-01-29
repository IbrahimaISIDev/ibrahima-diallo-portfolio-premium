import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "React / Next.js", level: 95, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "Tailwind CSS", level: 92, category: "frontend" },
  { name: "HTML / CSS", level: 95, category: "frontend" },
  { name: "Framer Motion", level: 80, category: "frontend" },

  // Backend
  { name: "Node.js / Express", level: 90, category: "backend" },
  { name: "NestJS", level: 85, category: "backend" },
  { name: "PHP / Laravel", level: 95, category: "backend" },
  { name: "Python", level: 70, category: "backend" },

  // Mobile
  { name: "Flutter", level: 85, category: "mobile" },
  { name: "React Native", level: 70, category: "mobile" },

  // Database
  { name: "PostgreSQL", level: 90, category: "database" },
  { name: "MongoDB", level: 85, category: "database" },
  { name: "Firebase", level: 85, category: "database" },

  // DevOps
  { name: "Docker", level: 78, category: "devops" },
  { name: "Git / GitHub Actions", level: 90, category: "devops" },
  { name: "AWS / Vercel / Render", level: 80, category: "devops" },
  { name: "Firebase Hosting", level: 70, category: "devops" },
];

export const skillCategories = {
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  database: "Bases de données",
  devops: "DevOps & Outils",
} as const;
