import { Sparkles } from "lucide-react"

import { Reveal } from "@/components/sections/Reveal"
import { LeadIntakeForm } from "@/components/sections/LeadIntakeForm"
import { InsightsSignup } from "@/components/sections/InsightsSignup"
import { Badge } from "@/components/marketing-ui/badge"
import { Button } from "@/components/marketing-ui/button"

type FinalCTASectionProps = {
  onPrimaryClick: () => void
}

export function FinalCTASection({ onPrimaryClick }: FinalCTASectionProps) {
  return (
    <section id="cta" className="m-section relative">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_88%_78%,rgba(14,165,233,0.1),transparent_34%)]" />
      </div>
      <div className="m-container relative">
        <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
          <Reveal className="space-y-5">
            <Badge variant="outline" className="border-[var(--m-border)] bg-emerald-50 text-[color:var(--m-accent)]">
              Book an Audit
            </Badge>
            <h2 className="m-h2 max-w-xl">
              Stop losing leads you already paid for.
            </h2>
            <p className="m-body m-muted max-w-xl">
              This step-by-step audit booking flow takes one minute and gives you a clear action plan for faster follow-up and more
              booked calls.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={onPrimaryClick}>Start the audit flow</Button>
            </div>
            <div className="space-y-2 text-[var(--m-text-sm)] text-[color:var(--m-text-muted)]">
              <p>1. Choose business type and goal</p>
              <p>2. Add contact details</p>
              <p>3. Pick your booking preference and submit</p>
            </div>
          </Reveal>

          <Reveal className="m-card space-y-4 p-4 md:p-6" delay={0.06}>
            <LeadIntakeForm />
            <div className="rounded-xl border border-[var(--m-border)] bg-white p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[var(--m-text-sm)] font-medium text-[color:var(--m-text)]">Want monthly playbooks?</span>
                <Sparkles className="size-4 text-emerald-600" />
              </div>
              <p className="mt-1 text-sm text-[color:var(--m-text-muted)]">One practical growth update each month.</p>
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
