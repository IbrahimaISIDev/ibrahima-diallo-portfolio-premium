"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/personal";
import { staggerContainer, counterUp } from "@/lib/animations";

export default function Stats() {
  const stats = [
    { value: personalInfo.stats.clients, label: "Clients satisfaits" },
    { value: personalInfo.stats.projects, label: "Projets terminés", highlight: true },
    { value: personalInfo.stats.experience, label: "Années d'expérience" },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={counterUp}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className={`group flex flex-col items-center rounded-2xl border p-8 text-center transition-colors duration-300 ${stat.highlight
                ? "border-accent/50 bg-accent shadow-lg shadow-accent/10"
                : "border-border bg-surface hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/5"
                }`}
            >
              <span
                className={`font-display text-4xl font-bold sm:text-5xl ${stat.highlight ? "text-white" : "text-foreground"
                  }`}
              >
                {stat.value}
              </span>
              <span
                className={`mt-2 text-sm font-medium ${stat.highlight ? "text-white/80" : "text-muted"
                  }`}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
