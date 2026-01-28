"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code2, Target, Zap, GraduationCap, Heart, Briefcase } from "lucide-react";
import { personalInfo } from "@/data/personal";
import SectionTitle from "@/components/shared/SectionTitle";
import ExperienceTimeline from "./ExperienceTimeline";
import SkillsWall from "./SkillsWall";
import MagneticButton from "@/components/shared/MagneticButton";
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer } from "@/lib/animations";

export default function About() {
  const highlights = [
    {
      icon: Code2,
      title: "Expérience",
      text: personalInfo.stats.experience + " ans d'expertise",
    },
    {
      icon: Target,
      title: "Projets",
      text: personalInfo.stats.projects + "+ réalisations",
    },
    {
      icon: Zap,
      title: "Clients",
      text: personalInfo.stats.clients + " collaborateurs",
    },
  ];

  return (
    <section id="about" className="py-24 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="À propos"
          title="Travaillons ensemble"
          description="Développeur passionné par l'innovation technologique et l'entrepreneuriat en Afrique."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Image side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-background p-1.5 group shadow-2xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.fullName}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60" />
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
                  Ans d'expérience
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
                Basé à Dakar, je combine expertise technique et vision entrepreneuriale pour créer des solutions qui ont un impact réel.
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

            {/* Visual Skills Wall */}
            <div className="pt-4">
              <h4 className="mb-6 font-display text-lg font-semibold text-foreground">
                Compétences & Expertise
              </h4>
              <SkillsWall />
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <MagneticButton>
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-accent-light"
                  whileHover={{ scale: 1.04, boxShadow: "0 10px 30px rgba(220,38,38,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  J'ai besoin d'un dev !
                </motion.a>
              </MagneticButton>
              <MagneticButton>
                <motion.a
                  href="#portfolio"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/20 px-6 py-3 font-semibold text-foreground transition-colors duration-300 hover:border-secondary hover:text-secondary"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Mes Projets
                </motion.a>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* Path Timeline */}
        <ExperienceTimeline />
      </div>
    </section>
  );
}
