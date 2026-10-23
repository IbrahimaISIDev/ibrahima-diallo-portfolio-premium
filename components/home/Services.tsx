import {
  Cloud,
  Monitor,
  Palette,
  Server,
  ShoppingCart,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import Card from "@/components/ui/Card";
import { Eyebrow, SectionHeader } from "@/components/ui/Typography";
import type { SiteContent } from "@/content";
import type { ServiceIcon } from "@/content/services";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const icons: Record<ServiceIcon, LucideIcon> = {
  Monitor,
  Smartphone,
  Server,
  ShoppingCart,
  Palette,
  Cloud,
};

interface ServicesProps {
  content: SiteContent;
  dict: Dictionary;
}

// Offre en six cartes, puis la méthode en quatre étapes numérotées
export default function Services({ content, dict }: ServicesProps) {
  const { services, workflow } = content;
  const { home } = dict;

  return (
    <section id="services" aria-labelledby="services-title" className="pt-24 sm:pt-32">
      <Reveal>
        <SectionHeader
          id="services-title"
          eyebrow={home.servicesEyebrow}
          title={home.servicesTitle}
        />
      </Reveal>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = icons[service.icon];
          return (
            <Reveal key={service.id} index={index % 3}>
              <Card as="li" size="md" className="flex h-full flex-col gap-4 p-6 sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-card-2 text-gold-ink">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-ink">
                  {service.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-muted">{service.description}</p>
                <p className="mt-auto pt-1 font-mono text-xs text-ink-muted">
                  {service.technologies.join(" · ")}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </ul>

      <Reveal className="mt-3 sm:mt-4">
        <Card className="p-7 sm:p-9">
          <div className="flex flex-col gap-2">
            <Eyebrow>{home.processEyebrow}</Eyebrow>
            <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink sm:text-[26px]">
              {home.processTitle}
            </h3>
          </div>
          <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {workflow.map((step, index) => (
              <li key={step.id} className="flex flex-col gap-3 border-t border-line pt-5">
                <span className="font-mono text-sm text-gold-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="font-display text-lg font-bold text-ink">{step.title}</h4>
                <p className="text-[15px] leading-relaxed text-ink-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Card>
      </Reveal>
    </section>
  );
}
