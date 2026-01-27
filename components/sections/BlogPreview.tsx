"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/data/blog";
import SectionTitle from "@/components/shared/SectionTitle";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function BlogPreview() {
  return (
    <section id="blog" className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Blog"
          title="Derniers Articles"
          description="Tutoriels, retours d'exp&eacute;rience et r&eacute;flexions sur le d&eacute;veloppement web et l'&eacute;cosyst&egrave;me tech africain."
        />

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.slug}
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:border-secondary/50 hover:shadow-xl hover:shadow-secondary/5"
            >
              {/* Image placeholder */}
              <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-surface-light to-surface">
                <motion.div
                  className="flex h-full items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Tag size={32} className="text-muted/30" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span className="rounded-full bg-secondary/10 px-3 py-1 font-medium text-secondary">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                  <span>
                    {new Date(post.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h3 className="font-display text-lg font-semibold leading-snug text-foreground transition-all group-hover:text-secondary line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted line-clamp-2">
                  {post.excerpt}
                </p>

                <motion.span
                  className="inline-flex items-center gap-1 text-sm font-medium text-secondary transition-all"
                  whileHover={{ gap: "8px" }}
                >
                  Lire la suite
                  <ArrowRight size={14} />
                </motion.span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
