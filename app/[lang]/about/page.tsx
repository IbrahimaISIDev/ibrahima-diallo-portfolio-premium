import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Award, BookOpen, Code2, Globe2, Languages, MapPin, ShieldCheck } from "lucide-react";
import Timeline from "@/components/about/Timeline";
import ContactCta from "@/components/home/ContactCta";
import Reveal from "@/components/motion/Reveal";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { Chip, Eyebrow, SectionHeader } from "@/components/ui/Typography";
import { getContent } from "@/content";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const { meta } = getDictionary(locale);
  return pageMetadata({
    title: meta.aboutTitle,
    description: meta.aboutDescription,
    path: "/about",
    locale,
  });
}

// Icône de chaque valeur, dans l'ordre du dictionnaire
const valueIcons = [Code2, Globe2, ShieldCheck, BookOpen];

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const content = getContent(lang);
  const dict = getDictionary(lang);
  const { profile, experiences, skillGroups } = content;
  const { about, hero, home } = dict;
  const work = experiences.filter((item) => item.type === "work");
  const education = experiences.filter((item) => item.type === "education");

  return (
    <main id="main">
      <Container>
        <section
          aria-labelledby="about-title"
          className="grid gap-3 pt-6 sm:gap-4 sm:pt-8 lg:grid-cols-12"
        >
          <Card className="rise flex flex-col gap-6 p-7 sm:p-10 lg:col-span-7 lg:p-12">
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <h1
              id="about-title"
              className="font-display text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.045em] text-ink"
            >
              {profile.fullName}
            </h1>
            <p className="font-display text-lg font-medium text-gold-ink sm:text-xl">
              {profile.headline}
            </p>
            <p className="text-base leading-relaxed text-ink-soft sm:text-[17px]">
              {profile.summary}
            </p>
            <ul className="mt-auto flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6 text-sm text-ink-muted">
              <li className="flex items-center gap-2">
                <MapPin size={16} aria-hidden="true" className="text-gold-ink" />
                {profile.location}
              </li>
              <li className="flex items-center gap-2">
                <Languages size={16} aria-hidden="true" className="text-gold-ink" />
                <span>
                  <span className="sr-only">{hero.languages} : </span>
                  {profile.languages}
                </span>
              </li>
              <li className="flex items-center gap-2 text-leaf-ink">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-leaf-ink" />
                {hero.available}
              </li>
            </ul>
          </Card>

          <Card
            className="rise relative min-h-[420px] overflow-hidden lg:col-span-5"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <Image
              src={profile.photo}
              alt={hero.photoAlt}
              fill
              priority
              sizes="(min-width: 1240px) 500px, (min-width: 1024px) 42vw, 100vw"
              className="object-cover object-[55%_30%]"
            />
          </Card>
        </section>

        <section aria-labelledby="achievements-title" className="pt-24 sm:pt-32">
          <Reveal>
            <SectionHeader
              id="achievements-title"
              eyebrow={about.achievementsEyebrow}
              title={about.achievementsTitle}
            />
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {profile.achievements.map((achievement, index) => (
              <Reveal key={achievement.title} index={index}>
                <Card as="li" size="md" className="flex h-full flex-col gap-4 p-6 sm:p-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/12 text-gold-ink">
                    <Award size={20} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg leading-snug font-bold tracking-[-0.02em] text-ink">
                    {achievement.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-ink-muted">{achievement.desc}</p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </section>

        <section aria-labelledby="path-title" className="pt-24 sm:pt-32">
          <Reveal>
            <SectionHeader
              id="path-title"
              eyebrow={home.pathEyebrow}
              title={about.pathTitle}
              description={about.pathText}
            />
          </Reveal>
          <div className="mt-8 grid gap-3 sm:gap-4 lg:grid-cols-2">
            {[
              { title: about.work, items: work },
              { title: about.education, items: education },
            ].map((column, index) => (
              <Reveal key={column.title} index={index}>
                <Card className="flex h-full flex-col gap-8 p-7 sm:p-9">
                  <h3 className="font-mono text-xs tracking-[0.12em] text-gold-ink uppercase">
                    {column.title}
                  </h3>
                  <Timeline items={column.items} />
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="values-title" className="pt-24 sm:pt-32">
          <Reveal>
            <SectionHeader
              id="values-title"
              eyebrow={about.valuesEyebrow}
              title={about.valuesTitle}
            />
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {about.values.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <Reveal key={value.title} index={index}>
                  <Card as="li" size="md" className="flex h-full flex-col gap-4 p-6 sm:p-7">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-card-2 text-gold-ink">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-ink">
                      {value.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-ink-muted">{value.text}</p>
                  </Card>
                </Reveal>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="skills-title" className="pt-24 sm:pt-32">
          <Reveal>
            <SectionHeader
              id="skills-title"
              eyebrow={home.expertiseEyebrow}
              title={about.skillsTitle}
              description={about.skillsText}
            />
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <Reveal key={group.id} index={index % 3}>
                <Card as="li" size="md" className="flex h-full flex-col gap-4 p-6 sm:p-7">
                  <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-ink">
                    {group.label}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Chip className="px-3 py-1.5 text-[13px]">{item}</Chip>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </ul>
        </section>

        <ContactCta content={content} dict={dict} />
      </Container>
    </main>
  );
}
