const phone = "+221 78 561 91 15";

export const personalInfo = {
  fullName: "Ibrahima Sory Diallo",
  profileImage: "/images/image.png",
  // Poste actuel : titre des pages (Google tronque vers 60 caractères) et données structurées
  title: "Développeur Full-Stack",
  // Titre complet du CV : Hero, CV, page À propos, image de partage
  headline: "Développeur Full-Stack & Aspirant Ingénieur Cloud / DevOps & IA",
  tagline:
    "Je conçois et développe des solutions logicielles robustes qui répondent aux besoins métiers les plus exigeants.",
  // Accroche du Hero (page d'accueil)
  heroTagline:
    "Je conçois et développe des solutions web et mobile qui transforment les idées en produits digitaux exceptionnels.",
  // Résumé de profil, repris mot pour mot du CV PDF (CV interactif, page À propos)
  summary:
    "Développeur Full-Stack polyvalent, titulaire d'une Licence Professionnelle en Génie Logiciel de l'Institut Supérieur d'Informatique (ISI) et étudiant en Licence 3 Informatique (Développement d'Applications) à l'Université Numérique Cheikh Hamidou Kane (UNCHK). Expertise confirmée dans le développement de systèmes complexes nécessitant une architecture robuste, une sécurité renforcée (chiffrement AES-256, JWT, conformité RGPD/HDS), une architecture offline-first, une synchronisation temps réel (WebSockets) et une optimisation des performances. Co-fondateur d'AgriPont, plateforme AgriTech déployée en production, démontrant une capacité à porter un projet de bout en bout — de l'idée à la mise en production. Autonome, capable de gérer l'ensemble du cycle de développement : analyse des besoins, architecture technique, développement backend/frontend/mobile, tests, CI/CD et mise en production.",
  location: "Dakar, Sénégal",
  email: "ibrahimadev6@gmail.com",
  phone,
  social: {
    linkedin: "https://www.linkedin.com/in/ibrahima-sory-diallo-363069249",
    github: "https://github.com/IbrahimaISIDev",
    // Lien wa.me construit depuis le numéro, avec un premier message prérempli
    whatsapp: `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
      "Bonjour Ibrahima, je vous contacte depuis votre portfolio.",
    )}`,
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
