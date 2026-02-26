import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-[120px] w-full rounded-[var(--m-radius-md)] border border-[var(--m-border)] bg-white px-3 py-2 text-[var(--m-text-body)] text-[color:var(--m-text)] transition-[border-color,box-shadow] placeholder:text-[color:var(--m-text-muted)] outline-none focus-visible:border-[var(--m-accent)] focus-visible:ring-2 focus-visible:ring-[var(--m-accent)]/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
