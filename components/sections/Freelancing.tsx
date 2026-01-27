"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import MagneticButton from "@/components/shared/MagneticButton";

export default function Freelancing() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-dark via-primary to-primary-light px-8 py-16 text-center sm:px-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative pattern */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "32px 32px"]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <motion.div
            className="relative space-y-6"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
              Vous avez un projet ?
            </p>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Je suis disponible pour du Freelancing
            </h2>
            <p className="mx-auto max-w-lg text-lg text-white/80">
              Du développement web au mobile, je vous accompagne dans la
              réalisation de vos projets digitaux.
            </p>
            <MagneticButton className="inline-flex">
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3.5 font-semibold text-background transition-all duration-300 hover:bg-secondary-light hover:shadow-lg hover:shadow-secondary/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Me contacter
                <ArrowRight size={18} />
              </motion.a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
