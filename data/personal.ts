export const personalInfo = {
  firstName: "Ibrahima",
  lastName: "Sory Diallo",
  fullName: "Ibrahima Sory Diallo",
  profileImage: "/images/Ibrahima_Sory_Diallo_ISI_L3_GL_G2.jpg",
  title: "Développeur Full-Stack",
  tagline:
    "Je conçois et développe des solutions logicielles robustes qui répondent aux besoins métiers les plus exigeants.",
  location: "Dakar, Sénégal",
  email: "ibrahimadev6@gmail.com",
  phone: "+221 78 561 91 15",
  availability: "Disponible pour projets freelance",
  social: {
    linkedin: "https://www.linkedin.com/in/ibrahima-sory-diallo-363069249",
    github: "https://github.com/IbrahimaISIDev",
    calendly: "https://calendly.com/ibrahimadev6", // Placeholder
  },
  // Valeurs numériques : le suffixe « + » est ajouté à l'affichage
  stats: {
    clients: 10,
    projects: 18,
    experience: 3,
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
  services: [
    "Développement Web (React, Next.js)",
    "Développement Mobile (Flutter)",
    "Backend API (Node.js, NestJS)",
    "Consulting DevOps",
    "Formation technique",
  ],
} as const;
