import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "destructive";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          {
            "border-transparent bg-primary text-white": variant === "default",
            "border-transparent bg-surface text-muted": variant === "secondary",
            "border-border text-foreground": variant === "outline",
            "border-transparent bg-red-500/20 text-red-400":
              variant === "destructive",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
