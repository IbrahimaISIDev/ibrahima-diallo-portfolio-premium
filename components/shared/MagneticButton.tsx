"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
}

export default function MagneticButton({
    children,
    className = "",
    strength = 40,
}: MagneticButtonProps) {
    const mouseRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = mouseRef.current!.getBoundingClientRect();

        const x = (clientX - (left + width / 2)) * (strength / 100);
        const y = (clientY - (top + height / 2)) * (strength / 100);

        setPosition({ x, y });
    };

    const resetPosition = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={mouseRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetPosition}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
}
