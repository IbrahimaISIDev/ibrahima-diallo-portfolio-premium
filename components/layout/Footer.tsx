"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { navigationItems } from "@/data/navigation";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background pt-24 pb-12 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#accueil" className="flex items-center gap-1 text-2xl font-bold font-display">
              <span className="text-foreground">Ibra</span>
              <span className="text-secondary">h</span>
              <span className="text-foreground">ima</span>
            </a>
            <p className="max-w-xs text-muted leading-relaxed">
              Développeur Full-Stack passionné par la création de solutions logicielles innovantes et performantes.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Github, href: personalInfo.social.github, label: "GitHub" },
                { icon: Linkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-all hover:border-secondary hover:text-secondary hover:bg-surface-light"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-foreground">
              Navigation
            </h4>
            <ul className="space-y-4">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-muted transition-colors hover:text-secondary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-foreground">
              Contact
            </h4>
            <ul className="space-y-4 text-muted text-sm">
              <li>Dakar, Sénégal 🇸🇳</li>
              <li>{personalInfo.email}</li>
              <li>{personalInfo.phone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-border pt-12 sm:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {personalInfo.fullName}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-xs text-muted/50 italic">
              Fait avec passion à Dakar.
            </p>
            <button
              onClick={scrollToTop}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-muted transition-all hover:bg-secondary hover:text-background"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
