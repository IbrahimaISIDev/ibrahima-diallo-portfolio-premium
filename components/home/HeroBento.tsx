import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, Download, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import { cardClass } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Typography";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import DakarTime from "./DakarTime";

interface HeroBentoProps {
  content: SiteContent;
  dict: Dictionary;
}

// Rang de la carte dans l'animation d'entrée (.rise, globals.css)
const rank = (i: number) => ({ "--i": i }) as CSSProperties;

// Présentation en bento : identité, photo, chiffres clés et stack
export default function HeroBento({ content, dict }: HeroBentoProps) {
  const { profile, featuredStack, skillCount, locale } = content;
  const { hero, common, home } = dict;

  return (
    <section
      aria-labelledby="hero-title"
      className="grid grid-cols-2 gap-3 pt-6 sm:gap-4 sm:pt-8 md:grid-cols-12"
    >
      <div
        style={rank(0)}
        className={cn(
          cardClass(),
          "rise col-span-2 flex flex-col justify-between gap-10 p-7 sm:p-10 md:col-span-7 lg:min-h-[480px] lg:p-11",
        )}
      >
        <p className="inline-flex items-center gap-2.5 self-start rounded-full border border-leaf-ink/25 bg-leaf-ink/10 py-1.5 pr-3.5 pl-2.5 text-[13px] text-leaf-ink">
          <span aria-hidden="true" className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf-ink opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf-ink" />
          </span>
          {hero.available}
        </p>

        <div className="flex flex-col gap-5">
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.75rem,6.4vw,5.25rem)] leading-[0.95] font-bold tracking-[-0.045em] text-ink"
          >
            {profile.fullName.split(" ")[0]}
            <br />
            {profile.fullName.split(" ").slice(1).join(" ")}
          </h1>
          <p className="font-display text-xl font-medium text-gold-ink sm:text-[22px]">
            {profile.shortHeadline}
          </p>
          <p className="max-w-[520px] text-base leading-relaxed text-ink-muted sm:text-[17px]">
            {profile.pitch}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button href="#projects" size="lg">
            {common.viewProjects}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Button href={profile.cvPdf} download variant="outline" size="lg">
            <Download size={16} aria-hidden="true" />
            {common.downloadCv}
          </Button>
        </div>
      </div>

      <div
        style={rank(1)}
        className={cn(
          cardClass(),
          "rise group relative col-span-2 min-h-[420px] overflow-hidden md:col-span-5 lg:min-h-[480px]",
        )}
      >
        <Image
          src={profile.photo}
          alt={hero.photoAlt}
          fill
          priority
          sizes="(min-width: 1240px) 500px, (min-width: 768px) 42vw, 100vw"
          className="object-cover object-[55%_30%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#09090a]/75 px-4 py-3 text-[#f5f2ea] backdrop-blur-md">
          <span className="flex items-center gap-2 text-sm">
            <MapPin size={16} className="text-gold" aria-hidden="true" />
            {profile.location}
          </span>
          <DakarTime locale={locale} suffix={home.localTime} />
        </div>
      </div>

      <div
        style={rank(2)}
        className={cn(
          cardClass({ size: "md" }),
          "rise flex min-h-[160px] flex-col justify-between gap-6 p-6 sm:p-7 md:col-span-3",
        )}
      >
        <span className="text-sm text-ink-muted">{hero.statProjects}</span>
        <span className="font-display text-[40px] leading-none font-bold tracking-[-0.04em] text-ink min-[400px]:text-5xl sm:text-[56px]">
          {profile.stats.projectsInProduction}
        </span>
      </div>

      <div
        style={rank(3)}
        className={cn(
          cardClass({ size: "md" }),
          "rise flex min-h-[160px] flex-col justify-between gap-6 p-6 sm:p-7 md:col-span-3",
        )}
      >
        <span className="text-sm text-ink-muted">{hero.statAverage}</span>
        <span className="font-display text-[40px] leading-none font-bold tracking-[-0.04em] text-ink min-[400px]:text-5xl sm:text-[56px]">
          {profile.stats.bestAverage}
          <span className="text-base font-semibold tracking-normal text-ink-muted min-[400px]:text-xl sm:text-[22px]">
            /20
          </span>
        </span>
      </div>

      <div
        style={rank(4)}
        className={cn(
          cardClass({ size: "md" }),
          "rise col-span-2 flex flex-col gap-5 p-6 sm:p-7 md:col-span-6",
        )}
      >
        <span className="text-sm text-ink-muted">{hero.stackLabel}</span>
        <ul className="flex flex-wrap gap-2">
          {featuredStack.map((tech) => (
            <li key={tech}>
              <Chip>{tech}</Chip>
            </li>
          ))}
          <li>
            <Chip className="text-gold-ink">+ {skillCount - featuredStack.length}</Chip>
          </li>
        </ul>
      </div>
    </section>
  );
}
