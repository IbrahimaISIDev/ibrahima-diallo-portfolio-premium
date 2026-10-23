import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { Github, Linkedin } from "@/components/shared/BrandIcons";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/Typography";
import { getContent } from "@/content";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const { meta } = getDictionary(locale);
  return pageMetadata({
    title: meta.contactTitle,
    description: meta.contactDescription,
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { profile } = getContent(lang);
  const { contact, hero } = getDictionary(lang);

  const channels = [
    {
      icon: Mail,
      label: contact.email,
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: contact.whatsappAction,
      href: profile.social.whatsapp,
    },
    {
      icon: Phone,
      label: contact.phone,
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    },
    { icon: MapPin, label: contact.location, value: profile.location },
  ];

  return (
    <main id="main">
      <Container>
        <PageHeader eyebrow={contact.eyebrow} title={contact.title} intro={contact.intro} />

        <div className="mt-12 grid gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-12">
          <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-5">
            <Card className="rise flex flex-col p-3" style={{ "--i": 1 } as React.CSSProperties}>
              <ul className="flex flex-col">
                {channels.map(({ icon: Icon, label, value, href }) => {
                  const inner = (
                    <>
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-line bg-card-2 text-gold-ink">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-sm text-ink-muted">{label}</span>
                        <span className="truncate font-medium text-ink">{value}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          {...(href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="flex items-center gap-4 rounded-2xl p-4 outline-none transition-colors hover:bg-card-2 focus-visible:ring-2 focus-visible:ring-gold"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-4">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Card>

            <Card
              size="md"
              className="rise flex items-center justify-between gap-4 p-6"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              <span className="flex items-center gap-2.5 text-sm text-leaf-ink">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-leaf-ink" />
                {hero.available}
              </span>
              <span className="flex gap-2">
                {[
                  { label: "GitHub", href: profile.social.github, icon: Github },
                  { label: "LinkedIn", href: profile.social.linkedin, icon: Linkedin },
                ].map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink-muted outline-none transition-colors hover:border-line-strong hover:text-ink focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                ))}
              </span>
            </Card>
          </div>

          <Card
            className="rise p-6 sm:p-9 lg:col-span-7"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <ContactForm locale={lang} email={profile.email} t={contact.form} />
          </Card>
        </div>
      </Container>
    </main>
  );
}
