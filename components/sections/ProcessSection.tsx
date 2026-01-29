"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Search, Layers, Code2, Rocket, CheckCircle2 } from "lucide-react";
import { workflowSteps } from "@/data/workflow";
import SectionTitle from "@/components/shared/SectionTitle";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SpotlightCard from "@/components/shared/SpotlightCard";

const iconMap = {
    Search,
    Layers,
    Code2,
    Rocket
};

export default function ProcessSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="process" className="py-24 relative overflow-hidden">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    subtitle="Méthodologie"
                    title="Mon Processus"
                    description="Une approche structurée et itérative pour transformer vos idées en produits digitaux exceptionnels."
                />

                <div className="relative mt-20" ref={containerRef}>
                    {/* Central Vertical Line (Desktop) */}
                    <div className="absolute left-[21px] sm:left-1/2 top-4 bottom-4 w-[2px] bg-border/30 -translate-x-1/2 hidden md:block" />

                    {/* Animated Progress Line (Desktop) */}
                    <motion.div
                        className="absolute left-[21px] sm:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-secondary via-primary to-transparent -translate-x-1/2 origin-top hidden md:block"
                        style={{ scaleY }}
                    />

                    <div className="space-y-24 relative">
                        {workflowSteps.map((step, index) => {
                            const Icon = iconMap[step.icon as keyof typeof iconMap] || Search;
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={step.title}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Content Card */}
                                    <div className="w-full md:w-[45%]">
                                        <motion.div
                                            variants={isEven ? {
                                                hidden: { opacity: 0, x: 50 },
                                                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                                            } : {
                                                hidden: { opacity: 0, x: -50 },
                                                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                                            }}
                                        >
                                            <SpotlightCard
                                                className="p-8 border-border/50 bg-surface/30 backdrop-blur-sm"
                                                spotlightColor="rgba(245, 158, 11, 0.05)"
                                            >
                                                <div className="flex flex-col gap-6">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-4xl font-black text-secondary/20 font-display">
                                                            0{index + 1}
                                                        </span>
                                                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-secondary/10 text-secondary border border-secondary/20 md:hidden">
                                                            <Icon size={20} />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <h3 className="text-3xl font-display font-black text-foreground tracking-tight">
                                                            {step.title}
                                                        </h3>
                                                        <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary/80 italic">
                                                            {step.subtitle}
                                                        </p>
                                                    </div>

                                                    <p className="text-muted leading-relaxed font-medium">
                                                        {step.description}
                                                    </p>

                                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border/40">
                                                        {step.tasks.map((task) => (
                                                            <li key={task} className="flex items-center gap-3 text-xs font-bold text-muted-dark group">
                                                                <CheckCircle2 size={14} className="text-secondary shrink-0 group-hover:scale-125 transition-transform" />
                                                                {task}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </SpotlightCard>
                                        </motion.div>
                                    </div>

                                    {/* Central Icon Point (Desktop) */}
                                    <div className="relative z-10 w-full md:w-[10%] flex justify-center items-center">
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20,
                                                delay: 0.3
                                            }}
                                            className="hidden md:flex h-14 w-14 items-center justify-center rounded-2xl bg-surface border-2 border-border shadow-xl text-secondary group hover:border-secondary transition-colors"
                                        >
                                            <Icon size={24} className="group-hover:scale-110 transition-transform" />

                                            {/* Pulse Effect */}
                                            <div className="absolute inset-0 rounded-2xl bg-secondary/20 animate-ping -z-10 group-hover:bg-secondary/40" />
                                        </motion.div>
                                    </div>

                                    {/* Empty space for alignment (Desktop) */}
                                    <div className="hidden md:block md:w-[45%]" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
