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
    <section id="hero" className="mk-section">
      <div className="mk-container">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <Reveal className="space-y-7">
            <Badge variant="outline" className="mk-eyebrow">
              Temporary Utopia
            </Badge>
            <div className="space-y-4">
              <h1 className="mk-h1 max-w-2xl">Turn enquiries into booked calls — automatically.</h1>
              <p className="mk-body mk-muted max-w-xl">
                We install an AI follow-up system that replies instantly, qualifies leads, and books appointments while you run your
                business.
              </p>
              <p className="mk-small mk-muted">No contracts. No complicated software. Setup in days.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/login">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" onClick={onSecondaryClick}>
                See How It Works
              </Button>
              <Button variant="ghost" size="lg" onClick={onPrimaryClick}>
                Book a Free Audit
              </Button>
            </div>
          </Reveal>

          <Reveal className="space-y-4" delay={0.1}>
            <Card>
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageCircle className="size-4 text-marketing-accent" />
                  Lead message conversation
                </CardTitle>
                <CardDescription>New lead on website chat</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-marketing-surface-soft px-3 py-2 text-sm text-marketing-text">
                  Hi, can you help with this week?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-marketing-accent-soft px-3 py-2 text-sm text-teal-950">
                  Yes. We can help. Want to book a quick call?
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1 pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CalendarCheck2 className="size-4 text-marketing-accent" />
                  Booking confirmation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-marketing-border bg-marketing-surface-soft p-3 text-sm text-marketing-text">
                  Call booked for Tuesday at 10:30 AM
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1 pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="size-4 text-marketing-accent" />
                  Dashboard summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-marketing-muted">
                <div className="flex items-center justify-between rounded-lg border border-marketing-border px-3 py-2">
                  <span>New enquiries</span>
                  <span className="font-medium text-marketing-text">18</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-marketing-border px-3 py-2">
                  <span>Booked calls</span>
                  <span className="font-medium text-marketing-text">9</span>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
