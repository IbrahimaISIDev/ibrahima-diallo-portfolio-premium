import type { NavItem } from "@/types";

// Liens absolus (/#section) : ils fonctionnent depuis n'importe quelle page
export const navigationItems: NavItem[] = [
  { label: "Accueil", href: "/#accueil" },
  { label: "À propos", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Contact", href: "/#contact" },
];
