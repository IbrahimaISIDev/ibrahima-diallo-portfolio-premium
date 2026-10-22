export const personalInfo = {
  fullName: "Ibrahima Sory Diallo",
  profileImage: "/images/image.png",
  title: "Développeur Full-Stack",
  tagline:
    "Je conçois et développe des solutions logicielles robustes qui répondent aux besoins métiers les plus exigeants.",
  // Résumé de profil (CV, page À propos)
  summary:
    "Développeur Full-Stack polyvalent, titulaire d'une Licence en Génie Logiciel de l'Institut Supérieur d'Informatique (ISI), obtenue avec la Mention Bien après un Prix d'Excellence et une 3ᵉ place de campus (17,37/20) en Licence 2, et étudiant en Licence 3 Informatique (Développement d'Applications) à l'Université Numérique Cheikh Hamidou Kane (UNCHK). Expertise confirmée dans le développement de systèmes complexes nécessitant une architecture robuste, une sécurité renforcée (chiffrement AES-256, JWT, conformité RGPD/HDS), une architecture offline-first, une synchronisation temps réel (WebSockets) et une optimisation des performances. Co-fondateur d'AgriPont, plateforme AgriTech déployée en production. Autonome sur tout le cycle de développement : analyse des besoins, architecture, développement backend, frontend et mobile, tests, CI/CD et mise en production.",
  location: "Dakar, Sénégal",
  email: "ibrahimadev6@gmail.com",
  phone: "+221 78 561 91 15",
  social: {
    linkedin: "https://www.linkedin.com/in/ibrahima-sory-diallo-363069249",
    github: "https://github.com/IbrahimaISIDev",
    calendly: "https://calendly.com/ibrahimadev6", // Placeholder
  },
  // Chiffres vérifiables, en nombres : le formatage se fait à l'affichage
  stats: {
    // Projets en ligne listés dans data/projects.ts (liveUrl)
    projectsInProduction: 9,
    // Depuis la formation Sonatel Academy (février 2024)
    yearsOfPractice: 2,
    // Saraya Tech, Nixacom, Tekkil, AgriPont
    companies: 4,
  },
  // Distinctions affichées dans la section « Accomplissements » du CV
  achievements: [
    {
      title: "Prix d'Excellence — Groupe ISI",
      desc: "3ᵉ de tout le campus en Licence 2, avec 17,37/20 de moyenne",
    },
    {
      title: "Licence en Génie Logiciel — Mention Bien",
      desc: "Institut Supérieur d'Informatique (ISI)",
    },
    {
      title: "Certification Développeur Web/Mobile — 20/20",
      desc: "Mention Excellent — École du Code, Orange Digital Center (Sonatel Academy)",
    },
    {
      title: "Co-fondateur d'AgriPont",
      desc: "Plateforme AgriTech conçue, développée et déployée en production",
    },
  ],
} as const;
