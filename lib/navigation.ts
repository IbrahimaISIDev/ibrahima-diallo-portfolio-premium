// Liens du header et du footer. Les chemins sont sans préfixe de langue :
// les composants les passent à localePath(). Les ancres (/#projects) renvoient
// aux sections de l'accueil depuis n'importe quelle page.
export const navigationItems = [
  { key: "projects", href: "/#projects", section: "projects" },
  { key: "expertise", href: "/#expertise", section: "expertise" },
  { key: "about", href: "/about", section: "about" },
  { key: "cv", href: "/cv", section: "cv" },
] as const;

export type NavigationKey = (typeof navigationItems)[number]["key"];

// Sections de l'accueil suivies au défilement
export const homeSections = ["projects", "expertise", "contact"] as const;

// Pages dédiées et l'élément de navigation qu'elles prolongent
export const pageSections: Record<string, string> = {
  "/projects": "projects",
  "/about": "about",
  "/cv": "cv",
  "/contact": "contact",
};
