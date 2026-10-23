import ContactCta from "@/components/home/ContactCta";
import Expertise from "@/components/home/Expertise";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HeroBento from "@/components/home/HeroBento";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import Container from "@/components/ui/Container";
import { getContent } from "@/content";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { notFound } from "next/navigation";

// Titre, description, URL canonique et hreflang de l'accueil viennent du layout
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const content = getContent(lang);
  const dict = getDictionary(lang);

  return (
    <main id="main">
      <Container>
        <HeroBento content={content} dict={dict} />
        <FeaturedProjects content={content} dict={dict} />
        <Expertise content={content} dict={dict} />
        <Services content={content} dict={dict} />
        <Testimonials content={content} dict={dict} />
        <ContactCta content={content} dict={dict} />
      </Container>
    </main>
  );
}
