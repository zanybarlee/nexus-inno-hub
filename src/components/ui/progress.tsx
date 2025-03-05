
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicators?: Array<{
    value: number;
    variant: "success" | "warning" | "danger";
  }>;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indicators, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
    {indicators?.map((indicator, idx) => (
      <div
        key={idx}
        className={cn(
          "absolute top-0 bottom-0 w-0.5",
          indicator.variant === "success" ? "bg-green-500" : 
          indicator.variant === "warning" ? "bg-yellow-500" : "bg-red-500"
        )}
        style={{ left: `${indicator.value}%` }}
      />
    ))}
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
