import { motion, useReducedMotion } from "framer-motion";

export function BrandMark() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="wood-mark mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-white/60 shadow-[0_12px_30px_rgba(80,50,20,0.18)]"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-label="Graferma"
      role="img"
    >
      <span className="relative z-10 text-2xl font-black text-white drop-shadow-sm">G</span>
    </motion.div>
  );
}
