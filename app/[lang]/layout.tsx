import type { Metadata } from "next";
import { Sora, DM_Sans, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import MotionProvider from "@/components/shared/MotionProvider";
import { getContent } from "@/content";
import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/constants";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import "../globals.css";

// Les variables sont référencées par @theme dans globals.css
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

// Les deux langues sont générées au build ; toute autre valeur de [lang] renvoie une 404
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

// Métadonnées par défaut de chaque langue (celles de l'accueil) : les pages les remplacent
export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const { meta } = getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    keywords: siteConfig.keywords,
    authors: [{ name: profile.fullName }],
    creator: profile.fullName,
    ...pageMetadata({
      title: meta.homeTitle,
      description: meta.homeDescription,
      path: "/",
      locale,
    }),
  };
}

// Données structurées schema.org : identité, poste et profils pour les moteurs de recherche
function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: profile.title[locale],
    url: siteConfig.url,
    image: `${siteConfig.url}${profile.photo}`,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dakar",
      addressCountry: "SN",
    },
    sameAs: [profile.social.linkedin, profile.social.github],
    worksFor: { "@type": "Organization", name: "Nixacom" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Institut Supérieur d'Informatique (ISI)" },
      { "@type": "EducationalOrganization", name: "Sonatel Academy — Orange Digital Center" },
    ],
    knowsAbout: [
      "NestJS",
      "Next.js",
      "React",
      "Angular",
      "TypeScript",
      "Node.js",
      "Spring Boot",
      "Laravel",
      "Flutter",
      "PostgreSQL",
      "Docker",
      "DevOps",
    ],
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const { profile: localizedProfile } = getContent(lang);

  return (
    <html
      lang={lang}
      className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {/* Signale que JavaScript s'exécute : sans cette classe, globals.css affiche
            directement les éléments que les animations au scroll masquent au départ */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          // Contenu statique ; "<" échappé pour ne jamais pouvoir fermer la balise script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd(lang)).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <a
              href="#main"
              className="sr-only rounded-full bg-gold px-5 py-2.5 font-semibold text-on-gold focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
            >
              {dict.a11y.skipToContent}
            </a>
            <SiteHeader locale={lang} nav={dict.nav} a11y={dict.a11y} />
            {children}
            <SiteFooter locale={lang} profile={localizedProfile} dict={dict} />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
