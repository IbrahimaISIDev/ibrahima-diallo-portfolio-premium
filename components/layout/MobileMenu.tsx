"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navigationItems } from "@/data/navigation";
import { mobileMenuVariants, mobileMenuItem } from "@/lib/animations";

const MotionLink = motion.create(Link);

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={mobileMenuVariants}
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden"
        >
          <nav className="flex h-full flex-col items-center justify-center gap-8">
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
