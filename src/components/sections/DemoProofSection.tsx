import { CalendarCheck2, MessagesSquare, Rows3 } from "lucide-react"

import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/marketing-ui/card"

const proofCards = [
  { title: "Lead conversation", description: "The system replies instantly and asks the right questions.", icon: MessagesSquare },
  { title: "Booked appointment", description: "It schedules the call directly into your calendar.", icon: CalendarCheck2 },
  { title: "Simple tracking", description: "You can see every lead, outcome, and next step.", icon: Rows3 },
]

export function DemoProofSection() {
  return (
    <section id="demo-proof" className="mk-section">
      <div className="mk-container space-y-8">
        <Reveal>
          <SectionIntro title="What it looks like in real life" subtitle="This is the exact experience your leads get — and what you see on your side." eyebrow="Demo Proof" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {proofCards.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 0.04}>
              <Card>
                <CardHeader className="space-y-3">
                  <card.icon className="size-5 text-marketing-accent" />
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription className="mk-body mk-muted text-base">{card.description}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
