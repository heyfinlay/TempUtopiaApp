import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"
import { Badge } from "@/components/marketing-ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/marketing-ui/card"

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
    <section id="audit-timeline" className="m-section relative">
      <div className="m-container space-y-8">
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
              <Card className="border-[var(--m-border)]/80 bg-[var(--m-surface)]/95 shadow-[0_18px_36px_-24px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--m-border)]/80">
                <CardHeader className="space-y-3">
                  <Badge variant="outline" className="w-fit border-[var(--m-border)] bg-emerald-50 text-[color:var(--m-accent)]">
                    {String(idx + 1).padStart(2, "0")}
                  </Badge>
                  <CardTitle className="text-[color:var(--m-text)]">{step.title} —</CardTitle>
                  <CardDescription className="text-[color:var(--m-text-muted)]">{step.description}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
