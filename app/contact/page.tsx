import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact - Ibrahima Sory Diallo",
  description:
    "Contactez-moi pour discuter de votre projet. Développeur Full-Stack disponible pour freelance, basé à Dakar, Sénégal.",
};

export default function ContactPage() {
  return (
    <main className="pt-20">
      <Contact />
    </main>
  );
}
