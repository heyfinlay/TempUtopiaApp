import { Check } from "lucide-react"

import { SectionIntro } from "@/components/sections/SectionIntro"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    <section id="packages" className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <SectionIntro
          title="Simple packages"
          subtitle="Choose the level of automation you want — we handle setup and launch."
          eyebrow="Packages"
        />
        <p className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
          Most clients invest between $X and $Y depending on setup.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((tier, idx) => (
            <Card
              key={tier.name}
              className={idx === 1 ? "border-emerald-200 bg-emerald-50 shadow-sm" : "border-slate-200 bg-white shadow-sm"}
            >
              <CardHeader className="space-y-2">
                <CardTitle className={idx === 1 ? "text-emerald-900" : "text-slate-900"}>
                  {tier.name} — {tier.description}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tier.includes.map((item) => (
                  <div key={item} className={idx === 1 ? "flex gap-2 text-sm text-emerald-900" : "flex gap-2 text-sm text-slate-700"}>
                    <Check className="mt-0.5 size-4 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
                <Button onClick={onBookAudit} className="mt-3 w-full bg-emerald-600 text-white shadow-sm hover:bg-emerald-700">
                  Book Audit
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

