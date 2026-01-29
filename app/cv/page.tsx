"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Printer, Download, MapPin, Mail, Phone, ExternalLink, GraduationCap, Briefcase, Award } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { skills } from "@/data/skills";
import { experiences } from "@/data/experience";
import { fadeInUp, staggerContainer, fadeInLeft, fadeInRight } from "@/lib/animations";
import MagneticButton from "@/components/shared/MagneticButton";
import Link from "next/link";
import { useRef } from "react";

export default function ResumePage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const handlePrint = () => {
        window.print();
    };

    return (
        <main className="min-h-screen bg-background pt-32 pb-20 overflow-x-hidden" ref={containerRef}>
            {/* Scroll Progress Indicator for Timeline */}
            <motion.div
                className="fixed left-4 top-1/2 -translate-y-1/2 w-1 bg-secondary origin-top rounded-full hidden lg:block z-50 print:hidden"
                style={{ scaleY, height: "40vh" }}
            />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Resume Header / Action Bar */}
                <motion.div
                    className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 print:hidden"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                >
                    <div>
                        <Link href="/#accueil" className="text-secondary font-bold hover:underline mb-2 inline-block">
                            ← Retour au Portfolio
                        </Link>
                        <h1 className="text-4xl font-display font-bold text-foreground">Expérience Digitale</h1>
                        <p className="text-muted italic">Conçu pour l'écran, optimisé pour l'impression</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <MagneticButton>
                            <a
                                href="/cv/Ibrahima-Sory-Diallo-CV_1.pdf"
                                download
                                className="flex grow sm:grow-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-light transition-all cursor-pointer whitespace-nowrap"
                            >
                                <Download size={18} />
                                Télécharger PDF Original
                            </a>
                        </MagneticButton>
                    </div>
                </motion.div>

                {/* CV Content - Premium Paper Style */}
                <motion.div
                    className="relative bg-surface/30 border border-border/50 rounded-[1.5rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-20 shadow-2xl backdrop-blur-sm print:bg-white print:border-none print:p-0 print:text-black print:shadow-none print:backdrop-none"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Header: Identity */}
                    <div className="relative border-b border-border/50 print:border-black/10 pb-10 sm:pb-16 mb-12 sm:mb-20">
                        {/* Abstract background element */}
                        <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl print:hidden -z-10" />

                        <div className="flex flex-col md:flex-row justify-between gap-8 sm:gap-12 relative z-10">
                            <div className="space-y-4">
                                <motion.div variants={fadeInLeft}>
                                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-foreground print:text-black tracking-tight leading-tight">{personalInfo.fullName}</h2>
                                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-secondary to-primary-light bg-clip-text text-transparent mt-2">
                                        {personalInfo.title}
                                    </p>
                                </motion.div>
                                <motion.p variants={fadeInUp} className="text-muted text-base sm:text-lg max-w-2xl print:text-black/80 font-medium">
                                    {personalInfo.tagline}
                                </motion.p>
                            </div>

                            <motion.div variants={fadeInRight} className="space-y-3 sm:space-y-4 text-sm md:text-right print:text-black min-w-[200px]">
                                {[
                                    { icon: MapPin, text: personalInfo.location },
                                    { icon: Mail, text: personalInfo.email },
                                    { icon: Phone, text: personalInfo.phone },
                                    { icon: ExternalLink, text: "ibrahima.dev" }
                                ].map((contact, i) => (
                                    <div key={i} className="flex items-center md:justify-end gap-3 text-muted print:text-black group">
                                        <span className="text-foreground font-medium print:text-black break-all">{contact.text}</span>
                                        <contact.icon size={16} className="text-secondary group-hover:scale-120 transition-transform shrink-0" />
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-20">

                        {/* Left Side: Professional Path (Span 7) */}
                        <div className="lg:col-span-7 space-y-16 sm:space-y-24">

                            {/* Experiences */}
                            <section>
                                <div className="flex items-center gap-6 mb-8 sm:mb-12">
                                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-secondary/10 text-secondary">
                                        <Briefcase size={20} className="sm:w-6 sm:h-6" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-[0.2em] text-foreground print:text-black">Parcours Pro</h3>
                                </div>

                                <div className="space-y-12 sm:space-y-16 relative">
                                    {/* Vertical Line for timeline */}
                                    <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-secondary/50 via-border to-border/20 print:bg-black/10" />

                                    {experiences.filter(e => !e.title.includes("Licence") && !e.title.includes("Apprenant")).map((exp, i) => (
                                        <motion.div
                                            key={exp.company}
                                            className="relative pl-10 sm:pl-14 group"
                                            variants={fadeInUp}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            {/* Pulse Dot */}
                                            <div className="absolute left-[13px] sm:left-[21px] top-1.5 h-1.5 w-1.5 rounded-full bg-secondary ring-4 ring-secondary/10 z-10 group-hover:scale-150 transition-transform" />

                                            <div className="space-y-3 sm:space-y-4">
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                                    <span className="text-[10px] sm:text-xs font-black text-secondary uppercase tracking-[0.2em]">{exp.period}</span>
                                                    <div className="h-1 w-1 rounded-full bg-muted-dark hidden sm:block" />
                                                    <p className="text-primary-light font-bold uppercase text-[10px] sm:text-xs tracking-widest">{exp.company}</p>
                                                </div>

                                                <h4 className="text-xl sm:text-2xl font-display font-bold text-foreground print:text-black group-hover:text-secondary transition-colors leading-tight">
                                                    {exp.title}
                                                </h4>

                                                <p className="text-muted text-sm sm:text-base leading-relaxed print:text-black/80">
                                                    {exp.description}
                                                </p>

                                                <div className="flex flex-wrap gap-2 pt-1 sm:pt-2">
                                                    {exp.technologies.map(tech => (
                                                        <span key={tech} className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2 sm:px-3 py-1 bg-surface-light/30 border border-border/50 rounded-full text-muted-dark print:border-black/10 print:text-black/60">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <div className="flex items-center gap-6 mb-8 sm:mb-12">
                                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary-light">
                                        <GraduationCap size={20} className="sm:w-6 sm:h-6" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-[0.2em] text-foreground print:text-black">Académique</h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                    {experiences.filter(e => e.title.includes("Licence") || e.title.includes("Apprenant")).map((edu) => (
                                        <motion.div
                                            key={edu.company}
                                            className="p-5 sm:p-6 rounded-2xl border border-border/50 bg-surface/20 print:border-black/10 print:p-0 print:bg-transparent transition-colors hover:border-primary/30"
                                            variants={fadeInUp}
                                        >
                                            <span className="text-[10px] font-black text-secondary tracking-widest uppercase">{edu.period}</span>
                                            <h4 className="text-base sm:text-lg font-bold text-foreground print:text-black mt-2 leading-snug">{edu.title}</h4>
                                            <p className="text-sm font-bold text-primary-light mt-1">{edu.company}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Side: Skills & Strengths (Span 5) */}
                        <div className="lg:col-span-5 space-y-16 sm:space-y-20 lg:border-l lg:border-border/50 lg:pl-12 xl:pl-16 print:border-none print:pl-0">

                            {/* Visual Skills Charts */}
                            <section>
                                <div className="flex items-center gap-4 mb-8 sm:mb-12">
                                    <div className="h-px flex-1 bg-border/50 print:bg-black/10" />
                                    <h3 className="text-base sm:text-lg font-display font-black uppercase tracking-[0.3em] text-secondary whitespace-nowrap">Expertise</h3>
                                </div>

                                <div className="space-y-8 sm:space-y-10">
                                    {skills.slice(0, 12).map((skill, i) => (
                                        <motion.div
                                            key={skill.name}
                                            className="space-y-2.5 sm:space-y-3"
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            viewport={{ once: true }}
                                        >
                                            <div className="flex justify-between items-end">
                                                <span className="text-[11px] sm:text-sm font-black uppercase tracking-widest text-foreground print:text-black">{skill.name}</span>
                                                <span className="text-[10px] sm:text-xs font-black text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">{skill.level}%</span>
                                            </div>
                                            <div className="relative h-1.5 sm:h-2 w-full bg-border/30 print:bg-black/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-primary"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                            {/* Certifications or Distinctions */}
                            <section className="print:break-inside-avoid">
                                <h3 className="text-base sm:text-lg font-display font-black uppercase tracking-[0.3em] text-secondary mb-8 sm:mb-12 flex items-center gap-4">
                                    <Award size={20} className="shrink-0" /> Accomplissements
                                </h3>
                                <div className="space-y-5 sm:space-y-6">
                                    {[
                                        { title: "Sénégal Digital Show", desc: "Speaker & Participant innovant" },
                                        { title: "Bootcamp Sonatel", desc: "Top 5% des apprenants tech" },
                                        { title: "ISI Excellence", desc: "Major de promotion GL (L2/L3)" }
                                    ].map((award, i) => (
                                        <motion.div
                                            key={i}
                                            className="group flex gap-4 p-4 rounded-xl border border-border/50 bg-background/30 hover:bg-surface/50 transition-all cursor-default print:border-black/10 print:bg-transparent"
                                            whileHover={{ x: 10 }}
                                        >
                                            <div className="h-2 w-2 mt-2 rounded-full bg-secondary shrink-0" />
                                            <div className="space-y-0.5">
                                                <h5 className="text-sm sm:text-base font-bold text-foreground print:text-black">{award.title}</h5>
                                                <p className="text-[11px] sm:text-xs text-muted print:text-black/60 font-medium leading-relaxed">{award.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Footer / Meta */}
                    <div className="mt-20 sm:mt-32 pt-10 sm:pt-16 border-t border-border/50 print:border-black/10 flex flex-col items-center gap-6">
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 print:hidden">
                            {Object.entries(personalInfo.social)
                                .filter(([key]) => key !== 'calendly')
                                .map(([key, url]) => (
                                    <a key={key} href={url} target="_blank" className="text-muted hover:text-secondary transition-colors uppercase text-[10px] font-black tracking-widest px-2 py-1">
                                        {key}
                                    </a>
                                ))}
                        </div>
                        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-muted-dark print:text-black/40 text-center leading-relaxed">
                            © 2026 Ibrahima Sory Diallo — Digital Signature
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
