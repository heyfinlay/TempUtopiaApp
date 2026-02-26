import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-[var(--m-radius-md)] border border-[var(--m-border)] bg-white px-3 text-[length:var(--m-text-body)] text-[color:var(--m-text)] transition-[border-color,box-shadow] outline-none placeholder:text-[color:var(--m-text-muted)] disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:border-[var(--m-accent)] focus-visible:ring-2 focus-visible:ring-[var(--m-accent)]/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
