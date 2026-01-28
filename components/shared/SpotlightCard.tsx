"use client";

import React, { useRef, useState, MouseEvent } from "react";
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
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Tilt values with smooth springs (increased intensity to 15 degrees)
    const rotateX = useSpring(useTransform(mouseY, [0, 400], [15, -15]), { damping: 20, stiffness: 200 });
    const rotateY = useSpring(useTransform(mouseX, [0, 600], [-15, 15]), { damping: 20, stiffness: 200 });

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    function handleMouseLeave() {
        // Reset tilt on leave
        mouseX.set(300);
        mouseY.set(200);
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
                className
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
