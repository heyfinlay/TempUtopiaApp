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
    <section id="hero" className="relative overflow-hidden py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_32%,rgba(16,185,129,0.16),transparent_38%),radial-gradient(circle_at_82%_12%,rgba(14,116,144,0.11),transparent_36%),linear-gradient(to_bottom,rgba(255,255,255,0.84),rgba(255,255,255,0.58))]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <Reveal className="space-y-8">
            <Badge variant="outline" className="border-emerald-200 bg-white/90 text-emerald-700 backdrop-blur-sm">
              Temporary Utopia
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Turn enquiries into booked calls — automatically.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                We install an AI follow-up system that replies instantly, qualifies leads, and books appointments while you run your
                business.
              </p>
              <p className="text-sm font-medium text-slate-500">No contracts. No complicated software. Setup in days.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="h-11 px-5 text-base">
                <Link href="/login">Get Started</Link>
              </Button>
              <Button variant="outline" className="h-11 border-slate-200 px-5 text-base text-slate-900" onClick={onSecondaryClick}>
                See How It Works
              </Button>
              <Button variant="outline" className="h-11 border-slate-200 px-5 text-base text-slate-900" onClick={onPrimaryClick}>
                Book a Free Audit
              </Button>
            </div>
          </Reveal>

          <Reveal className="relative pb-6 lg:pb-10" delay={0.1}>
            <Card className="border-slate-200/80 bg-white/90 shadow-[0_20px_42px_-32px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80 hover:shadow-[0_26px_52px_-30px_rgba(16,185,129,0.38)]">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                  <MessageCircle className="size-4 text-emerald-600" />
                  Lead message conversation
                </CardTitle>
                <CardDescription className="text-slate-600">New lead on website chat</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-sm text-slate-700">
                  Hi, can you help with this week?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
                  Yes. We can help. Want to book a quick call?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
                  Here are two times today.
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4 border-slate-200/80 bg-white/90 shadow-[0_16px_32px_-24px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80 hover:shadow-[0_22px_45px_-25px_rgba(16,185,129,0.35)] lg:-mt-6 lg:ml-10">
              <CardHeader className="space-y-1 pb-3">
                <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                  <CalendarCheck2 className="size-4 text-emerald-600" />
                  Booking confirmation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
                  Call booked for Tuesday at 10:30 AM
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4 border-slate-200/80 bg-white/90 shadow-[0_16px_32px_-24px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80 hover:shadow-[0_22px_45px_-25px_rgba(16,185,129,0.35)] lg:-mt-6 lg:mr-8">
              <CardHeader className="space-y-1 pb-3">
                <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                  <BarChart3 className="size-4 text-emerald-600" />
                  Dashboard summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-700">
                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
                  <span>New enquiries</span>
                  <span className="font-semibold text-slate-900">18</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
                  <span>Booked calls</span>
                  <span className="font-semibold text-slate-900">9</span>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
