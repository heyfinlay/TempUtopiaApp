import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-[var(--mk-radius-sm)] border border-marketing-border bg-marketing-surface px-3 py-2 text-base text-marketing-text shadow-[var(--mk-shadow-sm)] outline-none transition-colors placeholder:text-marketing-muted disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:ring-2 focus-visible:ring-marketing-accent focus-visible:ring-offset-2 focus-visible:ring-offset-marketing-bg",
        className
      )}
      {...props}
    />
  )
}

export { Input }
