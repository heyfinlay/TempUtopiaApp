import { Check, Minus } from "lucide-react"

import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/marketing-ui/card"

const perfectFor = [
  "Clinics & health services",
  "Trades & local service businesses",
  "High-ticket service providers",
  "Agencies and consultants",
  "Real estate / finance / legal",
]

const notIdealFor = [
  "Businesses with no enquiry volume",
  "People who want “more followers”",
  "One-product stores with no sales process",
]

export function ForWhoSection() {
  return (
    <section id="for-who" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionIntro
            title="This is built for businesses that sell with conversations."
            subtitle="If your business relies on enquiries turning into calls, this works extremely well."
            eyebrow="Who It’s For"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="border-slate-200/80 bg-white/90 shadow-[0_16px_36px_-24px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80 hover:shadow-[0_24px_52px_-28px_rgba(16,185,129,0.32)]">
              <CardHeader>
                <CardTitle className="text-slate-900">Perfect for</CardTitle>
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
