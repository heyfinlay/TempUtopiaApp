import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const timeline = [
  {
    title: "15 min audit call",
    description: "We review your enquiry flow and where leads drop off.",
  },
  {
    title: "We map your system",
    description: "We show you what we’d automate and how it works.",
  },
  {
    title: "Fast setup (days, not months)",
    description: "If you want it, we install it and launch it.",
  },
]

export function AuditTimelineSection() {
  return (
    <section id="audit-timeline" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionIntro
            title="What happens when you book a free audit"
            subtitle="You’ll leave the call knowing exactly what’s leaking leads in your business."
            eyebrow="After You Book"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {timeline.map((step, idx) => (
            <Reveal key={step.title} delay={idx * 0.04}>
              <Card className="border-slate-200/80 bg-white/90 shadow-[0_18px_36px_-24px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80">
                <CardHeader className="space-y-3">
                  <Badge variant="outline" className="w-fit border-emerald-200 bg-emerald-50 text-emerald-700">
                    {String(idx + 1).padStart(2, "0")}
                  </Badge>
                  <CardTitle className="text-slate-900">{step.title} —</CardTitle>
                  <CardDescription className="text-slate-600">{step.description}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
