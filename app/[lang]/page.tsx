import ContactCta from "@/components/home/ContactCta";
import Expertise from "@/components/home/Expertise";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HeroBento from "@/components/home/HeroBento";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import Container from "@/components/ui/Container";
import { getContent } from "@/content";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

// Déclarées ici et non seulement dans le layout : au niveau du layout, Next remplace
// l'image de partage par l'adresse interne /fr/opengraph-image (redirigée en 308)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const { meta } = getDictionary(locale);
  return pageMetadata({
    title: meta.homeTitle,
    description: meta.homeDescription,
    path: "/",
    locale,
  });
}

export default async function Home({ params }: Props) {
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
