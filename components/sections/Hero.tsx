"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, Download, Calendar } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { heroStagger, heroChild } from "@/lib/animations";
import MagneticButton from "@/components/shared/MagneticButton";
import Link from "next/link";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  // Met en pause les anneaux et l'indicateur de défilement une fois le Hero quitté
  const inView = useInView(ref);

  return (
    <section
      ref={ref}
      data-paused={!inView}
      id="accueil"
      className="relative flex min-h-[90vh] items-center overflow-hidden pt-20"
    >
      <motion.div
        style={{ opacity, scale }}
        className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-16">
          {/* Text Content */}
          <motion.div
            className="flex-1 space-y-8 text-center lg:text-left"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={heroChild} className="space-y-4">
              <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold tracking-wider text-secondary">
                Bonjour, je suis Ibrahima
              </span>
              <h1 className="font-display text-5xl font-bold leading-tight text-foreground sm:text-7xl">
                Ibrahima{" "}
                <span className="bg-gradient-to-r from-secondary via-secondary-light to-secondary bg-clip-text text-transparent animate-gradient-x">
                  Sory Diallo
                </span>
              </h1>
              <p className="text-2xl font-medium text-muted text-balance sm:text-3xl">
                {personalInfo.headline}
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={heroChild}
              className="mx-auto max-w-xl text-lg leading-relaxed text-muted lg:mx-0"
            >
              {personalInfo.heroTagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={heroChild}
              className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <MagneticButton>
                <a
                  href="#contact"
                  className="group flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-white transition-all hover:bg-primary-light hover:shadow-xl hover:shadow-primary/20"
                >
                  Me contacter
                  <ArrowRight
                    className="transition-transform group-hover:translate-x-1"
                    size={20}
                  />
                </a>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/cv"
                  className="group flex items-center gap-2 rounded-full border-2 border-border px-8 py-4 font-bold text-foreground transition-all hover:border-foreground hover:bg-surface"
                >
                  Mon CV Interactif
                  <Download size={20} className="transition-transform group-hover:-translate-y-1" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a
                  href={personalInfo.social.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border-2 border-secondary/30 bg-secondary/5 px-8 py-4 font-bold text-secondary transition-all hover:border-secondary hover:bg-secondary/10"
                >
                  Réserver un appel
                  <Calendar size={20} className="transition-transform group-hover:scale-110" />
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Photo : compacte au-dessus du nom sur mobile, grande à droite sur écran large */}
          <motion.div
            className="relative order-first flex justify-center lg:order-none"
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Decorative borders */}
              <div className="absolute -inset-4 hidden rounded-full border-2 border-dashed border-secondary/20 animate-[spin_40s_linear_infinite] lg:block" />
              <div className="absolute -inset-8 hidden rounded-full border border-primary/10 animate-[spin_60s_linear_infinite_reverse] lg:block" />

              {/* Photo container */}
              <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-surface to-surface-light border-4 border-surface shadow-2xl sm:h-44 sm:w-44 lg:h-[400px] lg:w-[400px] xl:h-[450px] xl:w-[450px]">
                <div className="flex h-full w-full items-center justify-center">
                  <motion.div
                    className="relative h-full w-full"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Image
                      src={personalInfo.profileImage}
                      alt={personalInfo.fullName}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 639px) 128px, (max-width: 1023px) 176px, 450px"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -left-4 top-1/4 hidden rounded-xl lg:block bg-surface/90 px-4 py-3 shadow-xl backdrop-blur-sm border border-border"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-xs text-muted">Pratique</p>
                <p className="font-display text-xl font-bold text-secondary">
                  {personalInfo.stats.yearsOfPractice}+
                  <span className="text-sm text-muted"> ans</span>
                </p>
              </motion.div>

              <motion.div
                className="absolute -right-4 bottom-1/4 hidden rounded-xl lg:block bg-surface/90 px-4 py-3 shadow-xl backdrop-blur-sm border border-border"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-xs text-muted">En production</p>
                <p className="font-display text-xl font-bold text-primary-text">
                  {personalInfo.stats.projectsInProduction}
                  <span className="text-sm text-muted"> projets</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted transition-colors duration-300 hover:text-secondary"
          aria-label="Défiler vers la suite"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Défiler</span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted/30 p-1">
            <div className="h-2 w-1 animate-bounce rounded-full bg-secondary" />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
