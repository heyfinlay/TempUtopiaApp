import { Check, Minus } from "lucide-react"

import { SectionIntro } from "@/components/sections/SectionIntro"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    <section id="for-who" className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <SectionIntro
          title="This is built for businesses that sell with conversations."
          subtitle="If your business relies on enquiries turning into calls, this works extremely well."
          eyebrow="Who It’s For"
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-slate-200 bg-white shadow-sm">
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
          <Card className="border-slate-200 bg-slate-50 shadow-sm">
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
        </div>
      </div>
    </section>
  )
}

