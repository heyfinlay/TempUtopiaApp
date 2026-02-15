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
  const [hoursPerWeek, setHoursPerWeek] = useState(12)
  const [hourlyRate, setHourlyRate] = useState(55)
  const [missedLeads, setMissedLeads] = useState(10)
  const [avgDealValue, setAvgDealValue] = useState(1800)
  const [closeRate, setCloseRate] = useState(20)
  const [fullName, setFullName] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [email, setEmail] = useState("")

  const { adminCost, missedRevenue, totalOpportunity } = useMemo(() => {
    const weeklyAdminCost = hoursPerWeek * hourlyRate
    const monthlyAdminCost = weeklyAdminCost * 4.33
    const revenueLeft = missedLeads * avgDealValue * (closeRate / 100)

    return {
      adminCost: monthlyAdminCost,
      missedRevenue: revenueLeft,
      totalOpportunity: monthlyAdminCost + revenueLeft,
    }
  }, [hoursPerWeek, hourlyRate, missedLeads, avgDealValue, closeRate])

  return (
    <section id="roi" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionIntro
            eyebrow="Calculator"
            title="See the cost of manual admin"
            subtitle="A quick reality check on what slow follow-up and manual admin is costing you every month."
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
                  <Label htmlFor="hoursPerWeek">Admin hours per week</Label>
                  <Input
                    id="hoursPerWeek"
                    type="number"
                    min={0}
                    value={hoursPerWeek}
                    onChange={(event) => setHoursPerWeek(Number(event.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly value of your time (AUD)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    min={0}
                    value={hourlyRate}
                    onChange={(event) => setHourlyRate(Number(event.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="missedLeads">Leads slipping each month</Label>
                  <Input
                    id="missedLeads"
                    type="number"
                    min={0}
                    value={missedLeads}
                    onChange={(event) => setMissedLeads(Number(event.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avgDealValue">Average deal value (AUD)</Label>
                  <Input
                    id="avgDealValue"
                    type="number"
                    min={0}
                    value={avgDealValue}
                    onChange={(event) => setAvgDealValue(Number(event.target.value))}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="closeRate">Close rate (%)</Label>
                  <Input
                    id="closeRate"
                    type="number"
                    min={0}
                    max={100}
                    value={closeRate}
                    onChange={(event) => setCloseRate(Number(event.target.value))}
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
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Admin cost</p>
                  <p className="text-2xl font-semibold text-slate-900">{currency(adminCost)}</p>
                  <p className="mt-1 text-sm text-slate-600">Time spent on manual admin every month.</p>
                </div>
                <div className="rounded-xl border border-emerald-200/70 bg-white/90 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Missed revenue</p>
                  <p className="text-2xl font-semibold text-slate-900">{currency(missedRevenue)}</p>
                  <p className="mt-1 text-sm text-slate-600">Leads that disappear when follow-up is slow.</p>
                </div>
                <div className="rounded-xl border border-emerald-300/70 bg-emerald-600/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Total upside</p>
                  <p className="text-2xl font-semibold text-emerald-900">{currency(totalOpportunity)}</p>
                  <p className="mt-1 text-sm text-emerald-700">What automation can unlock every month.</p>
                </div>

                <div className="rounded-2xl border border-emerald-200/70 bg-white/95 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Get the full breakdown</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Leave your details and we’ll send the personalised estimate + next steps.
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
                          placeholder="Studio Aesthetics"
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
                        placeholder="you@clinic.com"
                      />
                    </div>
                    <Button className="w-full">Send me the estimate</Button>
                    <p className="text-xs text-slate-500">
                      We’ll never spam. This just lets us send your personalised ROI breakdown.
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
