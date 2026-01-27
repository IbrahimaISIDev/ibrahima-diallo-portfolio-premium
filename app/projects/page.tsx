import type { Metadata } from "next";
import Portfolio from "@/components/sections/Portfolio";

export const metadata: Metadata = {
  title: "Projets - Ibrahima Sory Diallo",
  description:
    "Découvrez mes réalisations : applications web, mobile, e-commerce et plus. Développeur Full-Stack basé à Dakar.",
};

export default function ProjectsPage() {
  return (
    <main className="pt-20">
      <Portfolio />
    </main>
  );
}
