"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

export default function Typewriter({
    text,
    delay = 1,
    duration = 3,
    className = "",
    hideCursorOnComplete = false
}: {
    text: string;
    delay?: number;
    duration?: number;
    className?: string;
    hideCursorOnComplete?: boolean;
}) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const controls = animate(count, text.length, {
            type: "tween",
            duration: duration,
            ease: "easeInOut",
            delay: delay,
            onComplete: () => {
                if (hideCursorOnComplete) {
                    setIsFinished(true);
                }
            }
        });
        return controls.stop;
    }, [count, text.length, delay, duration, hideCursorOnComplete]);

    return (
        <span className="inline-flex items-baseline">
            <motion.span className={className}>{displayText}</motion.span>
            {!isFinished && (
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="ml-1 inline-block h-[0.8em] w-[2px] bg-secondary"
                />
            )}
        </span>
    );
}
