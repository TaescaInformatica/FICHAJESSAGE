import * as React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[28px] border border-graferma-border/70 bg-white/85 shadow-card backdrop-blur-xl dark:border-[#315242]/70 dark:bg-[#101a14]/85",
        className,
      )}
      {...props}
    />
  ),
);

Card.displayName = "Card";
