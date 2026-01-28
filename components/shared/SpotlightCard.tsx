"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

export default function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(59, 130, 246, 0.15)", // Default primary-ish glow
}: SpotlightCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            onMouseMove={handleMouseMove}
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
        </div>
    );
}
