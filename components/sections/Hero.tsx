"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Download, Github, Linkedin, MousePointer2, Briefcase } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { heroStagger, heroChild } from "@/lib/animations";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background gradient mesh */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-secondary/8 blur-[120px]"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[120px]"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Geometric pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            currentColor 35px,
            currentColor 36px
          )`,
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <motion.div
            className="space-y-8"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={heroChild}
              className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary"
            >
              <span className="h-2 w-2 rounded-full bg-secondary" />
              Bonjour, je suis
            </motion.div>

            {/* Name */}
            <motion.div variants={heroChild} className="space-y-4">
              <h1 className="font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                <motion.span
                  className="text-foreground inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {personalInfo.firstName}
                </motion.span>
                <br />
                <motion.span
                  className="bg-gradient-to-r from-secondary via-accent to-secondary bg-[length:200%_auto] bg-clip-text text-transparent inline-block"
                  animate={{
                    backgroundPosition: ["0% center", "200% center"]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {personalInfo.lastName}
                </motion.span>
              </h1>
              <p className="font-display text-xl font-medium text-muted sm:text-2xl">
                {personalInfo.title}{" "}
                <motion.span
                  className="text-secondary"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {personalInfo.subtitle}
                </motion.span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={heroChild}
              className="max-w-lg text-lg leading-relaxed text-muted"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={heroChild} className="flex flex-wrap gap-4">
              <motion.a
                href="/cv/ibrahima-cv.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-semibold text-white transition-colors duration-300 hover:bg-primary-light"
                whileHover={{ scale: 1.04, boxShadow: "0 10px 30px rgba(27,94,32,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={18} />
                Download CV
              </motion.a>
              <motion.a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/20 px-8 py-3.5 font-semibold text-foreground transition-colors duration-300 hover:border-secondary hover:text-secondary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                <Briefcase size={18} />
                My Work
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side - Photo placeholder */}
          <motion.div
            className="relative hidden lg:flex lg:justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Decorative border */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-secondary/20 animate-[spin_40s_linear_infinite]" />
              <div className="absolute -inset-8 rounded-full border border-primary/10 animate-[spin_60s_linear_infinite_reverse]" />

              {/* Photo container */}
              <div className="relative h-[400px] w-[400px] overflow-hidden rounded-full bg-gradient-to-br from-surface to-surface-light xl:h-[450px] xl:w-[450px] border-4 border-surface shadow-2xl">
                <div className="flex h-full w-full items-center justify-center">
                  <motion.div
                    className="relative h-full w-full"
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Image
                      src={personalInfo.profileImage}
                      alt={personalInfo.fullName}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 400px, 450px"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -left-4 top-1/4 rounded-xl bg-surface/90 px-4 py-3 shadow-xl backdrop-blur-sm border border-border"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-xs text-muted">Expérience</p>
                <p className="font-display text-xl font-bold text-secondary">
                  {personalInfo.stats.experience}
                  <span className="text-sm text-muted"> ans</span>
                </p>
              </motion.div>

              <motion.div
                className="absolute -right-4 bottom-1/4 rounded-xl bg-surface/90 px-4 py-3 shadow-xl backdrop-blur-sm border border-border"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <p className="text-xs text-muted">Projets</p>
                <p className="font-display text-xl font-bold text-primary-light">
                  {personalInfo.stats.projects}
                  <span className="text-sm text-muted">+</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted transition-colors duration-300 hover:text-secondary"
          aria-label="Scroll down"
        >
          <span className="text-xs font-medium uppercase tracking-widest">
            Scroll
          </span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted/30 p-1">
            <div className="h-2 w-1 animate-bounce rounded-full bg-secondary" />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
