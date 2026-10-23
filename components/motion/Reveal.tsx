"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  // Rang dans un groupe : décale légèrement l'apparition
  index?: number;
  id?: string;
  // Élément rendu : "li" pour un élément de liste, afin de garder <ul><li> valide
  as?: "div" | "li";
}

// Apparition au défilement : fondu et légère montée, une seule fois.
// Sans JavaScript, globals.css affiche l'élément directement (état initial inline).
export default function Reveal({ children, className, index = 0, id, as = "div" }: RevealProps) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
    >
      {children}
    </Tag>
  );
}
