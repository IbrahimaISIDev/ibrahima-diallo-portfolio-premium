import Link from "next/link";
import { cn } from "@/lib/utils";

interface WordmarkProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

// Signature « Ibra·h·ima », le h en or : lien vers l'accueil (header, footer, menu mobile)
export default function Wordmark({ href, label, className, onClick }: WordmarkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "rounded-lg font-display text-lg font-bold tracking-[-0.02em] text-ink outline-none focus-visible:ring-2 focus-visible:ring-gold",
        className,
      )}
    >
      Ibra<span className="text-gold-ink">h</span>ima
    </Link>
  );
}
