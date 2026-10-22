"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { personalInfo } from "@/data/personal";
import SectionTitle from "@/components/shared/SectionTitle";
import { fadeInLeft, fadeInRight } from "@/lib/animations";

// Limites identiques à celles de la route /api/contact
const limits = { name: 100, subject: 150, message: 5000 } as const;

type Field = "name" | "email" | "subject" | "message";
type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-xl border bg-surface px-4 py-3 text-foreground transition-colors focus:border-secondary focus:outline-none";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  // Message global (succès ou erreur), annoncé par la zone aria-live
  const [feedback, setFeedback] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Field, string>>>({});
  const [messageLength, setMessageLength] = useState(0);
  // Heure d'affichage du formulaire, vérifiée côté serveur (anti-spam)
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Dès que l'utilisateur modifie le formulaire, le message précédent n'a plus lieu d'être,
  // et l'erreur du champ en cours de correction disparaît
  const handleInput = (e: FormEvent<HTMLFormElement>) => {
    const field = (e.target as HTMLInputElement).name as Field;
    if (fieldErrors[field]) {
      setFieldErrors((errors) => {
        const rest = { ...errors };
        delete rest[field];
        return rest;
      });
    }
    if (status === "sent" || status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setFeedback("");
    setFieldErrors({});

    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      website: formData.get("website"),
      startedAt: startedAt.current,
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
        setFeedback(
          "Merci, votre message est bien parti. Je vous réponds dès que possible par email.",
        );
        form.reset();
        setMessageLength(0);
        return;
      }

      // Message du serveur (champs à corriger, trop d'envois, service indisponible…)
      const body = await response.json().catch(() => ({}));
      setFieldErrors(body.fields ?? {});
      setFeedback(body.error ?? "Le message n'a pas pu être envoyé. Réessayez dans un instant.");
      setStatus("error");
    } catch (error) {
      console.error(error);
      setFeedback(
        `Connexion impossible. Vérifiez votre réseau ou écrivez-moi directement à ${personalInfo.email}.`,
      );
      setStatus("error");
    }
  };

  // Attributs d'accessibilité et bordure d'un champ selon son erreur éventuelle
  const fieldProps = (field: Field) => ({
    "aria-invalid": fieldErrors[field] ? true : undefined,
    "aria-describedby": fieldErrors[field] ? `${field}-error` : undefined,
    className: `${inputClass} ${fieldErrors[field] ? "border-accent" : "border-border"}`,
  });

  const fieldError = (field: Field) =>
    fieldErrors[field] ? (
      <p id={`${field}-error`} className="text-sm text-red-700 dark:text-red-400">
        {fieldErrors[field]}
      </p>
    ) : null;

  return (
    <section id="contact" className="py-24 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Contact"
          title="Travaillons ensemble"
          description="Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter."
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
                Que ce soit pour une nouvelle idée, une collaboration ou simplement pour dire
                bonjour, je suis toujours ouvert à de nouvelles opportunités.
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
                  label: "Téléphone",
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
                      <p className="text-lg font-semibold text-foreground">{item.value}</p>
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
              onInput={handleInput}
              className="relative space-y-6 rounded-2xl border border-border bg-background p-8 shadow-xl"
            >
              {/* Champ piège pour les robots : invisible et ignoré par les humains */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="website">Ne pas remplir ce champ</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

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
                    maxLength={limits.name}
                    autoComplete="name"
                    placeholder="Votre nom"
                    {...fieldProps("name")}
                  />
                  {fieldError("name")}
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
                    autoComplete="email"
                    placeholder="votre@email.com"
                    {...fieldProps("email")}
                  />
                  {fieldError("email")}
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
                  maxLength={limits.subject}
                  placeholder="Sujet de votre message"
                  {...fieldProps("subject")}
                />
                {fieldError("subject")}
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor="message" className="text-sm font-medium text-muted">
                    Message
                  </label>
                  <span id="message-count" className="text-xs text-muted">
                    {messageLength.toLocaleString("fr-FR")} /{" "}
                    {limits.message.toLocaleString("fr-FR")}
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={limits.message}
                  placeholder="Décrivez votre projet..."
                  onChange={(e) => setMessageLength(e.target.value.length)}
                  {...fieldProps("message")}
                  aria-describedby={
                    fieldErrors.message ? "message-error message-count" : "message-count"
                  }
                />
                {fieldError("message")}
              </div>

              {/* Retour après envoi, annoncé par les lecteurs d'écran */}
              <div role="status" aria-live="polite">
                {feedback && (
                  <div
                    className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
                      status === "sent"
                        ? "border-primary-text/40 bg-primary/10 text-foreground"
                        : "border-accent/40 bg-accent/10 text-foreground"
                    }`}
                  >
                    {status === "sent" ? (
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary-text" />
                    ) : (
                      <AlertCircle
                        size={20}
                        className="mt-0.5 shrink-0 text-red-700 dark:text-red-400"
                      />
                    )}
                    <p>{feedback}</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
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
                    Message envoyé
                  </>
                ) : status === "error" ? (
                  <>
                    <Send size={20} />
                    Réessayer
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
