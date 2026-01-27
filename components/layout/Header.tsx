"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation"; // Placeholder for custom navigation
import { cn } from "@/lib/utils";
import { Globe, ChevronDown } from "lucide-react";
import { navigationItems } from "@/data/navigation";
import MobileMenu from "./MobileMenu";

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

  const t = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

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
            <a href="#accueil" className="flex items-center gap-1 text-2xl font-bold font-display">
              <span className="text-foreground">Ibra</span>
              <span className="text-secondary">h</span>
              <span className="text-foreground">ima</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 lg:flex">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative group text-sm font-medium text-muted transition-colors duration-200 hover:text-secondary"
                >
                  {t(item.label.toLowerCase())}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 w-0 bg-secondary"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-6 lg:flex">
              {/* Language Switcher */}
              <div className="relative group/lang">
                <button className="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-secondary py-2">
                  <Globe size={18} />
                  <span className="uppercase font-semibold">{locale}</span>
                  <ChevronDown size={14} className="transition-transform group-hover/lang:rotate-180" />
                </button>

                <div className="absolute right-0 top-full mt-1 w-32 origin-top-right rounded-xl border border-border bg-surface p-2 shadow-2xl opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-200 backdrop-blur-lg">
                  {["fr", "en"].map((l) => (
                    <button
                      key={l}
                      onClick={() => router.push(pathname, { locale: l })}
                      className={cn(
                        "flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        locale === l ? "bg-secondary/10 text-secondary" : "text-muted hover:bg-white/5 hover:text-foreground"
                      )}
                    >
                      {l === 'fr' ? 'Français' : 'English'}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Button (desktop) */}
              <motion.a
                href="#contact"
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tCommon("hireMe")}
              </motion.a>
            </div>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
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
      </motion.header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
