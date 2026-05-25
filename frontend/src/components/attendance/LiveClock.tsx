import { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Clock3 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex items-center gap-3 rounded-2xl border border-graferma-border/80 bg-graferma-surface/80 px-4 py-3 shadow-sm dark:border-[#315242]/80 dark:bg-[#16261d]/80"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-graferma-green/10 text-graferma-green dark:bg-graferma-green/20 dark:text-[#8ed9ad]">
        <Clock3 className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-graferma-muted dark:text-[#b8c5bd]">
          {capitalize(format(now, "EEEE, d 'de' MMMM", { locale: es }))}
        </p>
        <p
          className="text-2xl font-extrabold tracking-tight text-graferma-text dark:text-white"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {format(now, "HH:mm:ss")}
        </p>
      </div>
    </motion.div>
  );
}
