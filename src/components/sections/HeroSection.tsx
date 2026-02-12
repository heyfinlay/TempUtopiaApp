import { BarChart3, CalendarCheck2, MessageCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type HeroSectionProps = {
  onPrimaryClick: () => void
  onSecondaryClick: () => void
}

export function HeroSection({ onPrimaryClick, onSecondaryClick }: HeroSectionProps) {
  return (
    <section id="hero" className="relative overflow-hidden py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(16,185,129,0.08),transparent_35%),radial-gradient(circle_at_80%_16%,rgba(15,23,42,0.06),transparent_34%)]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <Badge variant="outline" className="border-emerald-200 bg-white text-emerald-700">
              Temporary Utopia
            </Badge>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Turn enquiries into booked calls — automatically.
              </h1>
              <p className="max-w-2xl text-lg text-slate-600">
                We install an AI follow-up system that replies instantly, qualifies leads, and books appointments while you run your
                business.
              </p>
              <p className="text-sm text-slate-500">No contracts. No complicated software. Setup in days.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={onPrimaryClick} className="bg-emerald-600 text-white shadow-sm hover:bg-emerald-700">
                Book a Free Audit
              </Button>
              <Button variant="outline" className="border-slate-200 text-slate-900" onClick={onSecondaryClick}>
                See How It Works
              </Button>
            </div>
          </div>

          <div className="relative pb-6 lg:pb-10">
            <Card className="border-slate-200 bg-white shadow-sm">
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

            <Card className="mt-4 border-slate-200 bg-white shadow-sm lg:-mt-6 lg:ml-10">
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

            <Card className="mt-4 border-slate-200 bg-white shadow-sm lg:-mt-6 lg:mr-8">
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
          </div>
        </div>
      </div>
    </section>
  )
}

