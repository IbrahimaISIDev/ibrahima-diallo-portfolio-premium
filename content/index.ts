import type { Locale } from "@/lib/i18n/config";
import { experiences } from "./experience";
import { profile } from "./profile";
import { projectCategories, projects, type ProjectCategory } from "./projects";
import { featuredStack, skillGroups } from "./skills";
import { services } from "./services";
import { testimonials } from "./testimonials";
import { resolve, resolveAll } from "./types";
import { workflowSteps } from "./workflow";

// Période lisible : "2026-06" + "present" -> "juin 2026 – aujourd'hui" / "June 2026 – Present"
export function formatPeriod(start: string, end: string, locale: Locale): string {
  const format = (month: string) =>
    new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${month}-01T00:00:00Z`));
  const present = locale === "fr" ? "aujourd’hui" : "Present";
  if (start === end) return format(start);
  return `${format(start)} – ${end === "present" ? present : format(end)}`;
}

// Années seules, pour les listes compactes : "2026 → " / "2025 – 2026"
export function formatYears(start: string, end: string): string {
  const startYear = start.slice(0, 4);
  if (end === "present") return `${startYear} →`;
  const endYear = end.slice(0, 4);
  return startYear === endYear ? startYear : `${startYear} – ${endYear}`;
}

function getProfile(locale: Locale) {
  return {
    ...profile,
    location: profile.location[locale],
    languages: profile.languages[locale],
    title: profile.title[locale],
    headline: profile.headline[locale],
    shortHeadline: profile.shortHeadline[locale],
    pitch: profile.pitch[locale],
    summary: profile.summary[locale],
    social: { ...profile.social, whatsapp: profile.social.whatsapp[locale] },
    stats: { ...profile.stats, bestAverage: profile.stats.bestAverage[locale] },
    achievements: profile.achievements.map((achievement) => ({
      title: achievement.title[locale],
      desc: achievement.desc[locale],
    })),
  };
}

function getProjects(locale: Locale) {
  return projects.map((project) => ({
    ...project,
    title: resolve(project.title, locale),
    description: project.description[locale],
    impact: project.impact[locale],
    categoryLabel: projectCategories[project.category][locale],
    architecture: project.architecture?.map((item) => item[locale]),
    challenges: project.challenges?.map((item) => item[locale]),
  }));
}

function getExperiences(locale: Locale) {
  return experiences.map((experience) => ({
    ...experience,
    title: experience.title[locale],
    organization: resolve(experience.organization, locale),
    period: formatPeriod(experience.start, experience.end, locale),
    years: formatYears(experience.start, experience.end),
    description: experience.description[locale],
    highlights: experience.highlights.map((item) => item[locale]),
    technologies: resolveAll(experience.technologies, locale),
  }));
}

// Tout le contenu du site, résolu dans une langue
export function getContent(locale: Locale) {
  const resolvedProjects = getProjects(locale);
  const categories = [...new Set(projects.map((project) => project.category))].map((id) => ({
    id,
    label: projectCategories[id][locale],
  }));

  return {
    locale,
    profile: getProfile(locale),
    projects: resolvedProjects,
    featuredProjects: resolvedProjects.filter((project) => project.featured),
    projectCategories: categories,
    experiences: getExperiences(locale),
    skillGroups: skillGroups.map((group) => ({
      id: group.id,
      label: group.label[locale],
      items: resolveAll(group.items, locale),
    })),
    featuredStack,
    skillCount: skillGroups.reduce((total, group) => total + group.items.length, 0),
    services: services.map((service) => ({
      ...service,
      title: service.title[locale],
      description: service.description[locale],
      technologies: resolveAll(service.technologies, locale),
    })),
    testimonials: testimonials.map((testimonial) => ({
      ...testimonial,
      role: testimonial.role[locale],
      content: testimonial.content[locale],
      // La citation est traduite du français dans les autres langues
      translated: locale !== "fr",
    })),
    workflow: workflowSteps.map((step) => ({
      ...step,
      title: step.title[locale],
      description: step.description[locale],
      tasks: step.tasks.map((task) => task[locale]),
    })),
  };
}

export type SiteContent = ReturnType<typeof getContent>;
export type ProjectView = SiteContent["projects"][number];
export type ExperienceView = SiteContent["experiences"][number];
export type { ProjectCategory };
