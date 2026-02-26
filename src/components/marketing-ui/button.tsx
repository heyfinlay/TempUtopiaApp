import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--m-radius-md)] text-[var(--m-text-sm)] font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--m-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--m-accent)] text-white shadow-[var(--m-shadow-button)] hover:-translate-y-0.5 hover:bg-[var(--m-accent-strong)]",
        outline:
          "border border-[var(--m-border)] bg-white text-[var(--m-text)] hover:bg-[var(--m-surface-soft)]",
        secondary:
          "bg-[var(--m-surface-soft)] text-[var(--m-text)] border border-[var(--m-border)] hover:bg-white",
        ghost: "text-[var(--m-text-muted)] hover:bg-[var(--m-surface-soft)] hover:text-[var(--m-text)]",
        destructive: "bg-red-600 text-white hover:bg-red-500",
        link: "text-[var(--m-accent)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-7 gap-1 px-2 text-xs",
        sm: "h-9 px-3",
        lg: "h-11 px-6",
        icon: "size-10",
        "icon-xs": "size-7",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" data-variant={variant} data-size={size} className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
