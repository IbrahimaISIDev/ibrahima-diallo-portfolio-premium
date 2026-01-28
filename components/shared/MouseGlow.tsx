"use client";

import React, { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";

export default function MouseGlow() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            animate(mouseX, e.clientX, { type: "spring", damping: 20, stiffness: 200, mass: 0.5 });
            animate(mouseY, e.clientY, { type: "spring", damping: 20, stiffness: 200, mass: 0.5 });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-30 opacity-40 transition-opacity duration-300"
            style={{
                background: useMotionTemplate`
          radial-gradient(
            800px circle at ${mouseX}px ${mouseY}px,
            rgba(59, 130, 246, 0.05),
            transparent 80%
          )
        `,
            }}
        />
    );
}
