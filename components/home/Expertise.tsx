import Link from "next/link";
import { ArrowRight, Cloud, Layers, ShieldCheck, Smartphone } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import Card from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Typography";
import type { SiteContent } from "@/content";
import { localePath } from "@/lib/i18n/config";
import { format, type Dictionary } from "@/lib/i18n/dictionaries";

interface ExpertiseProps {
  content: SiteContent;
  dict: Dictionary;
}

// Parcours en liste sobre, points forts, et compétences complètes par domaine
export default function Expertise({ content, dict }: ExpertiseProps) {
  const { experiences, skillGroups, skillCount, locale } = content;
  const { home } = dict;

  // Les quatre expériences les plus récentes, puis le diplôme le plus récent
  const work = experiences.filter((item) => item.type === "work").slice(0, 4);
  const degree = experiences.find((item) => item.type === "education");
  const path = degree ? [...work, degree] : work;

  const strengths = [
    { icon: Layers, title: home.expertiseBackend, text: home.expertiseBackendText },
    { icon: Smartphone, title: home.expertiseApps, text: home.expertiseAppsText },
    { icon: Cloud, title: home.expertiseOps, text: home.expertiseOpsText },
    { icon: ShieldCheck, title: home.expertiseSecurity, text: home.expertiseSecurityText },
  ];

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-title"
      className="grid grid-cols-1 gap-3 pt-24 sm:gap-4 sm:pt-32 md:grid-cols-12"
    >
      <Reveal className="md:col-span-7">
        <Card className="flex h-full flex-col gap-6 p-7 sm:p-9">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <Eyebrow>{home.pathEyebrow}</Eyebrow>
              <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink sm:text-[26px]">
                {home.pathTitle}
              </h2>
            </div>
            <Link
              href={localePath(locale, "/cv")}
              className="group inline-flex items-center gap-2 rounded text-sm text-ink-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-gold"
            >
              {home.fullPath}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
          <ol className="flex flex-col">
            {path.map((item) => (
              <li
                key={item.id}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3.5 last:border-b-0"
              >
                <span className="text-[15px]">
                  <span className="font-semibold text-ink">{item.organization}</span>{" "}
                  <span className="text-ink-muted">— {item.title}</span>
                </span>
                <span className="shrink-0 font-mono text-[13px] whitespace-nowrap text-ink-muted">
                  {item.years}
                </span>
              </li>
            ))}
          </ol>
        </Card>
      </Reveal>

      <Reveal index={1} className="md:col-span-5">
        <Card className="flex h-full flex-col gap-6 p-7 sm:p-9">
          <div className="flex flex-col gap-2">
            <Eyebrow>{home.expertiseEyebrow}</Eyebrow>
            <h2
              id="expertise-title"
              className="font-display text-2xl font-bold tracking-[-0.03em] text-ink sm:text-[26px]"
            >
              {home.expertiseTitle}
            </h2>
          </div>
          <ul className="flex flex-col gap-5">
            {strengths.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3.5">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-[10px] bg-gold/12 text-gold-ink">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <p className="text-[15px] leading-relaxed text-ink-soft">
                  <span className="font-semibold text-ink">{title}</span> — {text}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </Reveal>

      <Reveal className="md:col-span-12">
        <Card className="flex flex-col gap-6 p-7 sm:p-9">
          <h3 className="font-display text-xl font-bold tracking-[-0.03em] text-ink">
            {format(home.skillsTitle, { count: skillCount })}
          </h3>
          <dl className="grid gap-x-10 gap-y-5 md:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.id} className="flex flex-col gap-1.5 border-t border-line pt-4">
                <dt className="font-mono text-xs tracking-[0.12em] text-gold-ink uppercase">
                  {group.label}
                </dt>
                <dd className="text-[15px] leading-relaxed text-ink-soft">
                  {group.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      </Reveal>
    </section>
  );
}
