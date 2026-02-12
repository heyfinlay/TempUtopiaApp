import { CalendarCheck2, MessagesSquare, Rows3 } from "lucide-react"

import { SectionIntro } from "@/components/sections/SectionIntro"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const proofCards = [
  {
    title: "Lead conversation",
    description: "The system replies instantly and asks the right questions.",
    icon: MessagesSquare,
  },
  {
    title: "Booked appointment",
    description: "It schedules the call directly into your calendar.",
    icon: CalendarCheck2,
  },
  {
    title: "Simple tracking",
    description: "You can see every lead, outcome, and next step.",
    icon: Rows3,
  },
]

export function DemoProofSection() {
  return (
    <section id="demo-proof" className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <SectionIntro
          title="What it looks like in real life"
          subtitle="This is the exact experience your leads get — and what you see on your side."
          eyebrow="Demo Proof"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {proofCards.map((card) => (
            <Card key={card.title} className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="space-y-3">
                <card.icon className="size-5 text-emerald-600" />
                <CardTitle className="text-slate-900">{card.title} —</CardTitle>
                <CardDescription className="text-slate-600">{card.description}</CardDescription>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  {card.title === "Lead conversation" ? (
                    <div className="space-y-2 text-sm">
                      <div className="max-w-[86%] rounded-xl rounded-bl-sm bg-white px-3 py-2 text-slate-700">
                        Hi, I need help this week.
                      </div>
                      <div className="ml-auto max-w-[86%] rounded-xl rounded-br-sm bg-emerald-50 px-3 py-2 text-emerald-900">
                        Great, what day works best for a quick call?
                      </div>
                    </div>
                  ) : null}
                  {card.title === "Booked appointment" ? (
                    <div className="space-y-2 text-sm text-slate-700">
                      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">Tuesday</div>
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-900">
                        10:30 AM confirmed
                      </div>
                    </div>
                  ) : null}
                  {card.title === "Simple tracking" ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700">
                        <span>Lead</span>
                        <span>Qualified</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700">
                        <span>Call</span>
                        <span>Booked</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

