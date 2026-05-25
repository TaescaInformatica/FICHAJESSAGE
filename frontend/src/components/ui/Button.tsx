import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";
import { Spinner } from "./Spinner";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-bold outline-none transition-all duration-200 focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-70",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-graferma-green to-graferma-active text-white shadow-green hover:from-graferma-hover hover:to-graferma-deep focus-visible:ring-graferma-green/20",
        secondary:
          "border border-graferma-borderStrong bg-graferma-surface text-graferma-text hover:bg-white focus-visible:ring-graferma-green/15",
        ghost:
          "text-graferma-muted hover:bg-graferma-cream/70 focus-visible:ring-graferma-green/15",
        danger:
          "bg-graferma-error text-white hover:bg-[#991B1B] focus-visible:ring-graferma-error/20",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-sm",
        lg: "h-14 px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref" | "children">,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, isLoading = false, leftIcon, disabled, children, ...props },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        whileHover={isDisabled ? undefined : { y: -1 }}
        whileTap={isDisabled ? undefined : { scale: 0.99 }}
        {...props}
      >
        {isLoading ? <Spinner className="h-5 w-5" /> : leftIcon}
        <span>{children}</span>
      </motion.button>
    );
  },
);

Button.displayName = "Button";
