"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navigationItems } from "@/data/navigation";
import { mobileMenuVariants, mobileMenuItem } from "@/lib/animations";

const MotionLink = motion.create(Link);

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  // Bouton d'ouverture : il reste dans le cycle du focus et le récupère à la fermeture
  toggleRef: RefObject<HTMLButtonElement | null>;
}

export default function MobileMenu({ isOpen, onClose, toggleRef }: MobileMenuProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const toggle = toggleRef.current;
    const focusables = () => [
      ...(toggle ? [toggle] : []),
      ...Array.from(navRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []),
    ];

    // Bloque le défilement de la page derrière le menu
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    focusables()[1]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      // Piège de focus : Tab et Maj+Tab bouclent entre le bouton et les liens du menu
      const items = focusables();
      const index = items.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey
        ? items[(index - 1 + items.length) % items.length]
        : items[(index + 1) % items.length];
      e.preventDefault();
      next?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      toggle?.focus();
    };
  }, [isOpen, onClose, toggleRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={mobileMenuVariants}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden"
        >
          <nav
            ref={navRef}
            aria-label="Navigation mobile"
            className="flex h-full flex-col items-center justify-center gap-8"
          >
            {navigationItems.map((item) => (
              <MotionLink
                key={item.href}
                href={item.href}
                variants={mobileMenuItem}
                onClick={onClose}
                className="text-3xl font-bold font-display text-foreground transition-all duration-300 hover:text-secondary"
                whileHover={{ scale: 1.1, x: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                {item.label}
              </MotionLink>
            ))}

            <MotionLink
              href="/#contact"
              variants={mobileMenuItem}
              onClick={onClose}
              className="mt-4 rounded-full bg-primary px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-primary-light"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Me contacter
            </MotionLink>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
