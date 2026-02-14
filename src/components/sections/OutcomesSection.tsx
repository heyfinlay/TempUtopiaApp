import { ArrowUpRight, Clock3, ClipboardMinus, UserCheck } from "lucide-react"

import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/marketing-ui/card"

const outcomes = [
  {
    title: "More booked calls",
    description: "More people actually make it to your calendar.",
    icon: ArrowUpRight,
  },
  {
    title: "Faster replies",
    description: "Leads get an answer within seconds, not hours.",
    icon: Clock3,
  },
  {
    title: "Fewer no-shows",
    description: "Reminders help people turn up.",
    icon: UserCheck,
  },
  {
    title: "Less admin work",
    description: "Your team stops chasing and copy-pasting.",
    icon: ClipboardMinus,
  },
]

export function OutcomesSection() {
  return (
    <section id="outcomes" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionIntro
            title="What this improves immediately"
            subtitle="This is designed to fix the most expensive part of your business: slow follow-up."
            eyebrow="Outcomes"
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((outcome, idx) => (
            <Reveal key={outcome.title} delay={idx * 0.04}>
              <Card className="border-slate-200/80 bg-white/90 shadow-[0_14px_34px_-25px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80 hover:shadow-[0_18px_42px_-22px_rgba(16,185,129,0.35)]">
                <CardHeader className="space-y-3">
                  <outcome.icon className="size-5 text-emerald-600" />
                  <CardTitle className="text-slate-900">{outcome.title} —</CardTitle>
                  <CardDescription className="text-slate-600">{outcome.description}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
