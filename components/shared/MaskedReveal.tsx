"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MaskedRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export default function MaskedReveal({
    children,
    className = "",
    delay = 0
}: MaskedRevealProps) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.33, 1, 0.68, 1], // easeOutQuart
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
