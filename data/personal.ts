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
  stats: {
    clients: "15+",
    projects: "38+",
    // awards: "30",
    experience: "03+",
  },
  services: [
    "Développement Web (React, Next.js)",
    "Développement Mobile (Flutter)",
    "Backend API (Node.js, NestJS)",
    "Consulting DevOps",
    "Formation technique",
  ],
} as const;
