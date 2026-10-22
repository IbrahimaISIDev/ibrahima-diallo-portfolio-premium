"use client";

import React, { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(59, 130, 246, 0.15)",
  enableTilt = true,
}: SpotlightCardProps) {
  // Position du curseur en pixels, pour le halo lumineux
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Position relative dans la carte (0 à 1) pour l'inclinaison : 0.5 = centre = carte à plat.
  // Indépendant de la taille réelle de la carte, contrairement à des bornes fixes en pixels.
  const tiltX = useMotionValue(0.5);
  const tiltY = useMotionValue(0.5);

  // Tilt values with smooth springs (up to 15 degrees at the edges)
  const rotateX = useSpring(useTransform(tiltY, [0, 1], [15, -15]), {
    damping: 20,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(tiltX, [0, 1], [-15, 15]), {
    damping: 20,
    stiffness: 200,
  });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    tiltX.set((clientX - left) / width);
    tiltY.set((clientY - top) / height);
  }

  function handleMouseLeave() {
    // Retour à plat
    tiltX.set(0.5);
    tiltY.set(0.5);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
      }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border bg-surface/50 transition-all duration-300",
        className,
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
