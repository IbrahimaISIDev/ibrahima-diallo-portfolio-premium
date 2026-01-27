import type { Metadata } from "next";
import {
  Code2,
  Briefcase,
  GraduationCap,
  Heart,
  MapPin,
  Calendar,
  Languages,
  Gamepad2,
} from "lucide-react";
import { personalInfo } from "@/data/personal";
import { experiences } from "@/data/experience";
import { skills, skillCategories } from "@/data/skills";

export const metadata: Metadata = {
  title: "À propos - Ibrahima Sory Diallo",
  description:
    "Développeur Full-Stack et entrepreneur tech basé à Dakar, Sénégal. Découvrez mon parcours, mes compétences et ma philosophie de travail.",
};

export default function AboutPage() {
  const groupedSkills = Object.entries(skillCategories).map(([key, label]) => ({
    label,
    items: skills.filter((s) => s.category === key),
  }));

  return (
    <main className="pt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mb-24 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo */}
          <div className="relative">
            <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-surface to-surface-light">
              <div className="space-y-4 text-center">
                <Code2 size={64} className="mx-auto text-secondary" />
                <p className="text-muted">Photo à ajouter</p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl border-2 border-secondary/20" />
          </div>

          {/* Intro */}
          <div className="flex flex-col justify-center space-y-6">
            <span className="inline-block w-fit text-sm font-semibold uppercase tracking-widest text-secondary">
              À propos de moi
            </span>
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              {personalInfo.fullName}
            </h1>
            <p className="text-xl text-muted">
              {personalInfo.title} {personalInfo.subtitle}
            </p>
            <p className="leading-relaxed text-muted">
              Basé à {personalInfo.location}, je suis un développeur passionné
              par l&apos;innovation technologique et l&apos;entrepreneuriat en Afrique.
              Je combine expertise technique et vision entrepreneuriale pour
              créer des solutions digitales qui ont un impact réel sur les
              communautés.
            </p>
            <p className="leading-relaxed text-muted">
              Mon parcours, de Sonatel Academy à Saraya Tech en passant par la
              fondation de TerrangaFarm, m&apos;a permis de développer une
              approche unique alliant rigueur technique, créativité et
              compréhension des enjeux africains.
            </p>

            {/* Quick info */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: MapPin, text: personalInfo.location },
                { icon: Languages, text: "Français, Anglais, Peul" },
                { icon: Calendar, text: "Disponible pour projets" },
                { icon: Gamepad2, text: "Sports, Cinéma anglophone" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={18} className="shrink-0 text-secondary" />
                  <span className="text-sm text-muted">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-24">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground">
            Mes Valeurs
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Code2,
                title: "Excellence technique",
                text: "Code propre, architectures solides et bonnes pratiques pour des produits durables.",
              },
              {
                icon: Heart,
                title: "Innovation sociale",
                text: "La technologie au service des communautés africaines et de leur développement.",
              },
              {
                icon: Briefcase,
                title: "Entrepreneuriat",
                text: "Transformer les idées en produits concrets qui résolvent de vrais problèmes.",
              },
              {
                icon: GraduationCap,
                title: "Apprentissage continu",
                text: "Curiosité permanente et veille technologique pour rester à la pointe.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-surface p-6 space-y-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                  <Icon size={24} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-24">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground">
            Mon Parcours
          </h2>
          <div className="relative space-y-8">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-border md:block" />

            {experiences.map((exp, index) => (
              <div key={index} className="relative md:pl-24">
                {/* Timeline dot */}
                <div className="absolute left-[26px] top-8 hidden h-4 w-4 rounded-full border-4 border-secondary bg-background md:block" />

                <div className="rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:border-secondary/50">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-secondary">{exp.company}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-secondary/10 px-4 py-1 text-sm font-medium text-secondary">
                      {exp.period}
                    </span>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-muted">
                    {exp.description}
                  </p>

                  <ul className="mb-6 space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-background px-3 py-1 text-xs font-medium text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-24">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground">
            Compétences Techniques
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {groupedSkills.map((group) => (
              <div
                key={group.label}
                className="rounded-2xl border border-border bg-surface p-6 space-y-5"
              >
                <h3 className="font-display text-lg font-semibold text-secondary">
                  {group.label}
                </h3>
                {group.items.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-background">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="rounded-3xl border border-secondary/30 bg-gradient-to-br from-secondary/5 to-primary/5 p-12">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
              Travaillons ensemble
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-muted">
              Vous avez un projet en tête ? Je suis disponible pour discuter de
              vos besoins et trouver la meilleure solution.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3.5 font-semibold text-background transition-all duration-300 hover:bg-secondary-light hover:shadow-lg hover:shadow-secondary/25"
            >
              Me contacter
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
