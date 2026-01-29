"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Github, Info } from "lucide-react";
import { projects, projectCategories } from "@/data/projects";
import SectionTitle from "@/components/shared/SectionTitle";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SpotlightCard from "@/components/shared/SpotlightCard";
import ParallaxImage from "@/components/shared/ParallaxImage";

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
                className="group relative h-full"
              >
                <SpotlightCard className="h-full border-border bg-surface hover:border-secondary/50 overflow-hidden" spotlightColor="rgba(245, 158, 11, 0.1)">
                  {/* Image/Video Container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ParallaxImage
                      src={project.image}
                      alt={project.title}
                      title={project.title}
                    />

                    {/* Video Hover Overlay */}
                    {project.video && (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                    )}

                    {/* Status Badge */}
                    {project.status && (
                      <div className="absolute left-4 top-4 z-20">
                        <span className={cn(
                          "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md",
                          project.status === "Live"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-secondary/20 text-secondary border border-secondary/30"
                        )}>
                          {project.status === "Live" ? "● Live" : project.status}
                        </span>
                      </div>
                    )}

                    {/* Actions Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 bg-background/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 z-30">
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
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-bold text-muted-dark italic">
                        {project.tags.length}+ Stack Items
                      </span>
                    </div>

                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="font-display text-xl font-bold text-foreground hover:text-secondary transition-colors leading-tight">
                        {project.title}
                      </h3>
                    </Link>

                    <p className="text-sm leading-relaxed text-muted line-clamp-2 font-medium opacity-80">
                      {project.description}
                    </p>

                    {/* Tags (Bottom) */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40 mt-auto">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-black uppercase tracking-wider text-muted-dark hover:text-secondary transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-[9px] font-black text-muted-dark/50 italic">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
