"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath, type Locale } from "@/lib/i18n/config";
import { navigationItems } from "@/lib/navigation";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/shared/ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import Wordmark from "./Wordmark";

interface SiteHeaderProps {
  locale: Locale;
  nav: Dictionary["nav"];
  a11y: Dictionary["a11y"];
}

// Header flottant en pastille : signature, navigation, langue, thème et contact.
// Sticky dans le flux : aucune page n'a à compenser sa hauteur.
export default function SiteHeader({ locale, nav, a11y }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  // Référence stable : le menu l'utilise comme dépendance d'effet
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = navigationItems.map((item) => ({
    ...item,
    label: nav[item.key],
    href: localePath(locale, item.href),
    active: item.section === activeSection,
  }));
  const contactHref = localePath(locale, "/#contact");

  return (
    <>
      <header id="top" className="sticky top-3 z-50 pt-3 sm:top-4 sm:pt-4">
        <Container>
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-full border py-2 pr-2 pl-5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300",
              scrolled
                ? "border-line-strong/70 bg-card/85 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.45)]"
                : "border-line bg-card/70",
            )}
          >
            <Wordmark href={localePath(locale, "/")} label={a11y.homeLink} />

            <nav aria-label={a11y.mainNav} className="hidden items-center gap-1 lg:flex">
              {links.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  aria-current={link.active ? "location" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-gold",
                    link.active ? "bg-card-2 text-gold-ink" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <LanguageSwitcher
                locale={locale}
                label={a11y.languageSwitcher}
                className="hidden sm:inline-flex"
              />
              <ThemeToggle label={a11y.toggleTheme} />
              <Link
                href={contactHref}
                className="hidden min-h-10 items-center rounded-full bg-leaf px-[18px] text-sm font-semibold text-on-leaf outline-none transition-[filter] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-canvas lg:inline-flex"
              >
                {nav.contact}
              </Link>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-line outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
                aria-label={menuOpen ? a11y.closeMenu : a11y.openMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <span
                  className={cn(
                    "h-[1.5px] w-4 rounded-full bg-ink transition-transform duration-300",
                    menuOpen && "translate-y-[3.25px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-[1.5px] w-4 rounded-full bg-ink transition-transform duration-300",
                    menuOpen && "-translate-y-[3.25px] -rotate-45",
                  )}
                />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        toggleRef={menuButtonRef}
        locale={locale}
        links={links}
        contact={{ href: contactHref, label: nav.contact }}
        a11y={a11y}
      />
    </>
  );
}
