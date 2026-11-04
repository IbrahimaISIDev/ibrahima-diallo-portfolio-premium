import type { Localized } from "@/lib/i18n/config";

export interface TestimonialContent {
  name: string;
  role: Localized<string>;
  company: string;
  // Citation originale en français ; la version anglaise est une traduction (signalée à l'affichage)
  content: Localized<string>;
  // Profil LinkedIn de l'auteur : rend le témoignage vérifiable
  linkedin?: string;
}

export const testimonials: TestimonialContent[] = [
  {
    name: "Cheikh Ahmed Bamba Niang",
    role: { fr: "Président", en: "President" },
    company: "AEM-UNCHK",
    content: {
      fr: "Grâce à Ibrahima, notre association dispose maintenant d'une plateforme moderne qui connecte tous nos membres. Son leadership technique et son engagement ont été remarquables.",
      en: "Thanks to Ibrahima, our association now has a modern platform that connects all our members. His technical leadership and commitment have been remarkable.",
    },
  },
  {
    name: "Amadou Ba",
    role: { fr: "CEO", en: "CEO" },
    company: "Saraya Tech",
    content: {
      fr: "Ibrahima a livré un système de gestion de flotte exceptionnel. Son expertise technique et sa capacité à comprendre nos besoins métier ont fait la différence. Un développeur de grande qualité.",
      en: "Ibrahima delivered an outstanding fleet management system. His technical expertise and his grasp of our business needs made the difference. A high-calibre developer.",
    },
  },
  {
    name: "Fatou Diop",
    role: { fr: "Directrice", en: "Director" },
    company: "Clinique MIMAP",
    content: {
      fr: "La digitalisation de notre clinique par Ibrahima a transformé notre façon de travailler. Le système est fiable, intuitif et a considérablement amélioré notre efficacité.",
      en: "Ibrahima's digitalisation of our clinic transformed the way we work. The system is reliable, intuitive and has greatly improved our efficiency.",
    },
  },
];
