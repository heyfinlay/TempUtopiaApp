import { Check } from "lucide-react"

import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"
import { Button } from "@/components/marketing-ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/marketing-ui/card"

type PackagesSectionProps = {
  onBookAudit: () => void
}

const packages = [
  {
    name: "Operator Installation",
    description: "The core install (best for most firms)",
    includes: [
      "OpenClaw installed and secured",
      "1–2 operators configured",
      "Inbox + proposal + CRM workflows",
      "Guardrails and handover",
    ],
  },
  {
    name: "Optimisation",
    description: "Monthly performance tuning",
    includes: [
      "Workflow improvements",
      "Reporting cadence updates",
      "Operator expansion",
      "Priority support",
    ],
  },
  {
    name: "Scale",
    description: "Multi‑team or complex workflows",
    includes: [
      "Everything in Optimisation",
      "Custom integrations",
      "Monitoring + reporting",
      "Advanced permissions",
    ],
  },
]

export function PackagesSection({ onBookAudit }: PackagesSectionProps) {
  return (
    <section id="plans" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionIntro
            title="Choose the install level"
            subtitle="Most firms start with Operator Installation and add Optimisation later."
            eyebrow="Plans"
          />
        </Reveal>
        <Reveal delay={0.03}>
          <p className="rounded-xl border border-slate-200/90 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-[0_18px_30px_-26px_rgba(15,23,42,0.4)]">
            Pricing is tailored by scope and operator count. We’ll quote after a short call.
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((tier, idx) => (
            <Reveal key={tier.name} delay={idx * 0.04}>
              <Card
                className={
                  idx === 0
                    ? "border-emerald-200 bg-emerald-50/90 shadow-[0_24px_50px_-30px_rgba(16,185,129,0.45)]"
                    : "border-slate-200/80 bg-white/90 shadow-[0_22px_44px_-30px_rgba(15,23,42,0.4)]"
                }
              >
                <CardHeader className="space-y-2">
                  <CardTitle className={idx === 0 ? "text-emerald-900" : "text-slate-900"}>
                    {tier.name} — {tier.description}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tier.includes.map((item) => (
                    <div key={item} className={idx === 0 ? "flex gap-2 text-sm text-emerald-900" : "flex gap-2 text-sm text-slate-700"}>
                      <Check className="mt-0.5 size-4 text-emerald-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                  <Button onClick={onBookAudit} className="mt-3 w-full">
                    Book Install Call
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
