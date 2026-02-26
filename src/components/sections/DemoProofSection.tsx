import { CalendarCheck2, MessagesSquare, Rows3 } from "lucide-react"

import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/marketing-ui/card"

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
    <section id="demo-proof" className="m-section relative">
      <div className="m-container space-y-8">
        <Reveal>
          <SectionIntro
            title="What it looks like in real life"
            subtitle="This is the exact experience your leads get — and what you see on your side."
            eyebrow="Demo Proof"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {proofCards.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 0.04}>
              <Card className="border-[var(--m-border)]/80 bg-[var(--m-surface)]/95 shadow-[0_16px_36px_-24px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--m-border)]/80 hover:shadow-[0_24px_50px_-24px_rgba(16,185,129,0.35)]">
                <CardHeader className="space-y-3">
                  <card.icon className="size-5 text-emerald-600" />
                  <CardTitle className="text-[color:var(--m-text)]">{card.title} —</CardTitle>
                  <CardDescription className="text-[color:var(--m-text-muted)]">{card.description}</CardDescription>
                  <div className="rounded-xl border border-[var(--m-border)] bg-[var(--m-surface-soft)] p-3">
                    {card.title === "Lead conversation" ? (
                      <div className="space-y-2 text-sm">
                        <div className="max-w-[86%] rounded-xl rounded-bl-sm bg-white px-3 py-2 text-[color:var(--m-text)]">
                          Hi, I need help this week.
                        </div>
                        <div className="ml-auto max-w-[86%] rounded-xl rounded-br-sm bg-emerald-50 px-3 py-2 text-[color:var(--m-text)]">
                          Great, what day works best for a quick call?
                        </div>
                      </div>
                    ) : null}
                    {card.title === "Booked appointment" ? (
                      <div className="space-y-2 text-sm text-[color:var(--m-text)]">
                        <div className="rounded-lg border border-[var(--m-border)] bg-white px-3 py-2">Tuesday</div>
                        <div className="rounded-lg border border-[var(--m-border)] bg-emerald-50 px-3 py-2 text-[color:var(--m-text)]">
                          10:30 AM confirmed
                        </div>
                      </div>
                    ) : null}
                    {card.title === "Simple tracking" ? (
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between rounded-lg border border-[var(--m-border)] bg-white px-3 py-2 text-[color:var(--m-text)]">
                          <span>Lead</span>
                          <span>Qualified</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-[var(--m-border)] bg-white px-3 py-2 text-[color:var(--m-text)]">
                          <span>Call</span>
                          <span>Booked</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
