"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Server,
  ShoppingCart,
  Palette,
  Cloud,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";
import SectionTitle from "@/components/shared/SectionTitle";
import FlippableCard from "./FlippableCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Smartphone,
  Server,
  ShoppingCart,
  Palette,
  Cloud,
};

export default function Services() {
  return (
    <section id="services" className="py-24">
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
