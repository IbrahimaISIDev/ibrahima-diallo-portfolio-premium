"use client";

import { motion } from "framer-motion";

interface InfiniteMarqueeProps {
    items: string[];
    speed?: number;
    direction?: "left" | "right";
}

export default function InfiniteMarquee({
    items,
    speed = 30,
    direction = "left",
}: InfiniteMarqueeProps) {
    // Duplicate items to create seamless loop
    const duplicatedItems = [...items, ...items, ...items];

    return (
        <div className="relative flex w-full overflow-hidden py-10">
            {/* Gradient Mask for edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

            <motion.div
                className="flex whitespace-nowrap"
                animate={{
                    x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {duplicatedItems.map((item, idx) => (
                    <div
                        key={`${item}-${idx}`}
                        className="mx-6 flex items-center gap-3 rounded-2xl border border-border bg-surface/50 px-6 py-3 shadow-sm backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5 group"
                    >
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="font-display text-sm font-bold uppercase tracking-widest text-muted group-hover:text-foreground">
                            {item}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
