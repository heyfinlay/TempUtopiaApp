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
    name: "Starter",
    description: "For businesses who want fast follow-up",
    details: "Best when you need immediate response coverage across core enquiry channels.",
    includes: ["AI replies", "basic qualification", "booking integration"],
  },
  {
    name: "Growth",
    description: "For businesses with consistent enquiries",
    details: "Adds reminder cadence and clearer reporting for teams handling regular lead flow.",
    includes: ["everything in Starter", "reminders", "dashboard", "reporting"],
  },
  {
    name: "Scale",
    description: "For teams and multi-location businesses",
    details: "Designed for complex workflows where speed, routing and accountability all matter.",
    includes: ["everything in Growth", "custom workflows", "multi-agent handling", "deeper reporting"],
  },
]

export function PackagesSection({ onBookAudit }: PackagesSectionProps) {
  return (
    <section id="packages" className="m-section relative">
      <div className="m-container space-y-8">
        <Reveal>
          <SectionIntro
            title="Simple packages"
            subtitle="Choose the level of automation you want — we handle setup and launch."
            eyebrow="Packages"
          />
        </Reveal>
        <Reveal delay={0.03}>
          <p className="m-body rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 py-3 text-[color:var(--m-text-muted)]">
            Most clients invest between $X and $Y depending on setup.
          </p>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((tier, idx) => (
            <Reveal key={tier.name} delay={idx * 0.04}>
              <Card className={idx === 1 ? "h-full border-emerald-200 bg-emerald-50/70" : "h-full"}>
                <CardHeader className="space-y-3">
                  <CardTitle>
                    {tier.name}
                  </CardTitle>
                  <p className="m-body text-[color:var(--m-text)]">{tier.description}</p>
                  <p className="text-[length:var(--m-text-sm)] text-[color:var(--m-text-muted)]">{tier.details}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tier.includes.map((item) => (
                    <div key={item} className="flex gap-2 text-[length:var(--m-text-sm)] text-[color:var(--m-text)]">
                      <Check className="mt-0.5 size-4 text-emerald-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                  <Button onClick={onBookAudit} className="mt-4 w-full">
                    Book Audit
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
