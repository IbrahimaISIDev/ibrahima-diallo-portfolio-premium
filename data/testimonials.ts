export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Amadou Ba",
    role: "CEO",
    company: "Saraya Tech",
    content:
      "Ibrahima a livré un système de gestion de flotte exceptionnel. Son expertise technique et sa capacité à comprendre nos besoins métier ont fait la différence. Un développeur de grande qualité.",
  },
  {
    name: "Fatou Diop",
    role: "Directrice",
    company: "Clinique MIMAP",
    content:
      "La digitalisation de notre clinique par Ibrahima a transformé notre façon de travailler. Le système est fiable, intuitif et a considérablement amélioré notre efficacité.",
  },
  {
    name: "Moussa Ndiaye",
    role: "Président",
    company: "AEM-UNCHK",
    content:
      "Grâce à Ibrahima, notre association dispose maintenant d'une plateforme moderne qui connecte tous nos membres. Son leadership technique et son engagement ont été remarquables.",
  },
];
