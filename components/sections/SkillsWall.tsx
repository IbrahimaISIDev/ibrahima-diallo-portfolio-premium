"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Server,
    Coffee,
    Layers,
    Smartphone,
    Database,
    ShieldCheck,
    type LucideIcon,
} from "lucide-react";
import { skillGroups } from "@/data/skills";
import type { SkillGroup } from "@/types";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SpotlightCard from "@/components/shared/SpotlightCard";
import { cn } from "@/lib/utils";

// Habillage de chaque groupe. Classes Tailwind écrites en entier (pas de
// concaténation) pour être détectées au build ; teinte 700 en clair, 400 en sombre.
const groupStyles: Record<
    SkillGroup["id"],
    { Icon: LucideIcon; span: string; accent: string; tile: string; dot: string; hover: string; spotlight: string }
> = {
    frontend: {
        Icon: Code2,
        span: "md:col-span-7",
        accent: "text-blue-700 dark:text-blue-400",
        tile: "bg-blue-500/10",
        dot: "bg-blue-500",
        hover: "hover:border-blue-500/50",
        spotlight: "rgba(59, 130, 246, 0.15)",
    },
    mobile: {
        Icon: Smartphone,
        span: "md:col-span-5",
        accent: "text-rose-700 dark:text-rose-400",
        tile: "bg-rose-500/10",
        dot: "bg-rose-500",
        hover: "hover:border-rose-500/50",
        spotlight: "rgba(244, 63, 94, 0.15)",
    },
    "backend-node": {
        Icon: Server,
        span: "md:col-span-6",
        accent: "text-amber-700 dark:text-amber-400",
        tile: "bg-amber-500/10",
        dot: "bg-amber-500",
        hover: "hover:border-amber-500/50",
        spotlight: "rgba(245, 158, 11, 0.15)",
    },
    "backend-java": {
        Icon: Coffee,
        span: "md:col-span-6",
        accent: "text-orange-700 dark:text-orange-400",
        tile: "bg-orange-500/10",
        dot: "bg-orange-500",
        hover: "hover:border-orange-500/50",
        spotlight: "rgba(249, 115, 22, 0.15)",
    },
    laravel: {
        Icon: Layers,
        span: "md:col-span-4",
        accent: "text-red-700 dark:text-red-400",
        tile: "bg-red-500/10",
        dot: "bg-red-500",
        hover: "hover:border-red-500/50",
        spotlight: "rgba(239, 68, 68, 0.15)",
    },
    "data-devops": {
        Icon: Database,
        span: "md:col-span-8",
        accent: "text-emerald-700 dark:text-emerald-400",
        tile: "bg-emerald-500/10",
        dot: "bg-emerald-500",
        hover: "hover:border-emerald-500/50",
        spotlight: "rgba(34, 197, 94, 0.15)",
    },
    security: {
        Icon: ShieldCheck,
        span: "md:col-span-12",
        accent: "text-purple-700 dark:text-purple-400",
        tile: "bg-purple-500/10",
        dot: "bg-purple-500",
        hover: "hover:border-purple-500/50",
        spotlight: "rgba(168, 85, 247, 0.15)",
    },
};

// Ordre d'affichage du bento (rangées de 12 colonnes : 7+5, 6+6, 4+8, 12)
const bentoOrder: SkillGroup["id"][] = [
    "frontend",
    "mobile",
    "backend-node",
    "backend-java",
    "laravel",
    "data-devops",
    "security",
];

export default function SkillsWall() {
    const groups = bentoOrder
        .map((id) => skillGroups.find((group) => group.id === id))
        .filter((group): group is SkillGroup => Boolean(group));

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {groups.map((group) => {
                const style = groupStyles[group.id];
                return (
                    <motion.div key={group.id} variants={fadeInUp} className={style.span}>
                        <SpotlightCard className="h-full border-border bg-surface/40 p-8 sm:p-10" spotlightColor={style.spotlight}>
                            <div className="flex h-full flex-col gap-8">
                                <div className="flex items-center gap-4">
                                    <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", style.tile, style.accent)}>
                                        <style.Icon size={24} />
                                    </div>
                                    <div>
                                        <span className={cn("text-[10px] font-black uppercase tracking-[0.3em]", style.accent)}>
                                            {group.items.length} compétences
                                        </span>
                                        <h4 className="text-2xl font-display font-bold text-foreground">{group.label}</h4>
                                    </div>
                                </div>
                                <ul className="flex flex-wrap gap-2.5">
                                    {group.items.map((item) => (
                                        <li
                                            key={item}
                                            className={cn(
                                                "flex items-center gap-2 rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm font-bold text-muted transition-colors hover:text-foreground",
                                                style.hover
                                            )}
                                        >
                                            <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", style.dot)} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
