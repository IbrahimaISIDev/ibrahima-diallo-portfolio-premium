"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Github, Info } from "lucide-react";
import { projects, projectCategories } from "@/data/projects";
import SectionTitle from "@/components/shared/SectionTitle";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredProjects =
    activeCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Mon travail"
          title="Portfolio"
          description="Découvrez mes réalisations récentes, du web au mobile en passant par le e-commerce."
        />

        {/* Filters */}
        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 cursor-pointer overflow-hidden",
                activeCategory === category
                  ? "text-background"
                  : "bg-surface text-muted hover:bg-surface-light hover:text-foreground"
              )}
            >
              <span className="relative z-10">{category}</span>
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-secondary shadow-lg shadow-secondary/25"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-secondary/50 hover:shadow-xl hover:shadow-secondary/5"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-surface-light to-background">
                  <motion.div
                    className="flex h-full items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="font-display text-2xl font-bold text-muted/30">
                      {project.title}
                    </span>
                  </motion.div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition-transform"
                        aria-label={`Détails de ${project.title}`}
                      >
                        <Info size={20} />
                      </Link>
                    </motion.div>

                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-background transition-transform"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Voir ${project.title} en ligne`}
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background transition-transform"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Code source de ${project.title}`}
                      >
                        <Github size={20} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wider text-secondary">
                      {project.category}
                    </span>
                  </div>
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="font-display text-lg font-semibold text-foreground hover:text-secondary transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-sm leading-relaxed text-muted line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-background px-3 py-1 text-xs font-medium text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
