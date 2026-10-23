import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = pageMetadata({
  title: "Contact - Ibrahima Sory Diallo",
  description:
    "Contactez-moi pour discuter de votre projet. Développeur Full-Stack disponible pour freelance, basé à Dakar, Sénégal.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main" className="pt-20">
      {/* La section Contact porte un h2 : la page a besoin de son propre h1 */}
      <h1 className="sr-only">Contacter Ibrahima Sory Diallo</h1>
      <Contact />
    </main>
  );
}
