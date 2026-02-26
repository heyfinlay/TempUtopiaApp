import { Sparkles } from "lucide-react"

import { Reveal } from "@/components/sections/Reveal"
import { LeadIntakeForm } from "@/components/sections/LeadIntakeForm"
import { InsightsSignup } from "@/components/sections/InsightsSignup"
import { Badge } from "@/components/marketing-ui/badge"
import { Button } from "@/components/marketing-ui/button"

type FinalCTASectionProps = { onPrimaryClick: () => void }

export function FinalCTASection({ onPrimaryClick }: FinalCTASectionProps) {
  return (
    <section id="cta" className="mk-section">
      <div className="mk-container">
        <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
          <Reveal className="space-y-5">
            <Badge variant="outline" className="mk-eyebrow">Book an Audit</Badge>
            <h2 className="mk-h2 max-w-xl">Stop losing leads you already paid for.</h2>
            <p className="mk-body mk-muted max-w-xl">This step-by-step audit booking flow takes one minute and gives you a clear action plan for faster follow-up and more booked calls.</p>
            <div className="flex flex-wrap gap-3"><Button onClick={onPrimaryClick}>Start the audit flow</Button></div>
            <div className="mk-body mk-muted space-y-2 text-base"><p>1. Choose business type and goal</p><p>2. Add contact details</p><p>3. Pick your booking preference and submit</p></div>
          </Reveal>

          <Reveal className="mk-card space-y-4 p-4 md:p-6" delay={0.06}>
            <LeadIntakeForm />
            <div className="rounded-[var(--mk-radius-md)] border border-marketing-border bg-marketing-surface p-4">
              <div className="flex items-center justify-between gap-2"><span className="mk-body font-medium text-base text-marketing-text">Want monthly playbooks?</span><Sparkles className="size-4 text-marketing-accent" /></div>
              <p className="mk-small mk-muted mt-1">One practical growth update each month.</p>
              <div className="mt-3"><InsightsSignup compact /></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
