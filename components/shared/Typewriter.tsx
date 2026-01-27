"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function Typewriter({ text }: { text: string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

    useEffect(() => {
        const controls = animate(count, text.length, {
            type: "tween",
            duration: 3,
            ease: "easeInOut",
            delay: 1,
        });
        return controls.stop;
    }, [count, text.length]);

    return (
        <span className="inline-flex">
            <motion.span>{displayText}</motion.span>
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="ml-1 inline-block h-[1em] w-[2px] bg-secondary"
            />
        </span>
    );
}
