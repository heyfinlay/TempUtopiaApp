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
      {eyebrow ? (
        <p className="inline-flex rounded-full border border-[var(--m-border)] bg-[var(--m-surface-soft)] px-3 py-1 m-overline text-[color:var(--m-text-muted)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="m-h2 max-w-4xl">{title}</h2>
      {subtitle ? <p className="m-body m-muted max-w-3xl">{subtitle}</p> : null}
    </div>
  )
}
