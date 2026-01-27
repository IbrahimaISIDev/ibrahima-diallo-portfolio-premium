"use client";

import { motion } from "framer-motion";
import { Code2, Briefcase, GraduationCap, Heart } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { skills } from "@/data/skills";
import SectionTitle from "@/components/shared/SectionTitle";
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer, progressBar } from "@/lib/animations";

const topSkills = skills
  .sort((a, b) => (b.level ?? 0) - (a.level ?? 0))
  .slice(0, 6);

export default function About() {
  return (
    <section id="about" className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="À propos"
          title="Mon Histoire"
          description="Développeur passionné par l'innovation technologique et l'entrepreneuriat en Afrique."
        />

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left - Image */}
          <motion.div
            className="space-y-6"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-background p-1">
              <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br from-surface to-surface-light">
                <div className="space-y-3 text-center">
                  <Code2 size={48} className="mx-auto text-secondary" />
                  <p className="text-sm text-muted">Photo à ajouter</p>
                </div>
              </div>
              {/* Experience badge */}
              <motion.div
                className="absolute bottom-6 left-6 rounded-xl bg-background/90 px-5 py-3 shadow-xl backdrop-blur-sm border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="font-display text-3xl font-bold text-secondary">
                  {personalInfo.stats.experience}
                </p>
                <p className="text-xs font-medium text-muted">
                  Années d&apos;expérience
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="space-y-8"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-foreground">
                {personalInfo.title} {personalInfo.subtitle}
              </h3>
              <p className="leading-relaxed text-muted">
                Basé à {personalInfo.location}, je combine expertise technique
                et vision entrepreneuriale pour créer des solutions qui ont un
                impact réel. De la conception au déploiement, je m&apos;engage à
                livrer des produits digitaux de qualité.
              </p>
            </div>

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
