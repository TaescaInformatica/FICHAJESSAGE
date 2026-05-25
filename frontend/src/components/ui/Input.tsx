import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, id, disabled, ...props }, ref) => {
    const reactId = React.useId();
    const inputId = id ?? reactId;
    const errorId = `${inputId}-error`;

    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className="block text-sm font-bold text-graferma-text">
          {label}
        </label>
        <div className="relative">
          {leftIcon ? (
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-graferma-muted">
              {leftIcon}
            </div>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "h-14 w-full rounded-xl border bg-graferma-surface px-4 text-lg font-semibold text-graferma-text outline-none transition-all duration-200 placeholder:text-[#9A948B] focus:border-graferma-green focus:ring-4 focus:ring-graferma-green/10 disabled:cursor-not-allowed disabled:opacity-70 dark:border-[#315242] dark:bg-[#16261d] dark:text-white",
              leftIcon && "pl-12",
              error &&
                "border-graferma-error focus:border-graferma-error focus:ring-graferma-error/10",
              !error && "border-graferma-borderStrong",
              className,
            )}
            {...props}
          />
        </div>
        {error ? (
          <motion.p
            id={errorId}
            className="text-sm font-semibold text-graferma-error"
            initial={{ x: 0 }}
            animate={{ x: [-4, 4, -2, 0] }}
            transition={{ duration: 0.25 }}
          >
            {error}
          </motion.p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
