import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="relative mb-8 text-9xl font-bold tracking-tighter text-secondary/10 sm:text-[12rem]">
        404
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-secondary sm:text-6xl">
          Oups !
        </div>
      </div>
      <h2 className="mb-4 font-display text-2xl font-bold text-foreground sm:text-3xl">
        Cette page a disparu dans le cloud
      </h2>
      <p className="mb-8 max-w-md text-muted">
        Le lien que vous avez suivi est peut-être rompu ou la page a été déplacée. Pas de panique, le retour est facile.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25"
      >
        <ArrowLeft size={20} />
        Retour à l'accueil
      </Link>
    </div>
  );
}
