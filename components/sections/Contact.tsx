"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";
import { personalInfo } from "@/data/personal";
import SectionTitle from "@/components/shared/SectionTitle";
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer } from "@/lib/animations";

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
        setTimeout(() => setStatus("idle"), 5000); // Reset after 5s
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
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Contact"
          title="Travaillons ensemble"
          description="Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter."
        />

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact info */}
          <motion.div
            className="space-y-8 lg:col-span-2"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
            >
              <motion.a
                variants={fadeInUp}
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-background">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    Email
                  </p>
                  <p className="text-sm font-medium text-foreground group-hover:text-secondary transition-colors">
                    {personalInfo.email}
                  </p>
                </div>
              </motion.a>

              <motion.a
                variants={fadeInUp}
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-4 group"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-light transition-colors group-hover:bg-primary group-hover:text-white">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    Téléphone
                  </p>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary-light transition-colors">
                    {personalInfo.phone}
                  </p>
                </div>
              </motion.a>

              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-light">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    Localisation
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {personalInfo.location}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Social */}
            <motion.div
              className="space-y-3"
              variants={fadeInUp}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-muted">
                Réseaux sociaux
              </p>
              <div className="flex gap-3">
                <motion.a
                  whileHover={{ y: -4, backgroundColor: "var(--color-primary)", color: "white" }}
                  whileTap={{ scale: 0.95 }}
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-muted transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -4, backgroundColor: "var(--color-foreground)", color: "var(--color-background)" }}
                  whileTap={{ scale: 0.95 }}
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-muted transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </motion.a>
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              className="rounded-2xl border border-primary/30 bg-primary/5 p-6"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="h-3 w-3 rounded-full bg-primary-light animate-pulse" />
                <span className="text-sm font-semibold text-primary-light">
                  Disponible
                </span>
              </div>
              <p className="text-sm text-muted">
                {personalInfo.availability}. Temps de réponse moyen : 24h.
              </p>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl border border-border bg-surface p-8 shadow-xl shadow-secondary/5"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Votre nom"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all focus:border-secondary focus:ring-1 focus:ring-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="votre@email.com"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all focus:border-secondary focus:ring-1 focus:ring-secondary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-foreground"
                >
                  Sujet *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="Sujet de votre message"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all focus:border-secondary focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Décrivez votre projet..."
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-dark outline-none transition-all focus:border-secondary focus:ring-1 focus:ring-secondary"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-8 py-3.5 font-semibold text-background transition-all duration-300 hover:bg-secondary-light hover:shadow-lg hover:shadow-secondary/25 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {status === "idle" && (
                  <>
                    <Send size={18} />
                    Envoyer le message
                  </>
                )}
                {status === "sending" && "Envoi en cours..."}
                {status === "sent" && "Message envoyé !"}
                {status === "error" && "Erreur, réessayez"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
