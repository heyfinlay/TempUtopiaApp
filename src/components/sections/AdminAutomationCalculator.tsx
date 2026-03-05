"use client"

import { useMemo, useState } from "react"
import { Calculator, TrendingUp } from "lucide-react"

import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/marketing-ui/card"
import { Input } from "@/components/marketing-ui/input"
import { Label } from "@/components/marketing-ui/label"
import { Button } from "@/components/marketing-ui/button"

const currency = (value: number) =>
  value.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  })

export function AdminAutomationCalculator() {
  const [nonBillableHours, setNonBillableHours] = useState(10)
  const [billableRate, setBillableRate] = useState(220)
  const [proposalsPerMonth, setProposalsPerMonth] = useState(6)
  const [hoursPerProposal, setHoursPerProposal] = useState(3)
  const [fullName, setFullName] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [email, setEmail] = useState("")

  const { lostBillable, proposalTime, totalOpportunity } = useMemo(() => {
    const lostBillableMonthly = nonBillableHours * billableRate * 4.33
    const proposalHoursMonthly = proposalsPerMonth * hoursPerProposal
    const proposalValue = proposalHoursMonthly * billableRate

    return {
      lostBillable: lostBillableMonthly,
      proposalTime: proposalValue,
      totalOpportunity: lostBillableMonthly + proposalValue,
    }
  }, [nonBillableHours, billableRate, proposalsPerMonth, hoursPerProposal])

  return (
    <section id="roi" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionIntro
            eyebrow="Billable Capacity"
            title="See what admin is really costing"
            subtitle="A quick estimate of billable time lost to inbox, reporting, and proposal work each month."
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Card className="border-slate-200/80 bg-white/95 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.45)]">
              <CardHeader className="flex flex-row items-center gap-3">
                <Calculator className="size-5 text-emerald-600" />
                <CardTitle className="text-slate-900">Plug in your numbers</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nonBillableHours">Non‑billable hours per week</Label>
                  <Input
                    id="nonBillableHours"
                    type="number"
                    min={0}
                    value={nonBillableHours}
                    onChange={(event) => setNonBillableHours(Number(event.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billableRate">Billable rate (AUD)</Label>
                  <Input
                    id="billableRate"
                    type="number"
                    min={0}
                    value={billableRate}
                    onChange={(event) => setBillableRate(Number(event.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proposalsPerMonth">Proposals per month</Label>
                  <Input
                    id="proposalsPerMonth"
                    type="number"
                    min={0}
                    value={proposalsPerMonth}
                    onChange={(event) => setProposalsPerMonth(Number(event.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hoursPerProposal">Hours per proposal</Label>
                  <Input
                    id="hoursPerProposal"
                    type="number"
                    min={0}
                    value={hoursPerProposal}
                    onChange={(event) => setHoursPerProposal(Number(event.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.05}>
            <Card className="border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-white shadow-[0_26px_60px_-32px_rgba(16,185,129,0.5)]">
              <CardHeader className="flex flex-row items-center gap-3">
                <TrendingUp className="size-5 text-emerald-600" />
                <CardTitle className="text-slate-900">Monthly opportunity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-sm text-slate-700">
                <div className="rounded-xl border border-emerald-200/70 bg-white/90 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Billable time lost</p>
                  <p className="text-2xl font-semibold text-slate-900">{currency(lostBillable)}</p>
                  <p className="mt-1 text-sm text-slate-600">Time absorbed by admin instead of delivery.</p>
                </div>
                <div className="rounded-xl border border-emerald-200/70 bg-white/90 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Proposal overhead</p>
                  <p className="text-2xl font-semibold text-slate-900">{currency(proposalTime)}</p>
                  <p className="mt-1 text-sm text-slate-600">Hours spent drafting and formatting proposals.</p>
                </div>
                <div className="rounded-xl border border-emerald-300/70 bg-emerald-600/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Total upside</p>
                  <p className="text-2xl font-semibold text-emerald-900">{currency(totalOpportunity)}</p>
                  <p className="mt-1 text-sm text-emerald-700">What operators can return each month.</p>
                </div>

                <div className="rounded-2xl border border-emerald-200/70 bg-white/95 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Get a billable capacity estimate</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Leave your details and we’ll send a short estimate tailored to your firm.
                  </p>
                  <div className="mt-4 grid gap-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full name</Label>
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(event) => setFullName(event.target.value)}
                          placeholder="Jordan Lee"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business name</Label>
                        <Input
                          id="businessName"
                          value={businessName}
                          onChange={(event) => setBusinessName(event.target.value)}
                          placeholder="Cedar Consulting"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calcEmail">Email</Label>
                      <Input
                        id="calcEmail"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@firm.com"
                      />
                    </div>
                    <Button className="w-full">Send the estimate</Button>
                    <p className="text-xs text-slate-500">
                      We’ll only send the estimate and next steps — no spam.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
