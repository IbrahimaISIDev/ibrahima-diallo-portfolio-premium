"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/data/skills";
import { Code2, Server, Database, Smartphone, Cloud } from "lucide-react";

const categoryIcons = {
    frontend: Code2,
    backend: Server,
    database: Database,
    mobile: Smartphone,
    devops: Cloud,
};

export default function CircularStack() {
    const [screenSize, setScreenSize] = useState({ width: 1200, isMobile: false });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                isMobile: window.innerWidth < 768
            });
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Define rings - [radius, categories]
    const rings = useMemo(() => {
        const scale = screenSize.isMobile ? 0.6 : 1;
        return [
            { radius: 100 * scale, categories: ["frontend"] },
            { radius: 180 * scale, categories: ["backend"] },
            { radius: 260 * scale, categories: ["database", "mobile", "devops"] },
        ];
    }, [screenSize.isMobile]);

    const getPosition = (radius: number, index: number, total: number) => {
        const angle = (index / total) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return { x, y };
    };

    const orbitItems = useMemo(() => {
        return rings.map((ring) => {
            const ringSkills = skills.filter((s) => ring.categories.includes(s.category));
            return ringSkills.map((skill, idx) => {
                const pos = getPosition(ring.radius, idx, ringSkills.length);
                return { ...skill, ...pos, radius: ring.radius };
            });
        }).flat();
    }, [rings]);

    return (
        <div className="relative flex min-h-[500px] md:min-h-[700px] w-full items-center justify-center overflow-hidden py-10 md:py-20">
            {/* Central Core */}
            <motion.div
                className="relative z-20 flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full bg-surface shadow-[0_0_50px_rgba(59,130,246,0.2)] border border-primary/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
            >
                <div className="text-center">
                    <p className="font-display text-[9px] md:text-xs font-black uppercase tracking-widest text-secondary">Expert</p>
                    <p className="font-display text-base md:text-lg font-bold text-foreground">Stack</p>
                </div>

                {/* Core pulse */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Orbit System with Rotation */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            >
                {/* Orbit Lines */}
                {rings.map((ring) => (
                    <div
                        key={ring.radius}
                        className="absolute rounded-full border border-border/10"
                        style={{
                            width: ring.radius * 2,
                            height: ring.radius * 2,
                        }}
                    />
                ))}

                {/* Skills */}
                {orbitItems.map((item, idx) => {
                    const Icon = categoryIcons[item.category as keyof typeof categoryIcons];

                    return (
                        <motion.div
                            key={item.name}
                            className="absolute pointer-events-auto cursor-help"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, x: item.x, y: item.y }}
                            transition={{ delay: idx * 0.03 }}
                        >
                            <motion.div
                                className="group relative flex items-center justify-center"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                                whileHover={{ scale: 1.2 }}
                            >
                                {/* Skill Circle */}
                                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl border border-border bg-surface/80 shadow-lg backdrop-blur-md transition-all group-hover:border-secondary/50 group-hover:bg-secondary/5">
                                    {Icon && <Icon size={screenSize.isMobile ? 14 : 18} className="text-muted group-hover:text-secondary transition-colors" />}
                                </div>

                                {/* Label */}
                                <div className="absolute top-12 md:top-14 whitespace-nowrap rounded-lg bg-background/90 px-2 md:px-3 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-foreground opacity-0 transition-opacity group-hover:opacity-100 border border-border/50">
                                    {item.name}
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] uppercase font-bold tracking-[0.4em] text-muted-dark opacity-50">
                Explorer l'orbite
            </div>
        </div>
    );
}
