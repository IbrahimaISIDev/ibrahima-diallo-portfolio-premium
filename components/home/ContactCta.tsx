import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Typography";
import type { SiteContent } from "@/content";
import { localePath } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface ContactCtaProps {
  content: SiteContent;
  dict: Dictionary;
}

// Dernière carte de l'accueil : appel à l'action, formulaire ou WhatsApp
export default function ContactCta({ content, dict }: ContactCtaProps) {
  const { profile, locale } = content;
  const { home, common } = dict;

  return (
    <section id="contact" aria-labelledby="contact-title" className="pt-24 sm:pt-32">
      <Reveal>
        <Card className="relative overflow-hidden p-8 sm:p-12">
          {/* Halo or discret dans l'angle */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-gold/15 blur-3xl"
          />
          <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="flex max-w-2xl flex-col gap-4">
              <Eyebrow>{home.contactEyebrow}</Eyebrow>
              <h2
                id="contact-title"
                className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-ink"
              >
                {home.contactTitle}
              </h2>
              <p className="text-base leading-relaxed text-ink-muted sm:text-[17px]">
                {home.contactText}
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 self-start rounded font-mono text-sm text-ink-soft outline-none transition-colors hover:text-gold-ink focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Mail size={16} aria-hidden="true" />
                {profile.email}
              </a>
            </div>
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              <Button href={localePath(locale, "/contact")} variant="gold" size="lg">
                {common.writeMessage}
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button href={profile.social.whatsapp} variant="outline" size="lg">
                <MessageCircle size={16} aria-hidden="true" />
                {common.whatsapp}
              </Button>
            </div>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
