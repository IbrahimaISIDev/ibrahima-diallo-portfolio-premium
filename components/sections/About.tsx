"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code2, Target, Zap, GraduationCap, Heart, Briefcase } from "lucide-react";
import { personalInfo } from "@/data/personal";
import SectionTitle from "@/components/shared/SectionTitle";
import ExperienceTimeline from "./ExperienceTimeline";
import SkillsWall from "./SkillsWall";
import MagneticButton from "@/components/shared/MagneticButton";
import InfiniteMarquee from "@/components/shared/InfiniteMarquee";
import MaskedReveal from "@/components/shared/MaskedReveal";
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
    <section id="about" className="py-24 bg-surface/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="À propos"
          title="Travaillons ensemble"
          description="Développeur passionné par l'innovation technologique et l'entrepreneuriat en Afrique."
        />

        <div className="mt-16 flex flex-col items-center">
          {/* Main narrative content */}
          <motion.div
            className="max-w-4xl space-y-12 text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <h3 className="text-3xl font-display font-bold text-foreground sm:text-4xl">
                Je combine expertise technique et vision entrepreneuriale pour créer des solutions qui ont un impact réel.
              </h3>
              <p className="text-xl leading-relaxed text-muted mx-auto max-w-3xl">
                {personalInfo.tagline}
              </p>
            </motion.div>

            {/* Values Banner */}
            <motion.div
              className="flex flex-wrap justify-center gap-6"
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
                  className="flex items-center gap-3 rounded-full bg-surface-light/50 px-6 py-3 border border-border/50"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
                    <Icon size={16} />
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Group */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <MagneticButton>
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-accent-light shadow-xl shadow-accent/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Me recruter
                </motion.a>
              </MagneticButton>
              <MagneticButton>
                <motion.a
                  href="#portfolio"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/20 px-8 py-4 font-bold text-foreground transition-all duration-300 hover:border-secondary hover:text-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Mes Projets
                </motion.a>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* Technical Stack Section (Full Width Bento) */}
        <div className="mt-32 space-y-12">
          <div className="text-center space-y-4">
            <MaskedReveal>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-secondary">Expertise</span>
            </MaskedReveal>
            <MaskedReveal delay={0.1}>
              <h4 className="text-3xl font-display font-bold text-foreground">Écosystème Technique</h4>
            </MaskedReveal>
          </div>

          <InfiniteMarquee
            items={["Next.js", "Flutter", "NestJS", "TypeScript", "Node.js", "Firebase", "PostgreSQL", "Laravel", "React Native", "Docker"]}
            speed={40}
          />

          <SkillsWall />
        </div>

        {/* Path Timeline */}
        <ExperienceTimeline />
      </div>
    </section>
  );
}
