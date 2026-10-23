import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download, Globe, Mail, MapPin, Phone } from "lucide-react";
import PrintButton from "@/components/cv/PrintButton";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { Chip, PageHeader } from "@/components/ui/Typography";
import { getContent } from "@/content";
import { siteConfig } from "@/lib/constants";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const { meta } = getDictionary(locale);
  return pageMetadata({
    title: meta.cvTitle,
    description: meta.cvDescription,
    path: "/cv",
    locale,
  });
}

// Titre de rubrique du CV, souligné d'un filet
function SheetHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-line pb-3 font-mono text-xs tracking-[0.14em] text-gold-ink uppercase">
      {children}
    </h2>
  );
}

// CV en une « feuille » : rendu serveur, lisible sans JavaScript et imprimable tel quel
export default async function ResumePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { profile, experiences, skillGroups } = getContent(lang);
  const { cv, nav } = getDictionary(lang);
  const work = experiences.filter((item) => item.type === "work");
  const education = experiences.filter((item) => item.type === "education");
  const siteHost = new URL(siteConfig.url).host;

  const contacts = [
    { icon: MapPin, text: profile.location },
    { icon: Mail, text: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, text: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: Globe, text: siteHost, href: siteConfig.url },
  ];

  return (
    <main id="main">
      <Container>
        <PageHeader eyebrow={nav.cv} title={cv.title} intro={cv.subtitle} className="print:hidden">
          <div className="mt-2 flex flex-wrap gap-3">
            <Button href={profile.cvPdf} download size="lg">
              <Download size={16} aria-hidden="true" />
              {cv.download}
            </Button>
            <PrintButton label={cv.print} />
          </div>
        </PageHeader>

        <Card
          as="article"
          className="rise mt-12 p-6 sm:mt-16 sm:p-10 lg:p-14 print:mt-0 print:border-0 print:p-0"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <header className="flex flex-col justify-between gap-8 border-b border-line pb-10 md:flex-row">
            <div className="flex max-w-2xl flex-col gap-3">
              <p className="font-display text-4xl leading-none font-bold tracking-[-0.04em] text-ink sm:text-5xl">
                {profile.fullName}
              </p>
              <p className="font-display text-lg font-medium text-gold-ink sm:text-xl">
                {profile.headline}
              </p>
            </div>
            <ul className="flex flex-col gap-2.5 text-sm md:items-end">
              {contacts.map(({ icon: Icon, text, href }) => (
                <li
                  key={text}
                  className="flex items-center gap-2.5 text-ink-soft md:flex-row-reverse"
                >
                  <Icon size={15} aria-hidden="true" className="shrink-0 text-gold-ink" />
                  {href ? (
                    <a
                      href={href}
                      className="rounded outline-none hover:text-ink focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </li>
              ))}
            </ul>
          </header>

          <section aria-labelledby="cv-profile" className="flex flex-col gap-4 py-10">
            <SheetHeading>
              <span id="cv-profile">{cv.profile}</span>
            </SheetHeading>
            <p className="text-[15px] leading-relaxed text-ink-soft sm:text-base">
              {profile.summary}
            </p>
          </section>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 print:grid-cols-1">
            <div className="flex flex-col gap-12 lg:col-span-7">
              <section aria-labelledby="cv-experience" className="flex flex-col gap-6">
                <SheetHeading>
                  <span id="cv-experience">{cv.experience}</span>
                </SheetHeading>
                <ol className="flex flex-col gap-9">
                  {work.map((item) => (
                    <li key={item.id} className="flex flex-col gap-2 print:break-inside-avoid">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-ink">
                          {item.title}
                        </h3>
                        <span className="font-mono text-xs text-ink-muted">{item.period}</span>
                      </div>
                      <p className="text-sm font-medium text-gold-ink">{item.organization}</p>
                      <p className="text-[15px] leading-relaxed text-ink-soft">
                        {item.description}
                      </p>
                      <ul className="mt-1 flex list-disc flex-col gap-1.5 pl-5 text-[15px] leading-relaxed text-ink-muted marker:text-gold-ink">
                        {item.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                      <p className="mt-1 font-mono text-xs text-ink-muted">
                        {item.technologies.join(" · ")}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="cv-education" className="flex flex-col gap-6">
                <SheetHeading>
                  <span id="cv-education">{cv.education}</span>
                </SheetHeading>
                <ol className="flex flex-col gap-6">
                  {education.map((item) => (
                    <li key={item.id} className="flex flex-col gap-1 print:break-inside-avoid">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="font-display text-base font-bold tracking-[-0.01em] text-ink">
                          {item.title}
                        </h3>
                        <span className="font-mono text-xs text-ink-muted">{item.period}</span>
                      </div>
                      <p className="text-sm font-medium text-gold-ink">{item.organization}</p>
                      <p className="text-[15px] leading-relaxed text-ink-muted">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <div className="flex flex-col gap-12 lg:col-span-5 lg:border-l lg:border-line lg:pl-12 print:border-0 print:pl-0">
              <section aria-labelledby="cv-skills" className="flex flex-col gap-6">
                <SheetHeading>
                  <span id="cv-skills">{cv.skills}</span>
                </SheetHeading>
                <dl className="flex flex-col gap-6">
                  {skillGroups.map((group) => (
                    <div key={group.id} className="flex flex-col gap-2.5 print:break-inside-avoid">
                      <dt className="text-sm font-semibold text-ink">{group.label}</dt>
                      <dd>
                        <ul className="flex flex-wrap gap-1.5">
                          {group.items.map((item) => (
                            <li key={item}>
                              <Chip className="rounded-lg px-2.5 py-1 text-xs">{item}</Chip>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section aria-labelledby="cv-achievements" className="flex flex-col gap-6">
                <SheetHeading>
                  <span id="cv-achievements">{cv.achievements}</span>
                </SheetHeading>
                <ul className="flex flex-col gap-5">
                  {profile.achievements.map((achievement) => (
                    <li key={achievement.title} className="flex gap-3.5 print:break-inside-avoid">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                      />
                      <span className="flex flex-col gap-0.5">
                        <span className="font-semibold text-ink">{achievement.title}</span>
                        <span className="text-sm leading-relaxed text-ink-muted">
                          {achievement.desc}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </Card>
      </Container>
    </main>
  );
}
