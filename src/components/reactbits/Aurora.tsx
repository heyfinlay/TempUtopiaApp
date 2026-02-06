"use client"

import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

type AuroraProps = {
  className?: string
}

export function Aurora({ className }: AuroraProps) {
  const prefersReducedMotion = useReducedMotion()

  const baseClass = cn(
    "pointer-events-none absolute inset-0 -z-10 opacity-70 blur-3xl",
    className
  )

  const gradientStyle = {
    background:
      "radial-gradient(35% 35% at 20% 20%, rgba(56,189,248,0.35) 0%, transparent 60%)," +
      "radial-gradient(40% 40% at 80% 15%, rgba(251,113,133,0.35) 0%, transparent 60%)," +
      "radial-gradient(45% 45% at 55% 70%, rgba(99,102,241,0.35) 0%, transparent 60%)",
  } as const

  if (prefersReducedMotion) {
    return <div aria-hidden className={baseClass} style={gradientStyle} />
  }

  return (
    <motion.div
      aria-hidden
      className={baseClass}
      style={gradientStyle}
      initial={{ opacity: 0.45, scale: 1 }}
      animate={{ opacity: [0.45, 0.7, 0.5], scale: [1, 1.04, 1] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}
