"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Server,
  ShoppingCart,
  Palette,
  Cloud,
  Code2,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";
import SectionTitle from "@/components/shared/SectionTitle";
import FlippableCard from "./FlippableCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Smartphone,
  Server,
  ShoppingCart,
  Palette,
  Cloud,
};

export default function Services() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} id="services" className="relative py-24 overflow-hidden">
      {/* Background Storytelling elements */}
      <motion.div style={{ y: y1 }} className="absolute -top-10 left-[10%] opacity-5 text-secondary pointer-events-none hidden xl:block">
        <Code2 size={200} />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute -bottom-10 right-[5%] opacity-5 text-primary-light pointer-events-none hidden xl:block">
        <Smartphone size={300} />
      </motion.div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Ce que je fais"
          title="Mes Services"
          description="Des solutions complètes pour concrétiser vos projets digitaux, du design au déploiement."
        />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeInUp}>
              <FlippableCard
                title={service.title}
                description={service.description}
                technologies={service.technologies}
                Icon={iconMap[service.icon]}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
