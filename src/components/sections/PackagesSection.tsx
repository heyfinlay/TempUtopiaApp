import { Check } from "lucide-react"

import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"
import { Button } from "@/components/marketing-ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/marketing-ui/card"

type PackagesSectionProps = { onBookAudit: () => void }

const packages = [
  { name: "Starter", description: "For businesses who want fast follow-up", includes: ["AI replies", "basic qualification", "booking integration"] },
  { name: "Growth", description: "For businesses with consistent enquiries", includes: ["everything in Starter", "reminders", "dashboard", "reporting"] },
  { name: "Scale", description: "For teams and multi-location businesses", includes: ["everything in Growth", "custom workflows", "multi-agent handling", "deeper reporting"] },
]

export function PackagesSection({ onBookAudit }: PackagesSectionProps) {
  return (
    <section id="packages" className="mk-section">
      <div className="mk-container space-y-8">
        <Reveal><SectionIntro title="Simple packages" subtitle="Choose the level of automation you want — we handle setup and launch." eyebrow="Packages" /></Reveal>
        <Reveal delay={0.03}><p className="mk-card mk-body px-4 py-3 text-base text-marketing-text">Most clients invest between $X and $Y depending on setup.</p></Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((tier, idx) => (
            <Reveal key={tier.name} delay={idx * 0.04}>
              <Card className={idx === 1 ? "border-marketing-accent" : ""}>
                <CardHeader className="space-y-2"><CardTitle>{tier.name} — {tier.description}</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {tier.includes.map((item) => (<div key={item} className="mk-body flex gap-2 text-base text-marketing-text"><Check className="mt-1 size-4 text-marketing-accent" /><span>{item}</span></div>))}
                  <Button onClick={onBookAudit} className="mt-3 w-full">Book Audit</Button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
