"use client";

import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { type LucideIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MouseEvent } from "react";

interface FlippableCardProps {
    title: string;
    description: string;
    technologies: string[];
    Icon: LucideIcon;
}

export default function FlippableCard({
    title,
    description,
    technologies,
    Icon,
}: FlippableCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    function handleFlip() {
        if (!isAnimating) {
            setIsFlipped(!isFlipped);
            setIsAnimating(true);
        }
    }

    return (
        <div
            className="group relative h-[320px] w-full cursor-pointer"
            style={{ perspective: "1000px" }}
            onMouseEnter={() => !isAnimating && setIsFlipped(true)}
            onMouseLeave={() => !isAnimating && setIsFlipped(false)}
        >
            <motion.div
                className="relative h-full w-full transition-all duration-500"
                style={{ transformStyle: "preserve-3d" }}
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                onAnimationComplete={() => setIsAnimating(false)}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0"
                    style={{ backfaceVisibility: "hidden" }}
                    onMouseMove={handleMouseMove}
                >
                    <div className="h-full relative overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-lg transition-colors duration-300 group-hover:border-secondary/50 group-hover:shadow-secondary/5 flex flex-col justify-between">
                        <motion.div
                            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{
                                background: useMotionTemplate`
                                    radial-gradient(
                                        400px circle at ${mouseX}px ${mouseY}px,
                                        rgba(245, 158, 11, 0.1),
                                        transparent 80%
                                    )
                                `,
                            }}
                        />
                        <div className="relative z-10">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                                {Icon && <Icon size={28} />}
                            </div>
                            <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                                {title}
                            </h3>
                            <p className="text-sm leading-relaxed text-muted">
                                {description}
                            </p>
                        </div>

                        <div className="relative z-10 flex items-center gap-2 text-sm font-medium text-secondary">
                            Voir les technologies
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </div>

                        {/* Bottom Accent */}
                        <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-secondary to-accent transition-all duration-500 group-hover:w-full" />
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                    }}
                    onMouseMove={handleMouseMove}
                >
                    <div className="h-full relative overflow-hidden flex flex-col justify-center items-center rounded-2xl border border-secondary bg-surface p-8 shadow-xl text-center bg-gradient-to-br from-surface to-surface-light">
                        <motion.div
                            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{
                                background: useMotionTemplate`
                                    radial-gradient(
                                        400px circle at ${mouseX}px ${mouseY}px,
                                        rgba(59, 130, 246, 0.1),
                                        transparent 80%
                                    )
                                `,
                            }}
                        />
                        <div className="relative z-10 w-full flex flex-col items-center">
                            <h4 className="mb-6 font-display text-lg font-bold text-foreground">Technologies</h4>
                            <div className="flex flex-wrap justify-center gap-2">
                                {technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full bg-secondary/10 px-3 py-1.5 text-xs font-semibold text-secondary"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
