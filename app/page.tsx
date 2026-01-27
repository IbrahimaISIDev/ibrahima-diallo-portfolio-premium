import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Freelancing from "@/components/sections/Freelancing";
import BlogPreview from "@/components/sections/BlogPreview";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Stats />
      <About />
      <Portfolio />
      <Testimonials />
      <Freelancing />
      <BlogPreview />
      <Contact />
    </main>
  );
}
