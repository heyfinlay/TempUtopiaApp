import { Sparkles } from "lucide-react"

import { Reveal } from "@/components/sections/Reveal"
import { LeadIntakeForm } from "@/components/sections/LeadIntakeForm"
import { InsightsSignup } from "@/components/sections/InsightsSignup"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type FinalCTASectionProps = {
  onPrimaryClick: () => void
}

export function FinalCTASection({ onPrimaryClick }: FinalCTASectionProps) {
  return (
    <section id="cta" className="relative py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_88%_78%,rgba(14,165,233,0.1),transparent_34%)]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
          <Reveal className="space-y-5">
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
              Book an Audit
            </Badge>
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Stop losing leads you already paid for.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-slate-600">
              This step-by-step audit booking flow takes one minute and gives you a clear action plan for faster follow-up and more
              booked calls.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={onPrimaryClick}>Start the audit flow</Button>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <p>1. Choose business type and goal</p>
              <p>2. Add contact details</p>
              <p>3. Pick your booking preference and submit</p>
            </div>
          </Reveal>

          <Reveal className="space-y-4 rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_30px_60px_-38px_rgba(15,23,42,0.45)] backdrop-blur-sm md:p-6" delay={0.06}>
            <LeadIntakeForm />
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-slate-900">Want monthly playbooks?</span>
                <Sparkles className="size-4 text-emerald-600" />
              </div>
              <p className="mt-1 text-sm text-slate-600">One practical growth update each month.</p>
              <div className="mt-3">
                <InsightsSignup compact />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
