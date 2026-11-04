"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

// Limites identiques à celles de la route /api/contact
const limits = { name: 100, subject: 150, message: 5000 } as const;

type Field = "name" | "email" | "subject" | "message";
type Status = "idle" | "sending" | "sent" | "error";

const fields: Field[] = ["name", "email", "subject", "message"];

interface ContactFormProps {
  locale: Locale;
  email: string;
  t: Dictionary["contact"]["form"];
}

export default function ContactForm({ locale, email, t }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  // Message global (succès ou erreur), annoncé par la zone aria-live
  const [feedback, setFeedback] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Field, string>>>({});
  const [messageLength, setMessageLength] = useState(0);
  // Heure d'affichage du formulaire, vérifiée côté serveur (anti-spam)
  const startedAt = useRef(0);
  const numberFormat = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB");

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
      locale,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("sent");
        setFeedback(t.success);
        form.reset();
        setMessageLength(0);
        return;
      }

      // Le serveur renvoie un code stable : le texte vient du dictionnaire de la page
      const body = await response.json().catch(() => ({}));
      const invalid = Object.keys(body.fields ?? {}).filter((key): key is Field =>
        fields.includes(key as Field),
      );
      setFieldErrors(Object.fromEntries(invalid.map((field) => [field, t.errors[field]])));
      setFeedback(
        body.code === "invalid"
          ? t.fieldsInvalid
          : body.code === "rate_limited"
            ? t.tooMany
            : t.unavailable,
      );
      setStatus("error");
    } catch (error) {
      console.error(error);
      setFeedback(`${t.network} ${email}.`);
      setStatus("error");
    }
  };

  // Attributs d'accessibilité et bordure d'un champ selon son erreur éventuelle
  const fieldProps = (field: Field) => ({
    id: field,
    name: field,
    required: true,
    "aria-invalid": fieldErrors[field] ? true : undefined,
    "aria-describedby": fieldErrors[field] ? `${field}-error` : undefined,
    className: cn(
      "w-full rounded-2xl border bg-card-2 px-4 py-3.5 text-ink placeholder:text-ink-muted/70 transition-colors outline-none focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/30",
      fieldErrors[field] ? "border-ember-ink" : "border-field",
    ),
  });

  const label = (field: Field, text: string) => (
    <label htmlFor={field} className="text-sm font-medium text-ink-soft">
      {text}
    </label>
  );

  const fieldError = (field: Field) =>
    fieldErrors[field] ? (
      <p id={`${field}-error`} className="text-sm text-ember-ink">
        {fieldErrors[field]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} onInput={handleInput} className="relative flex flex-col gap-5">
      {/* Champ piège pour les robots : invisible et ignoré par les humains */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">{t.honeypot}</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          {label("name", t.name)}
          <input
            type="text"
            maxLength={limits.name}
            autoComplete="name"
            placeholder={t.namePlaceholder}
            {...fieldProps("name")}
          />
          {fieldError("name")}
        </div>
        <div className="flex flex-col gap-2">
          {label("email", t.email)}
          <input
            type="email"
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            {...fieldProps("email")}
          />
          {fieldError("email")}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {label("subject", t.subject)}
        <input
          type="text"
          maxLength={limits.subject}
          placeholder={t.subjectPlaceholder}
          {...fieldProps("subject")}
        />
        {fieldError("subject")}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          {label("message", t.message)}
          <span id="message-count" className="font-mono text-xs text-ink-muted">
            {numberFormat.format(messageLength)} / {numberFormat.format(limits.message)}
          </span>
        </div>
        <textarea
          rows={6}
          maxLength={limits.message}
          placeholder={t.messagePlaceholder}
          onChange={(e) => setMessageLength(e.target.value.length)}
          {...fieldProps("message")}
          aria-describedby={fieldErrors.message ? "message-error message-count" : "message-count"}
        />
        {fieldError("message")}
      </div>

      {/* Retour après envoi, annoncé par les lecteurs d'écran */}
      <div role="status" aria-live="polite">
        {feedback && (
          <div
            className={cn(
              "flex items-start gap-3 rounded-2xl border p-4 text-sm text-ink",
              status === "sent"
                ? "border-leaf-ink/40 bg-leaf-ink/10"
                : "border-ember-ink/40 bg-ember-ink/10",
            )}
          >
            {status === "sent" ? (
              <CheckCircle2
                size={20}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-leaf-ink"
              />
            ) : (
              <AlertCircle
                size={20}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-ember-ink"
              />
            )}
            <p>{feedback}</p>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-2xl bg-leaf font-semibold text-on-leaf outline-none transition-[filter] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <motion.span
              className="flex"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Send size={18} aria-hidden="true" />
            </motion.span>
            {t.sending}
          </>
        ) : status === "sent" ? (
          <>
            <CheckCircle2 size={18} aria-hidden="true" />
            {t.sent}
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" />
            {status === "error" ? t.retry : t.send}
          </>
        )}
      </button>
    </form>
  );
}
