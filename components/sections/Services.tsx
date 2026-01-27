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
import { useTranslations } from "next-intl";
import { services } from "@/data/services";
import SectionTitle from "@/components/shared/SectionTitle";
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
  const t = useTranslations("Services");

  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle={t("subtitle")}
          title={t("title")}
          description={t("description")}
        />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            // Match service.icon from data/services to the key in fr.json/en.json if possible
            // For now mapping manually or using keys
            const serviceKey = service.icon.toLowerCase();
            return (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors duration-300 hover:border-secondary/50 hover:shadow-xl hover:shadow-secondary/5"
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-background">
                  {Icon && <Icon size={28} />}
                </div>

                {/* Content */}
                <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                  {t(`items.${serviceKey}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {t(`items.${serviceKey}.description`)}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-secondary to-accent transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
