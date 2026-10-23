"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { languageNames, localePath, locales, stripLocale, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
  className?: string;
}

// Pastille FR | EN : la langue courante est mise en évidence, l'autre mène
// à la même page dans sa langue (/about <-> /en/about)
export default function LanguageSwitcher({ locale, label, className }: LanguageSwitcherProps) {
  const path = stripLocale(usePathname());

  return (
    <nav
      aria-label={label}
      className={cn(
        "inline-flex rounded-full border border-line p-[3px] font-mono text-xs",
        className,
      )}
    >
      {locales.map((item) =>
        item === locale ? (
          <span
            key={item}
            aria-current="true"
            className="rounded-full bg-ink px-2.5 py-1.5 uppercase text-canvas"
          >
            <span className="sr-only">{languageNames[item]}</span>
            <span aria-hidden="true">{item}</span>
          </span>
        ) : (
          <Link
            key={item}
            href={localePath(item, path)}
            hrefLang={item}
            lang={item}
            className="rounded-full px-2.5 py-1.5 uppercase text-ink-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-gold"
          >
            <span className="sr-only">{languageNames[item]}</span>
            <span aria-hidden="true">{item}</span>
          </Link>
        ),
      )}
    </nav>
  );
}
