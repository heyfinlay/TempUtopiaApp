import { cn } from "@/lib/utils"

type SectionIntroProps = {
  title: string
  subtitle?: string
  eyebrow?: string
  className?: string
}

export function SectionIntro({ title, subtitle, eyebrow, className }: SectionIntroProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {eyebrow ? (
        <p className="w-fit rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {subtitle ? <p className="max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">{subtitle}</p> : null}
    </div>
  )
}
