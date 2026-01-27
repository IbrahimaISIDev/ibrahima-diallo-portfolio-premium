"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { experiences } from "@/data/experience";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function ExperienceTimeline() {
    return (
        <div className="mt-20 space-y-12">
            <div className="flex flex-col items-center gap-4 text-center">
                <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                    Mon Parcours Professionnel
                </h3>
                <p className="max-w-xl text-muted">
                    De ISI en passant par la Sonatel Academy &agrave; Saraya Tech Senegal, voici les &eacute;tapes cl&eacute;s de mon &eacute;volution constante.
                </p>
            </div>

            <motion.div
                className="relative mx-auto max-w-4xl px-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {/* Vertical Line */}
                <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-primary via-secondary to-transparent sm:left-1/2" />

                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company + exp.period}
                            variants={fadeInUp}
                            className={`relative flex flex-col gap-8 sm:flex-row ${index % 2 === 0 ? "sm:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Dot on Line */}
                            <div className="absolute left-8 -translate-x-1/2 z-10 rounded-full border-4 border-background bg-secondary p-1.5 text-background sm:left-1/2">
                                <Briefcase size={16} />
                            </div>

                            {/* Content */}
                            <div className="ml-16 sm:ml-0 sm:w-1/2 sm:px-12">
                                <div className={`group rounded-2xl border border-border bg-surface p-6 shadow-xl transition-all duration-300 hover:border-secondary/30 hover:shadow-secondary/5 ${index % 2 === 0 ? "text-left" : "sm:text-right"
                                    }`}>
                                    <div className={`flex flex-col gap-2 ${index % 2 === 0 ? "items-start" : "sm:items-end"}`}>
                                        <span className="flex items-center gap-2 text-sm font-bold text-secondary">
                                            <Calendar size={14} />
                                            {exp.period}
                                        </span>
                                        <h4 className="font-display text-xl font-bold text-foreground">
                                            {exp.title}
                                        </h4>
                                        <p className="font-medium text-primary-light">
                                            {exp.company}
                                        </p>
                                    </div>

                                    <p className="mt-4 text-sm leading-relaxed text-muted">
                                        {exp.description}
                                    </p>

                                    <ul className={`mt-4 flex flex-col gap-2 ${index % 2 === 0 ? "items-start" : "sm:items-end"}`}>
                                        {exp.highlights.slice(0, 2).map((highlight) => (
                                            <li key={highlight} className={`flex items-start gap-2 text-xs text-muted/80 ${index % 2 === 0 ? "" : "sm:flex-row-reverse"}`}>
                                                <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-secondary" />
                                                <span className="max-w-[200px] sm:max-w-none">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
