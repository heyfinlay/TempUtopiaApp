import { BarChart3, CalendarCheck2, MessageCircle } from "lucide-react"
import Link from "next/link"

import { Reveal } from "@/components/sections/Reveal"
import { Badge } from "@/components/marketing-ui/badge"
import { Button } from "@/components/marketing-ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/marketing-ui/card"

type HeroSectionProps = {
  onPrimaryClick: () => void
  onSecondaryClick: () => void
}

export function HeroSection({ onPrimaryClick, onSecondaryClick }: HeroSectionProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-white py-24 md:py-28">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal className="space-y-8">
            <Badge variant="outline" className="border-emerald-200 bg-white/90 text-emerald-700 backdrop-blur-sm">
              Temporary Utopia
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                We install AI operators inside consulting firms so founders protect billable time.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                Not a SaaS tool. Not a dashboard. We install operators that execute work inside your existing systems — inbox,
                proposals, CRM, reporting.
              </p>
              <p className="text-sm font-medium text-slate-500">Configured in 7–10 days. No migration required.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="h-11 px-5 text-base">
                <Link href="#cta" onClick={(e) => { e.preventDefault(); onPrimaryClick() }}>
                  Book Install Call
                </Link>
              </Button>
              <Button variant="outline" className="h-11 border-slate-200 px-5 text-base text-slate-900" onClick={onSecondaryClick}>
                See Operators
              </Button>
              <Button variant="outline" className="h-11 border-slate-200 px-5 text-base text-slate-900" asChild>
                <Link href="/login">Client sign in</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal className="relative pb-6 lg:pb-10" delay={0.1}>
            <Card className="border-slate-200/80 bg-white/90 shadow-[0_20px_42px_-32px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80 hover:shadow-[0_26px_52px_-30px_rgba(16,185,129,0.38)]">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                  <MessageCircle className="size-4 text-emerald-600" />
                  Inbox Operator
                </CardTitle>
                <CardDescription className="text-slate-600">Daily briefing + action items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-sm text-slate-700">
                  Inbox briefing — 8:30am
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
                  3 client replies needed · 2 proposal opportunities · 1 invoice issue
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
                  Suggested replies drafted below.
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4 border-slate-200/80 bg-white/90 shadow-[0_16px_32px_-24px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80 hover:shadow-[0_22px_45px_-25px_rgba(16,185,129,0.35)] lg:-mt-6 lg:ml-10">
              <CardHeader className="space-y-1 pb-3">
                <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                  <CalendarCheck2 className="size-4 text-emerald-600" />
                  Proposal Drafting Operator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
                  Draft proposal in 18 minutes · pricing breakdown attached
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4 border-slate-200/80 bg-white/90 shadow-[0_16px_32px_-24px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80 hover:shadow-[0_22px_45px_-25px_rgba(16,185,129,0.35)] lg:-mt-6 lg:mr-8">
              <CardHeader className="space-y-1 pb-3">
                <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                  <BarChart3 className="size-4 text-emerald-600" />
                  Operator Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-700">
                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
                  <span>Billable time protected</span>
                  <span className="font-semibold text-slate-900">+7.5 hrs/week</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
                  <span>Proposals drafted</span>
                  <span className="font-semibold text-slate-900">12</span>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
