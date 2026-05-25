import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { AttendanceStatusMessage } from "../../types/attendance";
import { Card } from "../ui/Card";
import { AttendanceForm } from "./AttendanceForm";
import { BrandMark } from "./BrandMark";
import { LiveClock } from "./LiveClock";
import { SecurityFooter } from "./SecurityFooter";
import { StatusBanner } from "./StatusBanner";
import { SystemStatus } from "./SystemStatus";

const containerVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

export function AttendanceCard() {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<AttendanceStatusMessage>({
    type: "info",
    title: "Listo para fichar",
    message: "Introduce tu código de operario válido para comenzar.",
  });

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
      variants={containerVariants}
    >
      <Card className="w-full max-w-[560px] overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-graferma-deep via-graferma-green to-graferma-wood" />

        <div className="space-y-6 p-5 sm:p-8">
          <motion.div variants={itemVariants} className="text-center">
            <BrandMark />
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-graferma-green dark:text-[#8ed9ad]">
              Entrada y salida
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-graferma-text dark:text-white sm:text-4xl">
              Registro de jornada
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base font-medium leading-7 text-graferma-muted dark:text-[#b8c5bd]">
              Introduce tu código de operario para registrar tu entrada o salida.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <LiveClock />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatusBanner {...status} onClose={() => setStatus({
              type: "info",
              title: "Listo para fichar",
              message: "Introduce tu código de operario válido para comenzar.",
            })} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AttendanceForm onStatusChange={setStatus} />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4 pt-2">
            <SystemStatus />
            <SecurityFooter />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
