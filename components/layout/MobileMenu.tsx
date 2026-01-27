"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/data/navigation";
import { mobileMenuVariants, mobileMenuItem } from "@/lib/animations";

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
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden"
        >
          <nav className="flex h-full flex-col items-center justify-center gap-8">
            {navigationItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                variants={mobileMenuItem}
                onClick={onClose}
                className="text-3xl font-bold font-display text-foreground transition-all duration-300 hover:text-secondary"
                whileHover={{ scale: 1.1, x: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                {item.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              variants={mobileMenuItem}
              onClick={onClose}
              className="mt-4 rounded-full bg-primary px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-primary-light"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Me contacter
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
