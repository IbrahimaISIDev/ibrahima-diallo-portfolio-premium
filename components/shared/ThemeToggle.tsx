"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useHydrated } from "@/lib/useHydrated";
import { cn } from "@/lib/utils";

const base =
  "relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft outline-none transition-colors hover:border-line-strong hover:text-ink focus-visible:ring-2 focus-visible:ring-gold";

export default function ThemeToggle({ label, className }: { label: string; className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  // Le thème n'est connu que côté client : évite un écart d'hydratation
  const mounted = useHydrated();

  if (!mounted) return <span aria-hidden="true" className={cn(base, className)} />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(base, className)}
      aria-label={label}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "dark" : "light"}
          initial={{ y: 8, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -8, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
