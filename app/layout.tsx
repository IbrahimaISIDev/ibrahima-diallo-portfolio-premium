import type { Metadata } from "next";
import { Sora, DM_Sans, JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/shared/CustomCursor";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import MotionProvider from "@/components/shared/MotionProvider";
import { siteConfig } from "@/lib/constants";
import { personalInfo } from "@/data/personal";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: personalInfo.fullName }],
  creator: personalInfo.fullName,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: `${siteConfig.name} - Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
    // L'image est fournie par app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

// Données structurées schema.org : identité, poste et profils pour les moteurs de recherche
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.fullName,
  jobTitle: personalInfo.title,
  url: siteConfig.url,
  image: `${siteConfig.url}${personalInfo.profileImage}`,
  email: `mailto:${personalInfo.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dakar",
    addressCountry: "SN",
  },
  sameAs: [personalInfo.social.linkedin, personalInfo.social.github],
  worksFor: { "@type": "Organization", name: "Nixacom" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Institut Supérieur d'Informatique (ISI)" },
    { "@type": "EducationalOrganization", name: "Sonatel Academy — Orange Digital Center" },
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Angular",
    "TypeScript",
    "Node.js",
    "NestJS",
    "Java",
    "Spring Boot",
    "Laravel",
    "Flutter",
    "React Native",
    "PostgreSQL",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          // Contenu statique ; "<" échappé pour ne jamais pouvoir fermer la balise script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>
            <a
              href="#main"
              className="sr-only rounded-full bg-secondary px-5 py-2.5 font-semibold text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000]"
            >
              Aller au contenu
            </a>
            <CustomCursor />
            <Header />
            {children}
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
