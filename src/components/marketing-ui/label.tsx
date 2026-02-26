"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive>) {
  return <LabelPrimitive data-slot="label" className={cn("mk-small font-medium text-marketing-text", className)} {...props} />
}

export { Label }
