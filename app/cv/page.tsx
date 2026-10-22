import type { Metadata } from "next";
import ResumeView from "./ResumeView";

// Composant serveur : permet d'exporter des métadonnées, le CV interactif reste client
export const metadata: Metadata = {
  title: "CV - Ibrahima Sory Diallo",
  description:
    "CV interactif d'Ibrahima Sory Diallo, développeur Full-Stack à Dakar : expériences, formation, compétences et CV PDF à télécharger.",
  alternates: { canonical: "/cv" },
};

export default function ResumePage() {
  return <ResumeView />;
}
