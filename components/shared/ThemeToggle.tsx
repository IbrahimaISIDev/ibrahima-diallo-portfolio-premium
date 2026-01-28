"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return (
        <div className="h-10 w-10 rounded-full border border-border bg-surface/50" />
    );

    const isDark = resolvedTheme === "dark";

    return (
        <motion.button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative h-10 w-10 rounded-full border border-border bg-surface/50 p-2 text-foreground transition-colors hover:border-secondary hover:bg-surface"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Changer de thème"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: 10, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -10, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-full w-full items-center justify-center"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
}
