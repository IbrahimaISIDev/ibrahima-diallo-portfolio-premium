"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Désactive les animations Framer Motion quand l'utilisateur a activé
// « réduire les animations » dans son système (prefers-reduced-motion)
export default function MotionProvider({ children }: { children: ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
