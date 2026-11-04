"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { stripLocale } from "@/lib/i18n/config";
import { homeSections, pageSections } from "@/lib/navigation";

// Section de la navigation à mettre en évidence dans le header.
// Sur l'accueil : la section qui traverse le milieu de l'écran (suit le défilement).
// Ailleurs : la section correspondant à la page, ou aucune.
export function useActiveSection(): string | null {
  // Chemin public sans préfixe de langue (/fr/about, /en/about -> /about)
  const pathname = stripLocale(usePathname());
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = homeSections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // Bande fine au milieu de l'écran : une seule section la traverse à la fois.
    // Au-dessus de la première section (présentation), aucun lien n'est actif.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSection(entry.target.id);
          else if (entry.target === sections[0] && entry.boundingClientRect.top > 0)
            setSection(null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname === "/") return section;
  const match = Object.entries(pageSections).find(
    ([page]) => pathname === page || pathname.startsWith(`${page}/`),
  );
  return match?.[1] ?? null;
}
