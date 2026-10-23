import Link from "next/link";
import { ArrowUp, Mail, MessageCircle } from "lucide-react";
import { Github, Linkedin } from "@/components/shared/BrandIcons";
import Container from "@/components/ui/Container";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath, type Locale } from "@/lib/i18n/config";
import { navigationItems } from "@/lib/navigation";
import Wordmark from "./Wordmark";

interface SiteFooterProps {
  locale: Locale;
  profile: SiteContent["profile"];
  dict: Pick<Dictionary, "nav" | "a11y" | "footer">;
}

const linkClass =
  "rounded text-ink-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-gold";

export default function SiteFooter({ locale, profile, dict }: SiteFooterProps) {
  const { nav, a11y, footer } = dict;
  const socials = [
    { label: "GitHub", href: profile.social.github, icon: Github },
    { label: "LinkedIn", href: profile.social.linkedin, icon: Linkedin },
    { label: "WhatsApp", href: profile.social.whatsapp, icon: MessageCircle },
    { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  ];

  return (
    <footer className="mt-24 border-t border-line sm:mt-32">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.6fr_1fr_1fr] md:gap-8">
        <div className="flex max-w-sm flex-col gap-5">
          <Wordmark
            href={localePath(locale, "/")}
            label={a11y.homeLink}
            className="self-start text-xl"
          />
          <p className="leading-relaxed text-ink-muted">{footer.tagline}</p>
          <ul className="flex gap-2.5">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink-muted outline-none transition-colors hover:border-line-strong hover:text-ink focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-navigation" className="flex flex-col gap-4">
          <h2
            id="footer-navigation"
            className="font-mono text-xs uppercase tracking-[0.12em] text-gold-ink"
          >
            {footer.navigation}
          </h2>
          <ul className="flex flex-col gap-3 text-[15px]">
            <li>
              <Link href={localePath(locale, "/")} className={linkClass}>
                {footer.home}
              </Link>
            </li>
            {navigationItems.map((item) => (
              <li key={item.key}>
                <Link href={localePath(locale, item.href)} className={linkClass}>
                  {nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-gold-ink">
            {footer.contact}
          </h2>
          <ul className="flex flex-col gap-3 text-[15px]">
            <li>
              <a href={`mailto:${profile.email}`} className={linkClass}>
                {profile.email}
              </a>
            </li>
            <li>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className={linkClass}>
                {profile.phone}
              </a>
            </li>
            <li className="text-ink-muted">{profile.location}</li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col-reverse items-start justify-between gap-6 border-t border-line py-8 text-[13px] text-ink-muted sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {profile.fullName}. {footer.rights}
        </p>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2.5">
            {/* Liseré aux couleurs du drapeau sénégalais */}
            <span aria-hidden="true" className="flex h-1 w-12 overflow-hidden rounded">
              <span className="flex-1 bg-leaf" />
              <span className="flex-1 bg-gold" />
              <span className="flex-1 bg-ember" />
            </span>
            {footer.madeIn}
          </span>
          <a
            href="#top"
            aria-label={a11y.backToTop}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted outline-none transition-colors hover:border-line-strong hover:text-ink focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
