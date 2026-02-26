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
    <section id="roi" className="m-section relative">
      <div className="m-container space-y-10">
        <Reveal>
          <SectionIntro
            eyebrow="Calculator"
            title="See the cost of manual admin"
            subtitle="A quick reality check on what slow follow-up and manual admin is costing you every month."
          />
        </Reveal>

        <div className="mx-auto grid max-w-5xl gap-6 xl:grid-cols-2">
          <Reveal>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <Calculator className="size-5 text-emerald-600" />
                <CardTitle>Plug in your numbers</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hoursPerWeek">Admin hours per week</Label>
                  <Input id="hoursPerWeek" type="number" min={0} value={hoursPerWeek} onChange={(event) => setHoursPerWeek(Number(event.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly value of your time (AUD)</Label>
                  <Input id="hourlyRate" type="number" min={0} value={hourlyRate} onChange={(event) => setHourlyRate(Number(event.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="missedLeads">Leads slipping each month</Label>
                  <Input id="missedLeads" type="number" min={0} value={missedLeads} onChange={(event) => setMissedLeads(Number(event.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avgDealValue">Average deal value (AUD)</Label>
                  <Input id="avgDealValue" type="number" min={0} value={avgDealValue} onChange={(event) => setAvgDealValue(Number(event.target.value))} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="closeRate">Close rate (%)</Label>
                  <Input id="closeRate" type="number" min={0} max={100} value={closeRate} onChange={(event) => setCloseRate(Number(event.target.value))} />
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.05}>
            <Card className="h-full border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-white">
              <CardHeader className="flex flex-row items-center gap-3">
                <TrendingUp className="size-5 text-emerald-600" />
                <CardTitle>Monthly opportunity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] p-4">
                  <p className="m-overline">Admin cost</p>
                  <p className="m-h3">{currency(adminCost)}</p>
                  <p className="text-[length:var(--m-text-sm)] text-[color:var(--m-text-muted)]">Time spent on manual admin every month.</p>
                </div>
                <div className="rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] p-4">
                  <p className="m-overline">Missed revenue</p>
                  <p className="m-h3">{currency(missedRevenue)}</p>
                  <p className="text-[length:var(--m-text-sm)] text-[color:var(--m-text-muted)]">Leads that disappear when follow-up is slow.</p>
                </div>
                <div className="rounded-xl border border-emerald-300/70 bg-emerald-600/10 p-4">
                  <p className="m-overline text-[color:var(--m-accent)]">Total upside</p>
                  <p className="m-h3">{currency(totalOpportunity)}</p>
                  <p className="text-[length:var(--m-text-sm)] text-[color:var(--m-accent)]">What automation can unlock every month.</p>
                </div>

                <div className="rounded-2xl border border-[var(--m-border)] bg-[var(--m-surface)] p-4">
                  <p className="m-overline">Get the full breakdown</p>
                  <p className="text-[length:var(--m-text-sm)] text-[color:var(--m-text-muted)]">Leave your details and we’ll send the personalised estimate + next steps.</p>
                  <div className="mt-4 grid gap-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full name</Label>
                        <Input id="fullName" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Jordan Lee" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business name</Label>
                        <Input id="businessName" value={businessName} onChange={(event) => setBusinessName(event.target.value)} placeholder="Studio Aesthetics" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calcEmail">Email</Label>
                      <Input id="calcEmail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@clinic.com" />
                    </div>
                    <Button className="w-full">Send me the estimate</Button>
                    <p className="text-[length:var(--m-text-sm)] text-[color:var(--m-text-muted)]">We’ll never spam. This just lets us send your personalised ROI breakdown.</p>
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
