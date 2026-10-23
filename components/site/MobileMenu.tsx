"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";

const MotionLink = motion.create(Link);

const panel: Variants = {
  closed: { opacity: 0, transition: { duration: 0.2 } },
  open: { opacity: 1, transition: { duration: 0.25, staggerChildren: 0.05, delayChildren: 0.05 } },
};

const item: Variants = {
  closed: { opacity: 0, y: 16 },
  open: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  // Bouton d'ouverture : il reste dans le cycle du focus et le récupère à la fermeture
  toggleRef: RefObject<HTMLButtonElement | null>;
  locale: Locale;
  links: { key: string; href: string; label: string; active: boolean }[];
  contact: { href: string; label: string };
  a11y: Dictionary["a11y"];
}

// Menu plein écran des petits écrans (< lg), sous le header qui garde le bouton de fermeture
export default function MobileMenu({
  isOpen,
  onClose,
  toggleRef,
  locale,
  links,
  contact,
  a11y,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const toggle = toggleRef.current;
    const focusables = () => [
      ...(toggle ? [toggle] : []),
      ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []),
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
          ref={panelRef}
          initial="closed"
          animate="open"
          exit="closed"
          variants={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={a11y.mobileMenu}
          className="fixed inset-0 z-40 flex flex-col bg-canvas/95 px-6 pt-28 pb-10 backdrop-blur-xl lg:hidden"
        >
          <nav aria-label={a11y.mobileNav} className="flex flex-col">
            {links.map((link) => (
              <MotionLink
                key={link.key}
                href={link.href}
                variants={item}
                onClick={onClose}
                aria-current={link.active ? "location" : undefined}
                className={cn(
                  "border-b border-line py-4 font-display text-3xl font-bold tracking-[-0.03em] outline-none focus-visible:text-gold-ink",
                  link.active ? "text-gold-ink" : "text-ink",
                )}
              >
                {link.label}
              </MotionLink>
            ))}
          </nav>

          <motion.div variants={item} className="mt-auto flex flex-col gap-5">
            <LanguageSwitcher
              locale={locale}
              label={a11y.languageSwitcher}
              className="self-start"
            />
            <Link
              href={contact.href}
              onClick={onClose}
              className="flex min-h-[52px] items-center justify-center rounded-2xl bg-leaf text-base font-semibold text-on-leaf outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {contact.label}
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
