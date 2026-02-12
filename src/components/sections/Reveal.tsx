"use client"

import type { PropsWithChildren } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

type RevealProps = PropsWithChildren<{
  className?: string
  delay?: number
  y?: number
}>

export function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.52, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
