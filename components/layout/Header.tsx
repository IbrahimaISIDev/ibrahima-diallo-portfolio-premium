"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/data/navigation";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Logo from "@/components/shared/Logo";
import { fireConfetti } from "@/lib/confetti";
import { useActiveSection } from "@/lib/useActiveSection";

const MotionLink = motion.create(Link);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  // Référence stable : le menu l'utilise comme dépendance d'effet
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const activeSection = useActiveSection();
  const isActive = (href: string) => activeSection !== null && href === `/#${activeSection}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-lg shadow-background/50"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Logo onClick={fireConfetti} />

            {/* Desktop Navigation */}
            <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "location" : undefined}
                  className={cn(
                    "relative group text-base font-medium transition-colors duration-200 hover:text-secondary",
                    isActive(item.href) ? "text-secondary" : "text-muted",
                  )}
                >
                  {item.label}
                  {/* Soulignement : section active, ou survol du lien */}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300",
                      isActive(item.href) ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* Actions (desktop) */}
            <div className="hidden items-center gap-4 lg:flex">
              <ThemeToggle />
              <MotionLink
                href="/#contact"
                className="rounded-full bg-primary px-6 py-2.5 text-base font-semibold text-white transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Me contacter
              </MotionLink>
            </div>

            {/* Hamburger (mobile) */}
            <div className="flex items-center gap-4 lg:hidden">
              <ThemeToggle />
              <button
                ref={menuButtonRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
                aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span
                  className={cn(
                    "h-0.5 w-6 rounded-full bg-foreground transition-all duration-300",
                    mobileMenuOpen && "translate-y-2 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-6 rounded-full bg-foreground transition-all duration-300",
                    mobileMenuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-6 rounded-full bg-foreground transition-all duration-300",
                    mobileMenuOpen && "-translate-y-2 -rotate-45",
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        toggleRef={menuButtonRef}
        activeHref={activeSection ? `/#${activeSection}` : null}
      />
    </>
  );
}
