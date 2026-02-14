import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-[110px] w-full rounded-lg border border-input bg-white px-3 py-2 text-sm shadow-xs transition-[color,box-shadow,border-color] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-emerald-400 focus-visible:ring-4 focus-visible:ring-emerald-100 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
