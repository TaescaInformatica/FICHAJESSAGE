import { ShieldCheck } from "lucide-react";

export function SecurityFooter() {
  return (
    <footer className="flex items-start justify-center gap-2 text-center text-xs text-graferma-muted dark:text-[#b8c5bd]">
      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-graferma-green dark:text-[#8ed9ad]" aria-hidden="true" />
      <div>
        <p className="font-extrabold">Sistema de control horario · Graferma</p>
        <p className="mt-0.5 font-medium">Registro seguro y trazable</p>
      </div>
    </footer>
  );
}
