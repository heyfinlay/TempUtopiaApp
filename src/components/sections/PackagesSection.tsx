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
    includes: ["AI replies", "basic qualification", "booking integration"],
  },
  {
    name: "Growth",
    description: "For businesses with consistent enquiries",
    includes: ["everything in Starter", "reminders", "dashboard", "reporting"],
  },
  {
    name: "Scale",
    description: "For teams and multi-location businesses",
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
          <p className="rounded-xl border border-[var(--m-border)]/90 bg-[var(--m-surface)]/95 px-4 py-3 text-sm text-[color:var(--m-text)] shadow-[0_18px_30px_-26px_rgba(15,23,42,0.4)]">
            Most clients invest between $X and $Y depending on setup.
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((tier, idx) => (
            <Reveal key={tier.name} delay={idx * 0.04}>
              <Card
                className={
                  idx === 1
                    ? "border-[var(--m-border)] bg-emerald-50/90 shadow-[0_24px_50px_-30px_rgba(16,185,129,0.45)]"
                    : "border-[var(--m-border)]/80 bg-[var(--m-surface)]/95 shadow-[0_22px_44px_-30px_rgba(15,23,42,0.4)]"
                }
              >
                <CardHeader className="space-y-2">
                  <CardTitle className={idx === 1 ? "text-[color:var(--m-text)]" : "text-[color:var(--m-text)]"}>
                    {tier.name} — {tier.description}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tier.includes.map((item) => (
                    <div key={item} className={idx === 1 ? "flex gap-2 text-sm text-[color:var(--m-text)]" : "flex gap-2 text-sm text-[color:var(--m-text)]"}>
                      <Check className="mt-0.5 size-4 text-emerald-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                  <Button onClick={onBookAudit} className="mt-3 w-full">
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
