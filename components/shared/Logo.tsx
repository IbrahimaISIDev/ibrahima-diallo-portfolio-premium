import Link from "next/link";
import { personalInfo } from "@/data/personal";

interface LogoProps {
  // Le header y branche les confettis
  onClick?: () => void;
}

// Logo « Ibra·h·ima » : lien vers l'accueil, partagé par le header et le footer
export default function Logo({ onClick }: LogoProps) {
  return (
    <Link
      href="/#accueil"
      onClick={onClick}
      aria-label={`${personalInfo.fullName}, retour à l'accueil`}
      className="flex items-center gap-1 text-2xl font-bold font-display"
    >
      <span className="text-foreground">Ibra</span>
      <span className="text-secondary">h</span>
      <span className="text-foreground">ima</span>
    </Link>
  );
}
