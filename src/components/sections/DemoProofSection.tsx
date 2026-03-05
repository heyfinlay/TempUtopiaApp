import { ClipboardCheck, FileText, Inbox, LineChart, Rows3 } from "lucide-react"

import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/marketing-ui/card"

const proofCards = [
  {
    title: "Inbox Operator",
    description: "Daily briefing, action items, and drafted replies.",
    icon: Inbox,
    body: (
      <div className="space-y-2 text-sm">
        <div className="max-w-[86%] rounded-xl rounded-bl-sm bg-white px-3 py-2 text-slate-700">
          Inbox briefing — 8:30am
        </div>
        <div className="ml-auto max-w-[86%] rounded-xl rounded-br-sm bg-emerald-50 px-3 py-2 text-emerald-900">
          3 client replies · 2 proposals · 1 invoice issue
        </div>
      </div>
    ),
  },
  {
    title: "Proposal Drafting Operator",
    description: "First draft, scope summary, and pricing breakdown prepared.",
    icon: FileText,
    body: (
      <div className="space-y-2 text-sm text-slate-700">
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">Outline + scope pulled from previous work</div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-900">
          Draft ready — 18 mins
        </div>
      </div>
    ),
  },
  {
    title: "CRM Operator",
    description: "Pipeline stays clean without manual logging.",
    icon: Rows3,
    body: (
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700">
          <span>Opportunity updated</span>
          <span>Discovery → Proposal</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700">
          <span>Next action</span>
          <span>Follow-up scheduled</span>
        </div>
      </div>
    ),
  },
  {
    title: "Reporting Operator",
    description: "Client updates drafted to your reporting cadence.",
    icon: ClipboardCheck,
    body: (
      <div className="space-y-2 text-sm text-slate-700">
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">Weekly update drafted</div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-900">
          Delivered outcomes + next steps summarised
        </div>
      </div>
    ),
  },
  {
    title: "Monitoring Operator",
    description: "Flags scope creep and margin risks early.",
    icon: LineChart,
    body: (
      <div className="space-y-2 text-sm text-slate-700">
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">Scope creep risk detected</div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-900">
          Engagement over‑servicing flagged
        </div>
      </div>
    ),
  },
]

export function DemoProofSection() {
  return (
    <section id="operators" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionIntro
            title="AI operators that execute real work"
            subtitle="Each operator is installed inside your stack and configured for your workflows — not a generic bot."
            eyebrow="Operators"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {proofCards.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 0.04}>
              <Card className="border-slate-200/80 bg-white/90 shadow-[0_16px_36px_-24px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80 hover:shadow-[0_24px_50px_-24px_rgba(16,185,129,0.35)]">
                <CardHeader className="space-y-3">
                  <card.icon className="size-5 text-emerald-600" />
                  <CardTitle className="text-slate-900">{card.title}</CardTitle>
                  <CardDescription className="text-slate-600">{card.description}</CardDescription>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">{card.body}</div>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
