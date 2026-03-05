import { Check, Minus } from "lucide-react"

import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/marketing-ui/card"

const perfectFor = [
  "Founder‑led consulting firms",
  "Boutique agencies with real delivery work",
  "Advisory practices with heavy reporting",
  "Professional services under 10 staff",
  "Teams drowning in inbox + proposals",
]

const notIdealFor = [
  "Businesses with no client delivery",
  "Teams that won’t change their workflows",
  "Low‑value, high‑volume commodity sales",
]

export function ForWhoSection() {
  return (
    <section id="fit" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionIntro
            title="Built for firms where billable time matters"
            subtitle="If your revenue depends on delivery work, this creates immediate leverage."
            eyebrow="Who It’s For"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="border-slate-200/80 bg-white/90 shadow-[0_16px_36px_-24px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80 hover:shadow-[0_24px_52px_-28px_rgba(16,185,129,0.32)]">
              <CardHeader>
                <CardTitle className="text-slate-900">Great fit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {perfectFor.map((item) => (
                  <div key={item} className="flex gap-2 text-sm text-slate-700">
                    <Check className="mt-0.5 size-4 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={0.06}>
            <Card className="border-slate-200/80 bg-slate-50/90 shadow-[0_16px_36px_-24px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_52px_-28px_rgba(15,23,42,0.3)]">
              <CardHeader>
                <CardTitle className="text-slate-900">Not ideal for</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notIdealFor.map((item) => (
                  <div key={item} className="flex gap-2 text-sm text-slate-700">
                    <Minus className="mt-0.5 size-4 text-slate-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
