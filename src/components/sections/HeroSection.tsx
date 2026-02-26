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
    <section id="hero" className="m-section relative overflow-hidden">
      <div className="m-container">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <Reveal className="space-y-8">
            <Badge variant="outline" className="border-[var(--m-border)] bg-[var(--m-surface-soft)] text-[color:var(--m-text-muted)]">
              Temporary Utopia
            </Badge>
            <div className="space-y-5">
              <h1 className="m-h1 max-w-2xl">Turn enquiries into booked calls — automatically.</h1>
              <p className="m-body m-muted max-w-xl">
                We install an AI follow-up system that replies instantly, qualifies leads, and books appointments while you run your business.
              </p>
              <p className="m-body text-[var(--m-text-muted)]">No contracts. No complicated software. Setup in days.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/login">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" onClick={onSecondaryClick}>
                See How It Works
              </Button>
              <Button variant="outline" size="lg" onClick={onPrimaryClick}>
                Book a Free Audit
              </Button>
            </div>
          </Reveal>

          <Reveal className="relative pb-6 lg:pb-10" delay={0.1}>
            <Card>
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="flex items-center gap-2 !text-[var(--m-text-body)]">
                  <MessageCircle className="size-4 text-[var(--m-accent)]" />
                  Lead message conversation
                </CardTitle>
                <CardDescription>New lead on website chat</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[var(--m-surface-soft)] px-3 py-2 text-[var(--m-text-sm)] text-[color:var(--m-text-muted)]">
                  Hi, can you help with this week?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[var(--m-success-bg)] px-3 py-2 text-[var(--m-text-sm)] text-[color:var(--m-text)]">
                  Yes. We can help. Want to book a quick call?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[var(--m-success-bg)] px-3 py-2 text-[var(--m-text-sm)] text-[color:var(--m-text)]">
                  Here are two times today.
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4 lg:-mt-6 lg:ml-10">
              <CardHeader className="space-y-1 pb-3">
                <CardTitle className="flex items-center gap-2 !text-[var(--m-text-body)]">
                  <CalendarCheck2 className="size-4 text-[var(--m-accent)]" />
                  Booking confirmation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-[var(--m-border)] bg-[var(--m-success-bg)] p-3 text-[var(--m-text-sm)] text-[color:var(--m-text)]">
                  Call booked for Tuesday at 10:30 AM
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4 lg:-mt-6 lg:mr-8">
              <CardHeader className="space-y-1 pb-3">
                <CardTitle className="flex items-center gap-2 !text-[var(--m-text-body)]">
                  <BarChart3 className="size-4 text-[var(--m-accent)]" />
                  Dashboard summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-[var(--m-text-sm)] text-[color:var(--m-text-muted)]">
                <div className="flex items-center justify-between rounded-lg border border-[var(--m-border)] px-3 py-2">
                  <span>New enquiries</span>
                  <span className="font-semibold text-[color:var(--m-text)]">18</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[var(--m-border)] px-3 py-2">
                  <span>Booked calls</span>
                  <span className="font-semibold text-[color:var(--m-text)]">9</span>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
