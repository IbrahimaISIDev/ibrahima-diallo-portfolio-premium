import type { Localized } from "@/lib/i18n/config";
import type { Translatable } from "./types";

export type SkillGroupId =
  | "frontend"
  | "backend-node"
  | "backend-java"
  | "laravel"
  | "mobile"
  | "data"
  | "devops"
  | "security";

export interface SkillGroupContent {
  id: SkillGroupId;
  label: Localized<string>;
  items: Translatable[];
}

// Compétences groupées par domaine, sans niveau chiffré
export const skillGroups: SkillGroupContent[] = [
  {
    id: "frontend",
    label: { fr: "Frontend", en: "Frontend" },
    items: [
      "Angular",
      "React 18/19",
      "Next.js 15",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Redux",
      "Hooks",
    ],
  },
  {
    id: "backend-node",
    label: { fr: "Backend Node.js", en: "Node.js backend" },
    items: ["Node.js", "NestJS", "Express", "REST APIs", "GraphQL", "WebSockets", "JWT", "OAuth2"],
  },
  {
    id: "backend-java",
    label: { fr: "Backend Java", en: "Java backend" },
    items: [
      "Java 17/21",
      { fr: "POO", en: "OOP" },
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "Spring Data JPA / Hibernate",
      "JDBC",
      "JavaFX",
      "JEE / Jakarta EE",
      "Maven / Gradle",
      "REST APIs",
      "JWT",
      "Swagger / OpenAPI",
    ],
  },
  {
    id: "laravel",
    label: { fr: "Laravel", en: "Laravel" },
    items: [
      "Eloquent ORM",
      "Services",
      "Repositories",
      "Events",
      "Multi-tenancy",
      "Laravel Passport",
    ],
  },
  {
    id: "mobile",
    label: { fr: "Mobile & Offline", en: "Mobile & offline" },
    items: [
      "React Native (Android/iOS)",
      "Flutter (Android/iOS)",
      "PWA",
      "Offline-first (IndexedDB, Dexie, SQLite)",
      "Firebase",
      "Push Notifications",
      "Deep Linking",
    ],
  },
  {
    id: "data",
    label: { fr: "Bases de données", en: "Databases" },
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "Prisma", "TypeORM"],
  },
  {
    id: "devops",
    label: { fr: "Cloud, DevOps & Outils", en: "Cloud, DevOps & tooling" },
    items: [
      { fr: "Administration de serveurs VPS (Linux)", en: "VPS server administration (Linux)" },
      { fr: "Noms de domaine & DNS", en: "Domain names & DNS" },
      "Nginx (reverse proxy)",
      { fr: "Certificats SSL", en: "SSL certificates" },
      "Docker",
      "Git",
      "GitHub Actions",
      "CodeMagic",
      "Postman",
      "Jest",
      "PHPUnit",
    ],
  },
  {
    id: "security",
    label: { fr: "Sécurité & Architecture", en: "Security & architecture" },
    items: [
      "JWT",
      "OAuth2",
      { fr: "Chiffrement AES-256", en: "AES-256 encryption" },
      "RBAC",
      { fr: "Conformité RGPD/HDS", en: "GDPR/HDS compliance" },
      "Agile/Scrum",
      "Clean Code",
      { fr: "Principes SOLID", en: "SOLID principles" },
      { fr: "Cache Redis", en: "Redis caching" },
      "Lazy loading",
      "Code splitting",
    ],
  },
];

// Technologies mises en avant (accueil) : les plus représentatives du profil
export const featuredStack = [
  "NestJS",
  "Next.js",
  "Flutter",
  "Spring Boot",
  "PostgreSQL",
  "Docker",
  "Angular",
];
