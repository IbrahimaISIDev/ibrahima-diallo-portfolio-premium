"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SpotlightCard from "@/components/shared/SpotlightCard";
import { Code2, Server, Database, Smartphone, Cloud } from "lucide-react";

export default function SkillsWall() {
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {/* Frontend - Large (Span 8) */}
            <motion.div variants={fadeInUp} className="md:col-span-8">
                <SpotlightCard className="h-full border-border bg-surface/40 p-10" spotlightColor="rgba(59, 130, 246, 0.15)">
                    <div className="flex flex-col h-full justify-between gap-10">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                                <Code2 size={24} />
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400/70">Expertise Principale</span>
                                <h4 className="text-3xl font-display font-bold text-foreground">Ingénierie Frontend</h4>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {skills.filter(s => s.category === "frontend").map((skill) => (
                                <div key={skill.name} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/50 px-6 py-4 transition-all hover:border-blue-500/50 hover:bg-blue-500/5 group">
                                    <span className="text-base font-bold text-muted group-hover:text-foreground">{skill.name}</span>
                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                </div>
                            ))}
                        </div>
                    </div>
                </SpotlightCard>
            </motion.div>

            {/* Mobile - Span 4 */}
            <motion.div variants={fadeInUp} className="md:col-span-4">
                <SpotlightCard className="h-full border-border bg-surface/40 p-10" spotlightColor="rgba(244, 63, 94, 0.15)">
                    <div className="flex flex-col h-full justify-between gap-10">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400">
                                <Smartphone size={24} />
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-400/70">Applications</span>
                                <h4 className="text-2xl font-display font-bold text-foreground">Mobile</h4>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {skills.filter(s => s.category === "mobile").map((skill) => (
                                <div key={skill.name} className="flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-5 py-4 transition-all hover:border-rose-500/50 group">
                                    <span className="text-sm font-bold text-muted group-hover:text-foreground">{skill.name}</span>
                                    <div className="h-1 w-1 rounded-full bg-rose-500" />
                                </div>
                            ))}
                        </div>
                    </div>
                </SpotlightCard>
            </motion.div>

            {/* Backend - Span 5 */}
            <motion.div variants={fadeInUp} className="md:col-span-5">
                <SpotlightCard className="h-full border-border bg-surface/40 p-10" spotlightColor="rgba(245, 158, 11, 0.15)">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
                                <Server size={24} />
                            </div>
                            <h4 className="text-2xl font-display font-bold text-foreground">Backend</h4>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            {skills.filter(s => s.category === "backend").map((skill) => (
                                <div key={skill.name} className="rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 transition-all hover:border-amber-500/50 group">
                                    <span className="text-sm font-bold text-muted group-hover:text-foreground">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </SpotlightCard>
            </motion.div>

            {/* Database - Span 3 */}
            <motion.div variants={fadeInUp} className="md:col-span-3">
                <SpotlightCard className="h-full border-border bg-surface/40 p-10" spotlightColor="rgba(34, 197, 94, 0.15)">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                                <Database size={24} />
                            </div>
                            <h4 className="text-2xl font-display font-bold text-foreground">Data</h4>
                        </div>
                        <div className="space-y-3">
                            {skills.filter(s => s.category === "database").map((skill) => (
                                <div key={skill.name} className="flex items-center gap-3">
                                    <div className="h-1 my-auto w-4 rounded-full bg-emerald-500/30" />
                                    <span className="text-sm font-bold text-muted">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </SpotlightCard>
            </motion.div>

            {/* DevOps - Span 4 */}
            <motion.div variants={fadeInUp} className="md:col-span-4">
                <SpotlightCard className="h-full border-border bg-surface/40 p-10" spotlightColor="rgba(168, 85, 247, 0.15)">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
                                <Cloud size={24} />
                            </div>
                            <h4 className="text-2xl font-display font-bold text-foreground">DevOps & Cloud</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.filter(s => s.category === "devops").map((skill) => (
                                <span key={skill.name} className="rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-xs font-bold text-muted group-hover:text-foreground">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </SpotlightCard>
            </motion.div>
        </motion.div>
    );
}
