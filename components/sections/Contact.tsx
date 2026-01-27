"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { personalInfo } from "@/data/personal";
import SectionTitle from "@/components/shared/SectionTitle";
import { fadeInLeft, fadeInRight, fadeInUp } from "@/lib/animations";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("sent");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Contact"
          title="Travaillons ensemble"
          description="Vous avez un projet en t&ecirc;te ? N'h&eacute;sitez pas &agrave; me contacter pour en discuter."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            className="space-y-12"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-foreground">
                Parlons de votre prochain projet
              </h3>
              <p className="text-lg text-muted">
                Que ce soit pour une nouvelle id&eacute;e, une collaboration ou simplement pour dire bonjour, je suis toujours ouvert &agrave; de nouvelles opportunit&eacute;s.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: personalInfo.email,
                  href: `mailto:${personalInfo.email}`,
                },
                {
                  icon: Phone,
                  label: "T&eacute;l&eacute;phone",
                  value: personalInfo.phone,
                  href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
                },
                {
                  icon: MapPin,
                  label: "Localisation",
                  value: personalInfo.location,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-lg font-semibold text-foreground transition-colors hover:text-secondary"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg font-semibold text-foreground">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl border border-border bg-background p-8 shadow-xl"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-muted">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Votre nom"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground transition-colors focus:border-secondary focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-muted">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="votre@email.com"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground transition-colors focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-muted">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="Sujet de votre message"
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground transition-colors focus:border-secondary focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="D&eacute;crivez votre projet..."
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground transition-colors focus:border-secondary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status !== "idle"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white transition-all hover:bg-primary-light disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send size={20} />
                    </motion.div>
                    Envoi en cours...
                  </>
                ) : status === "sent" ? (
                  <>
                    <CheckCircle2 size={20} />
                    Message envoy&eacute; !
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle size={20} />
                    Erreur, r&eacute;essayez
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
