import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="space-y-6 text-center">
        <h1 className="font-display text-8xl font-bold text-secondary">404</h1>
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Page introuvable
        </h2>
        <p className="max-w-md text-muted">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-primary-light"
        >
          <ArrowLeft size={18} />
          Retour à l&apos;accueil
        </a>
      </div>
    </main>
  );
}
