import { Check } from "lucide-react"

import { SectionIntro } from "@/components/sections/SectionIntro"
import { Card, CardContent } from "@/components/ui/card"

const deliverables = [
  "AI receptionist + instant replies",
  "Lead qualification flow",
  "Calendar booking integration",
  "SMS + email reminders",
  "Lead dashboard + tracking",
  "Setup, testing, and launch",
  "Ongoing optimisation",
]

export function DeliverablesSection() {
  return (
    <section id="deliverables" className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <SectionIntro
          title="What we install for you"
          subtitle="You’re not buying software. You’re getting a system installed into your business."
          eyebrow="Deliverables"
        />
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="grid gap-3 pt-6 md:grid-cols-2">
            {deliverables.map((item) => (
              <div key={item} className="flex gap-2 text-sm text-slate-700">
                <Check className="mt-0.5 size-4 text-emerald-600" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

