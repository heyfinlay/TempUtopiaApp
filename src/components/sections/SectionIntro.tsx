import { cn } from "@/lib/utils"

type SectionIntroProps = {
  title: string
  subtitle?: string
  eyebrow?: string
  className?: string
}

export function SectionIntro({ title, subtitle, eyebrow, className }: SectionIntroProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
      {subtitle ? <p className="max-w-3xl text-slate-600">{subtitle}</p> : null}
    </div>
  )
}
