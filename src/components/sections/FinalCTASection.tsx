import { Sparkles } from "lucide-react"

import { LeadIntakeForm } from "@/components/sections/LeadIntakeForm"
import { InsightsSignup } from "@/components/sections/InsightsSignup"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type FinalCTASectionProps = {
  onPrimaryClick: () => void
}

export function FinalCTASection({ onPrimaryClick }: FinalCTASectionProps) {
  return (
    <section id="cta" className="py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-lg shadow-slate-100 md:px-10">
          <div className="grid gap-8 md:grid-cols-[1.08fr_0.92fr] md:items-start">
            <div className="space-y-4">
              <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                Final step
              </Badge>
              <h2 className="text-3xl font-semibold text-slate-900">Stop losing leads you already paid for.</h2>
              <p className="text-lg text-slate-600">
                Book a free audit and we’ll show you exactly how many calls you could be missing each week.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={onPrimaryClick} className="bg-emerald-600 text-white shadow-sm hover:bg-emerald-700">
                  Book a Free Audit
                </Button>
              </div>
              <p className="text-sm text-slate-500">No pressure. Just clarity.</p>
            </div>

            <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-6">
              <LeadIntakeForm />
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-slate-900">Want monthly playbooks?</span>
                  <Sparkles className="size-4 text-emerald-600" />
                </div>
                <p className="text-sm text-slate-600">One tactical update per month.</p>
                <div className="mt-3">
                  <InsightsSignup compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

