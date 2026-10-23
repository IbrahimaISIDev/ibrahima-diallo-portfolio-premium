"use client";

import { Printer } from "lucide-react";
import Button from "@/components/ui/Button";

// Ouvre la boîte d'impression : les styles print de globals.css mettent la page au format papier
export default function PrintButton({ label }: { label: string }) {
  return (
    <Button variant="outline" size="lg" onClick={() => window.print()}>
      <Printer size={16} aria-hidden="true" />
      {label}
    </Button>
  );
}
