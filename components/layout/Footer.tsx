import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { navigationItems } from "@/data/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid gap-12 py-16 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#accueil" className="text-2xl font-bold font-display">
              <span className="text-foreground">Ibra</span>
              <span className="text-secondary">h</span>
              <span className="text-foreground">ima</span>
            </a>
            <p className="text-sm leading-relaxed text-muted">
              {personalInfo.title} {personalInfo.subtitle} basé à{" "}
              {personalInfo.location}. Passionné par l&apos;innovation
              technologique et l&apos;entrepreneuriat en Afrique.
            </p>
            {/* Social links */}
            <div className="flex gap-4 pt-2">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted transition-all duration-300 hover:bg-primary hover:text-white"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted transition-all duration-300 hover:bg-primary hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted transition-all duration-300 hover:bg-primary hover:text-white"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors duration-200 hover:text-secondary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-sm text-muted transition-colors duration-200 hover:text-secondary"
                >
                  <Mail size={16} />
                  {personalInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-3 text-sm text-muted transition-colors duration-200 hover:text-secondary"
                >
                  <Phone size={16} />
                  {personalInfo.phone}
                </a>
              </li>
              <li>
                <span className="flex items-center gap-3 text-sm text-muted">
                  <MapPin size={16} />
                  {personalInfo.location}
                </span>
              </li>
            </ul>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-light">
                <span className="h-2 w-2 rounded-full bg-primary-light animate-pulse" />
                {personalInfo.availability}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted">
              &copy; {currentYear} {personalInfo.fullName}. Tous droits réservés.
            </p>
            <p className="text-xs text-muted-dark">
              Conçu & développé avec passion depuis Dakar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
