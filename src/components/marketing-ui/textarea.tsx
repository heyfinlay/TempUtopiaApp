import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-[110px] w-full rounded-[var(--mk-radius-sm)] border border-marketing-border bg-marketing-surface px-3 py-2 text-base text-marketing-text shadow-[var(--mk-shadow-sm)] outline-none transition-colors placeholder:text-marketing-muted disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:ring-2 focus-visible:ring-marketing-accent focus-visible:ring-offset-2 focus-visible:ring-offset-marketing-bg",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
