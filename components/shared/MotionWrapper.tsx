"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
}

export default function MotionWrapper({
  children,
  variants,
  className,
  delay = 0,
  once = true,
  amount = 0.2,
}: MotionWrapperProps) {
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay },
    },
  };

  return (
    <motion.div
      variants={variants || defaultVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
