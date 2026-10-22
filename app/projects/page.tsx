import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Portfolio from "@/components/sections/Portfolio";

export const metadata: Metadata = pageMetadata({
  title: "Projets - Ibrahima Sory Diallo",
  description:
    "Découvrez mes réalisations : applications web, mobile, e-commerce et plus. Développeur Full-Stack basé à Dakar.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <main id="main" className="pt-20">
      {/* La section Portfolio porte un h2 : la page a besoin de son propre h1 */}
      <h1 className="sr-only">Projets d&apos;Ibrahima Sory Diallo</h1>
      <Portfolio />
    </main>
  );
}
