import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Cpu, ShieldCheck, Code2, Rocket, LayoutPanelLeft } from "lucide-react";
import { projects } from "@/data/projects";
import LightboxImage from "@/components/shared/LightboxImage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Projet introuvable" };

  return {
    title: `${project.title} - Ibrahima Sory Diallo`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];

  return (
    <main className="pt-20 bg-background min-h-screen">
      <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-6">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-secondary hover:translate-x-[-4px] transition-transform"
            >
              <ArrowLeft size={16} />
              Retour au Portfolio
            </Link>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-[10px] font-black uppercase tracking-widest text-secondary mb-4">
                {project.category}
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-black text-foreground tracking-tighter leading-[0.9] mb-6">
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-muted max-w-2xl leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-black text-white shadow-xl shadow-primary/30 hover:bg-primary-light transition-all text-sm"
              >
                <Rocket size={18} />
                Lancer le Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full border border-border bg-surface px-8 py-4 font-black text-foreground hover:border-secondary transition-all text-sm"
              >
                <Github size={18} />
                Source Code
              </a>
            )}
          </div>
        </div>

        {/* Featured Image Section */}
        <section className="mb-24 relative group">
          <div className="rounded-[2.5rem] overflow-hidden border border-border/50 shadow-2xl">
            <LightboxImage
              src={project.image}
              alt={project.description}
              title={project.title}
            />
          </div>
        </section>

        {/* Deep Case Study Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">

          {/* Main Column (Technical Story) */}
          <div className="lg:col-span-8 space-y-24">

            {/* Architecture Section */}
            {project.architecture && (
              <section className="space-y-12">
                <div className="flex items-center gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary border border-secondary/20">
                    <Cpu size={24} />
                  </div>
                  <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground">Architecture System</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.architecture.map((item, i) => (
                    <div key={i} className="p-6 rounded-2xl border border-border/40 bg-surface/30 hover:border-secondary/30 transition-colors group">
                      <div className="h-2 w-8 bg-secondary/30 group-hover:bg-secondary rounded-full mb-4 transition-all" />
                      <p className="font-bold text-foreground leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Implementation & Challenges */}
            {project.challenges && (
              <section className="space-y-12">
                <div className="flex items-center gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-light border border-primary/20">
                    <ShieldCheck size={24} />
                  </div>
                  <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground">Défis Techniques</h2>
                </div>
                <div className="space-y-8">
                  {project.challenges.map((challenge, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <span className="text-secondary font-black text-2xl opacity-20">0{i + 1}</span>
                      <p className="text-lg text-muted font-medium leading-relaxed pt-1 border-b border-border/20 pb-4 w-full">
                        {challenge}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Code Highlight */}
            {project.codeSnippet && (
              <section className="space-y-12">
                <div className="flex items-center gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/5 text-foreground border border-border/50">
                    <Code2 size={24} />
                  </div>
                  <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground">Technical Spotlight</h2>
                </div>
                <div className="rounded-3xl border border-border bg-[#0d1117] p-1 shadow-2xl relative overflow-hidden group">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-background/50">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                      <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                      <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-dark">logic_core.ts</span>
                  </div>
                  <pre className="p-8 text-sm sm:text-base font-mono leading-relaxed overflow-x-auto text-blue-200/90 [scrollbar-width:none] [-ms-overflow-style:none]">
                    <code>{project.codeSnippet}</code>
                  </pre>
                  {/* Decorative glow */}
                  <div className="absolute top-0 right-0 h-32 w-32 bg-secondary/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </section>
            )}
          </div>

          {/* Sidebar (Meta Info) */}
          <aside className="lg:col-span-4 space-y-12 h-fit lg:sticky lg:top-32">

            {/* Project Status & Meta */}
            <div className="p-8 rounded-[2rem] border border-border/50 bg-surface/30 space-y-8">
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">Statut Projet</h4>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-black text-foreground">{project.status || "Live"}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">Impact Majeur</h4>
                <p className="font-bold text-foreground leading-tight">{project.impact}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/40">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">Core Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-background border border-border/50 text-xs font-bold text-muted transition-colors hover:text-secondary hover:border-secondary/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Inspiration Note */}
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-secondary/5 to-primary/5 border border-secondary/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary mb-6">
                <LayoutPanelLeft size={20} />
              </div>
              <p className="text-sm font-medium italic text-muted leading-relaxed">
                "Ce projet démontre ma capacité à transformer des problématiques métiers complexes en solutions scalables tout en garantissant une expérience utilisateur fluide."
              </p>
            </div>
          </aside>
        </div>

        {/* Project Navigation Footer */}
        <nav className="mt-40 pt-16 border-t border-border/40 grid gap-6 sm:grid-cols-2">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group p-10 rounded-[2.5rem] border border-border/40 bg-surface/20 transition-all hover:border-secondary/40 hover:bg-secondary/5 flex flex-col items-start gap-4"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-dark group-hover:text-secondary transition-colors">← Précédent</span>
            <p className="font-display text-2xl font-black text-foreground">{prevProject.title}</p>
          </Link>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group p-10 rounded-[2.5rem] border border-border/40 bg-surface/20 transition-all hover:border-secondary/40 hover:bg-secondary/5 flex flex-col items-end text-right gap-4"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-dark group-hover:text-secondary transition-colors">Suivant →</span>
            <p className="font-display text-2xl font-black text-foreground">{nextProject.title}</p>
          </Link>
        </nav>
      </article>
    </main>
  );
}
