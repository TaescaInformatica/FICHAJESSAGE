import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  X,
  XCircle,
} from "lucide-react";
import { cn } from "../../lib/utils";
import type { AttendanceStatusMessage } from "../../types/attendance";

interface StatusBannerProps extends AttendanceStatusMessage {
  onClose?: () => void;
}

const bannerStyles = {
  success: "border-graferma-success/25 bg-graferma-successSoft text-[#0E5137]",
  info: "border-graferma-info/20 bg-graferma-infoSoft text-[#1E3A8A]",
  warning: "border-graferma-warning/25 bg-graferma-warningSoft text-[#7C4A03]",
  error: "border-graferma-error/25 bg-graferma-errorSoft text-[#7A271A]",
  loading: "border-graferma-border bg-graferma-surface text-graferma-text",
};

function StatusIcon({ type }: Pick<StatusBannerProps, "type">) {
  const className = "mt-0.5 h-5 w-5 shrink-0";

  if (type === "success") return <CheckCircle2 className={className} aria-hidden="true" />;
  if (type === "warning") return <AlertTriangle className={className} aria-hidden="true" />;
  if (type === "error") return <XCircle className={className} aria-hidden="true" />;
  if (type === "loading") return <Loader2 className={cn(className, "animate-spin")} aria-hidden="true" />;
  return <Info className={className} aria-hidden="true" />;
}

export function StatusBanner({ type, title, message, onClose }: StatusBannerProps) {
  const isError = type === "error";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${type}-${message}`}
        role={isError ? "alert" : "status"}
        aria-live={isError ? "assertive" : "polite"}
        className={cn(
          "flex gap-3 rounded-2xl border p-4 text-left shadow-sm",
          bannerStyles[type],
        )}
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.22 }}
      >
        <StatusIcon type={type} />
        <div className="min-w-0 flex-1">
          {title ? <p className="font-extrabold">{title}</p> : null}
          <p className="text-sm font-semibold leading-6">{message}</p>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 outline-none transition hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-current"
            aria-label="Cerrar mensaje"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
}
