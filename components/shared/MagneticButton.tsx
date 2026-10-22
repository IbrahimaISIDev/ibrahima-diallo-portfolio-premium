"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
}

const spring = { stiffness: 150, damping: 15, mass: 0.1 };

export default function MagneticButton({
    children,
    className = "",
    strength = 40,
}: MagneticButtonProps) {
    const mouseRef = useRef<HTMLDivElement>(null);
    // Valeurs de mouvement : le déplacement suit la souris sans re-rendu React
    const x = useSpring(useMotionValue(0), spring);
    const y = useSpring(useMotionValue(0), spring);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = mouseRef.current!.getBoundingClientRect();

        x.set((e.clientX - (left + width / 2)) * (strength / 100));
        y.set((e.clientY - (top + height / 2)) * (strength / 100));
    };

    const resetPosition = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={mouseRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetPosition}
            style={{ x, y }}
        >
            {children}
        </motion.div>
    );
}
