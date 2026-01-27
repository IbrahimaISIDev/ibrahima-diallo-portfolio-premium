"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Code2, Target, Zap, GraduationCap, Heart, Briefcase } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { skills } from "@/data/skills";
import SectionTitle from "@/components/shared/SectionTitle";
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer, progressBar } from "@/lib/animations";

const topSkills = skills
  .sort((a, b) => (b.level ?? 0) - (a.level ?? 0))
  .slice(0, 6);

export default function About() {
  const t = useTranslations("About");

  const highlights = [
    {
      icon: Code2,
      title: t("experience"),
      text: personalInfo.stats.experience + " ans d'expertise",
    },
    {
      icon: Target,
      title: t("projects"),
      text: personalInfo.stats.projects + "+ réalisations",
    },
    {
      icon: Zap,
      title: t("clients"),
      text: personalInfo.stats.clients + " collaborators",
    },
  ];

  return (
    <section id="about" className="py-24 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle={t("subtitle")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Image side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-background p-1 group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.fullName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {/* Experience badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 rounded-2xl bg-secondary p-6 text-background shadow-xl"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="font-display text-4xl font-bold">{personalInfo.stats.experience}+</p>
                <p className="text-sm font-semibold uppercase tracking-wider opacity-80">
                  {t("experience")}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-foreground">
                {t("intro")}
              </h3>
              <p className="text-lg leading-relaxed text-muted">
                {personalInfo.tagline}
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: Code2, text: "Excellence technique" },
                { icon: Heart, text: "Innovation sociale" },
                { icon: Briefcase, text: "Entrepreneuriat" },
                { icon: GraduationCap, text: "Apprentissage continu" },
              ].map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  variants={fadeInUp}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
                    <Icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Skills progress bars */}
            <div className="space-y-5">
              <h4 className="font-display text-lg font-semibold text-foreground">
                Compétences clés
              </h4>
              {topSkills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {skill.name}
                    </span>
                    <span className="text-sm text-secondary">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-background">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      variants={progressBar(skill.level ?? 0)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-2">
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-accent-light"
                whileHover={{ scale: 1.04, boxShadow: "0 10px 30px rgba(220,38,38,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Hire Me!
              </motion.a>
              <motion.a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/20 px-6 py-3 font-semibold text-foreground transition-colors duration-300 hover:border-secondary hover:text-secondary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                Mes Projets
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
