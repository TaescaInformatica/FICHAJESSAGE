import * as Label from "@radix-ui/react-label";
import * as Switch from "@radix-ui/react-switch";
import { motion } from "framer-motion";
import { Laptop } from "lucide-react";
import { cn } from "../../lib/utils";

interface WorkModeSelectorProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function WorkModeSelector({
  checked,
  onCheckedChange,
  disabled,
}: WorkModeSelectorProps) {
  return (
    <Label.Root
      className={cn(
        "group flex cursor-pointer items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 focus-within:ring-4 focus-within:ring-graferma-green/10",
        checked
          ? "border-graferma-green bg-graferma-successSoft shadow-sm"
          : "border-graferma-border bg-graferma-surface hover:border-graferma-borderStrong",
        disabled && "cursor-not-allowed opacity-70",
      )}
    >
      <motion.span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
          checked
            ? "bg-graferma-green/10 text-graferma-green"
            : "bg-[#F3E8D8] text-graferma-muted",
        )}
        animate={checked ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
      >
        <Laptop className="h-5 w-5" aria-hidden="true" />
      </motion.span>

      <span className="min-w-0 flex-1">
        <span className="block font-extrabold text-graferma-text dark:text-white">
          Teletrabajo
        </span>
        <span className="mt-1 block text-sm font-medium leading-5 text-graferma-muted dark:text-[#b8c5bd]">
          Marca esta opción si estás fichando fuera del centro de trabajo.
        </span>
      </span>

      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-label="Activar teletrabajo"
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full outline-none transition-colors focus-visible:ring-4 focus-visible:ring-graferma-green/20",
          checked ? "bg-graferma-green" : "bg-[#CDBAA6]",
        )}
      >
        <Switch.Thumb className="block h-6 w-6 translate-x-0.5 rounded-full bg-white shadow transition-transform duration-200 data-[state=checked]:translate-x-[22px]" />
      </Switch.Root>
    </Label.Root>
  );
}
