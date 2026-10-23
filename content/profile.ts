import type { Localized } from "@/lib/i18n/config";

const phone = "+221 78 561 91 15";

// Identité et textes de présentation, en français et en anglais
export const profile = {
  fullName: "Ibrahima Sory Diallo",
  photo: "/images/image.png",
  email: "ibrahimadev6@gmail.com",
  phone,
  cvPdf: "/cv/Ibrahima_Sory_Diallo-CV.pdf",
  location: { fr: "Dakar, Sénégal", en: "Dakar, Senegal" } satisfies Localized<string>,
  languages: {
    fr: "Français, anglais, peul",
    en: "French, English, Fula",
  } satisfies Localized<string>,

  // Poste actuel : titre des pages (Google tronque vers 60 caractères) et données structurées
  title: { fr: "Développeur Full-Stack", en: "Full-Stack Developer" } satisfies Localized<string>,
  // Titre complet du CV : Hero, CV, page À propos, image de partage
  headline: {
    fr: "Développeur Full-Stack & Aspirant Ingénieur Cloud / DevOps & IA",
    en: "Full-Stack Developer & Aspiring Cloud / DevOps & AI Engineer",
  } satisfies Localized<string>,
  // Version courte du titre, pour les espaces étroits (cartes, badges)
  shortHeadline: {
    fr: "Full-Stack · Cloud / DevOps · IA",
    en: "Full-Stack · Cloud / DevOps · AI",
  } satisfies Localized<string>,
  // Accroche de la page d'accueil
  pitch: {
    fr: "Je conçois et livre des produits complets — API, web, mobile, mise en production — pour des startups et des entreprises d’Afrique de l’Ouest.",
    en: "I design and ship complete products — APIs, web, mobile and production deployment — for startups and companies across West Africa.",
  } satisfies Localized<string>,
  // Résumé de profil : version française reprise mot pour mot du CV PDF
  summary: {
    fr: "Développeur Full-Stack polyvalent, titulaire d'une Licence Professionnelle en Génie Logiciel de l'Institut Supérieur d'Informatique (ISI) et étudiant en Licence 3 Informatique (Développement d'Applications) à l'Université Numérique Cheikh Hamidou Kane (UNCHK). Expertise confirmée dans le développement de systèmes complexes nécessitant une architecture robuste, une sécurité renforcée (chiffrement AES-256, JWT, conformité RGPD/HDS), une architecture offline-first, une synchronisation temps réel (WebSockets) et une optimisation des performances. Co-fondateur d'AgriPont, plateforme AgriTech déployée en production, démontrant une capacité à porter un projet de bout en bout — de l'idée à la mise en production. Autonome, capable de gérer l'ensemble du cycle de développement : analyse des besoins, architecture technique, développement backend/frontend/mobile, tests, CI/CD et mise en production.",
    en: "Versatile full-stack developer holding a Professional Bachelor's degree in Software Engineering from the Institut Supérieur d'Informatique (ISI), and a third-year Computer Science student (Application Development) at Université Numérique Cheikh Hamidou Kane (UNCHK). Proven expertise in building complex systems that require a robust architecture, strong security (AES-256 encryption, JWT, GDPR/HDS compliance), an offline-first design, real-time synchronisation (WebSockets) and performance optimisation. Co-founder of AgriPont, an AgriTech platform running in production, showing the ability to carry a project end to end — from idea to production. Autonomous across the whole development cycle: requirements analysis, technical architecture, backend/frontend/mobile development, testing, CI/CD and deployment.",
  } satisfies Localized<string>,

  social: {
    linkedin: "https://www.linkedin.com/in/ibrahima-sory-diallo-363069249",
    github: "https://github.com/IbrahimaISIDev",
    // Lien wa.me construit depuis le numéro, avec un premier message prérempli
    whatsapp: {
      fr: `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Bonjour Ibrahima, je vous contacte depuis votre portfolio.",
      )}`,
      en: `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hello Ibrahima, I'm reaching out from your portfolio.",
      )}`,
    } satisfies Localized<string>,
  },

  // Chiffres vérifiables, en nombres : le formatage se fait à l'affichage
  stats: {
    // Projets en ligne (liveUrl) de content/projects.ts
    projectsInProduction: 9,
    // Depuis la formation Sonatel Academy (février 2024)
    yearsOfPractice: 2,
    // Saraya Tech, Nixacom, Tekkil, AgriPont
    companies: 4,
    // Moyenne de Licence 2 à l'ISI (Prix d'Excellence, 3ᵉ du campus)
    bestAverage: { fr: "17,37", en: "17.37" } satisfies Localized<string>,
  },

  // Distinctions (CV, page À propos)
  achievements: [
    {
      title: { fr: "Prix d'Excellence — Groupe ISI", en: "Award of Excellence — ISI Group" },
      desc: {
        fr: "3ᵉ de tout le campus en Licence 2, avec 17,37/20 de moyenne",
        en: "Ranked 3rd across the whole campus in second year, with a 17.37/20 average",
      },
    },
    {
      title: {
        fr: "Licence en Génie Logiciel — Mention Bien",
        en: "Bachelor's in Software Engineering — with Honours",
      },
      desc: {
        fr: "Institut Supérieur d'Informatique (ISI)",
        en: "Institut Supérieur d'Informatique (ISI)",
      },
    },
    {
      title: {
        fr: "Certification Développeur Web/Mobile — 20/20",
        en: "Web/Mobile Developer Certification — 20/20",
      },
      desc: {
        fr: "Mention Excellent — École du Code, Orange Digital Center (Sonatel Academy)",
        en: "Highest distinction — École du Code, Orange Digital Center (Sonatel Academy)",
      },
    },
    {
      title: { fr: "Co-fondateur d'AgriPont", en: "Co-founder of AgriPont" },
      desc: {
        fr: "Plateforme AgriTech conçue, développée et déployée en production",
        en: "AgriTech platform designed, built and deployed to production",
      },
    },
  ] satisfies { title: Localized<string>; desc: Localized<string> }[],
};
