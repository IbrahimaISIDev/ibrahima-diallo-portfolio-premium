import { notFound } from "next/navigation";

// Toute URL inconnue (/inconnue, /en/inconnue) aboutit ici après réécriture :
// la 404 s'affiche dans le layout de la langue, avec header et footer.
export default function CatchAll() {
  notFound();
}
