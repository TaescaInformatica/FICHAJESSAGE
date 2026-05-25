import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

interface SpinnerProps {
  className?: string;
  label?: string;
}

export function Spinner({ className, label = "Cargando" }: SpinnerProps) {
  return (
    <Loader2
      aria-label={label}
      className={cn("h-4 w-4 animate-spin", className)}
    />
  );
}
