import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import ProcessSection from "@/components/sections/ProcessSection";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Freelancing from "@/components/sections/Freelancing";
import Contact from "@/components/sections/Contact";
import type { Metadata } from "next";

// Titre, description et OG viennent du layout racine ; seule l'URL canonique est propre à l'accueil
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Stats />
      <About />
      <ProcessSection />
      <Portfolio />
      <Testimonials />
      <Freelancing />
      <Contact />
    </main>
  );
}
