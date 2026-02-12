import { Check, X } from "lucide-react"

import { SectionIntro } from "@/components/sections/SectionIntro"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const comparison = [
  {
    name: "Most “chatbots”",
    bullets: ["Generic scripts", "No booking", "No tracking", "No optimisation"],
    positive: false,
  },
  {
    name: "Most agencies",
    bullets: ["Sell leads", "Don’t fix follow-up", "No visibility"],
    positive: false,
  },
  {
    name: "Temporary Utopia",
    bullets: ["We install the system", "It books calls", "You can see results", "We improve it over time"],
    positive: true,
  },
]

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <SectionIntro
          title="Why this works (and why most tools don’t)"
          subtitle="Most businesses don’t need more leads — they need to stop losing the ones they already have."
          eyebrow="Why Temporary Utopia"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {comparison.map((item) => (
            <Card
              key={item.name}
              className={item.positive ? "border-emerald-200 bg-emerald-50 shadow-sm" : "border-slate-200 bg-white shadow-sm"}
            >
              <CardHeader>
                <CardTitle className={item.positive ? "text-emerald-900" : "text-slate-900"}>{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {item.bullets.map((bullet) => (
                  <div key={bullet} className={item.positive ? "flex gap-2 text-sm text-emerald-900" : "flex gap-2 text-sm text-slate-700"}>
                    {item.positive ? <Check className="mt-0.5 size-4" /> : <X className="mt-0.5 size-4 text-slate-500" />}
                    <span>{bullet}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

