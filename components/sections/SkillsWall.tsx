"use client";

import { motion } from "framer-motion";
import { skills, skillCategories } from "@/data/skills";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function SkillsWall() {
    const categories = Object.keys(skillCategories) as Array<keyof typeof skillCategories>;

    return (
        <motion.div
            className="space-y-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="grid gap-8 sm:grid-cols-2">
                {categories.map((cat) => (
                    <motion.div
                        key={cat}
                        variants={fadeInUp}
                        className="space-y-4"
                    >
                        <h4 className="font-display text-sm font-bold uppercase tracking-widest text-secondary">
                            {skillCategories[cat]}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {skills
                                .filter((s) => s.category === cat)
                                .map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="group relative rounded-xl border border-border bg-surface px-4 py-2 transition-all hover:border-secondary/50 hover:bg-secondary/5"
                                    >
                                        <span className="text-sm font-medium text-foreground transition-colors group-hover:text-secondary">
                                            {skill.name}
                                        </span>
                                        {/* Tiny level indicator dot */}
                                        <div
                                            className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-secondary opacity-0 transition-opacity group-hover:opacity-100"
                                            style={{ opacity: (skill.level ?? 0) / 100 }}
                                        />
                                    </div>
                                ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
