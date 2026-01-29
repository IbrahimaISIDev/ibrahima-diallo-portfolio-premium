"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/data/navigation";
import MobileMenu from "./MobileMenu";
import ConfettiTrigger from "@/components/shared/ConfettiTrigger";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-lg shadow-background/50"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <ConfettiTrigger>
              <a href="#accueil" className="flex items-center gap-1 text-2xl font-bold font-display">
                <span className="text-foreground">Ibra</span>
                <span className="text-secondary">h</span>
                <span className="text-foreground">ima</span>
              </a>
            </ConfettiTrigger>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 lg:flex">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative group text-base font-medium text-muted transition-colors duration-200 hover:text-secondary"
                >
                  {item.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 w-0 bg-secondary"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              ))}
            </nav>

            {/* Actions (desktop) */}
            <div className="hidden items-center gap-4 lg:flex">
              <ThemeToggle />
              <motion.a
                href="#contact"
                className="rounded-full bg-primary px-6 py-2.5 text-base font-semibold text-white transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Me contacter
              </motion.a>
            </div>

            {/* Hamburger (mobile) */}
            <div className="flex items-center gap-4 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
                aria-label="Toggle menu"
              >
                <span
                  className={cn(
                    "h-0.5 w-6 rounded-full bg-foreground transition-all duration-300",
                    mobileMenuOpen && "translate-y-2 rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-6 rounded-full bg-foreground transition-all duration-300",
                    mobileMenuOpen && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-6 rounded-full bg-foreground transition-all duration-300",
                    mobileMenuOpen && "-translate-y-2 -rotate-45"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
