import { cn } from "@/lib/utils"

type SectionIntroProps = {
  title: string
  subtitle?: string
  eyebrow?: string
  className?: string
}

export function SectionIntro({ title, subtitle, eyebrow, className }: SectionIntroProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {eyebrow ? <p className="mk-eyebrow">{eyebrow}</p> : null}
      <h2 className="mk-h2 max-w-4xl">{title}</h2>
      {subtitle ? <p className="mk-body mk-muted max-w-3xl">{subtitle}</p> : null}
    </div>
  )
}
