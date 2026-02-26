"use client"

import { useCallback, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Badge } from "@/components/marketing-ui/badge"
import { Button } from "@/components/marketing-ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/marketing-ui/card"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/sections/Reveal"

const systemSteps = [
  { title: "A new enquiry comes in", description: "Someone messages you, fills out a form, or calls your business." },
  { title: "They get an instant reply", description: "The system responds immediately, even if you’re busy or asleep." },
  { title: "It asks the right questions", description: "It finds out what they need and whether they’re a good fit." },
  { title: "It books them a time to talk", description: "If they’re serious, it schedules a call straight into your calendar." },
  { title: "It reminds them so they show up", description: "Automatic reminders reduce no-shows and wasted time." },
  { title: "You see everything in one place", description: "Every lead, message, and result is tracked in a simple dashboard." },
]

const totalSteps = systemSteps.length

export function SystemStepsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const [activeStep, setActiveStep] = useState(0)

  const updateActiveStep = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const currentLeft = scroller.scrollLeft
    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY
    cardRefs.current.forEach((card, index) => {
      if (!card) return
      const distance = Math.abs(card.offsetLeft - currentLeft)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })
    setActiveStep((prev) => (prev === closestIndex ? prev : closestIndex))
  }, [])

  const scrollToIndex = useCallback((index: number) => {
    const boundedIndex = Math.max(0, Math.min(index, totalSteps - 1))
    const card = cardRefs.current[boundedIndex]
    if (!card) return
    card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
    setActiveStep(boundedIndex)
  }, [])

  return (
    <section id="system-diagram" className="mk-section">
      <div className="mk-container space-y-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <p className="mk-eyebrow">System Steps</p>
            <h2 className="mk-h2">Here’s the system we install.</h2>
            <p className="mk-body mk-muted max-w-2xl">Swipe through the exact 6-step process that turns a new enquiry into a booked call.</p>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Button type="button" variant="outline" size="icon-sm" onClick={() => scrollToIndex(activeStep - 1)} disabled={activeStep === 0} aria-label="Go to previous step"><ChevronLeft /></Button>
            <Button type="button" variant="outline" size="icon-sm" onClick={() => scrollToIndex(activeStep + 1)} disabled={activeStep === totalSteps - 1} aria-label="Go to next step"><ChevronRight /></Button>
          </div>
        </Reveal>

        <Reveal className="mk-card p-4 sm:p-5 md:p-6" delay={0.05}>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="mk-small">Lead → Booked Call</Badge>
              <p className="mk-small mk-muted md:hidden">Swipe to explore</p>
            </div>
            <p className="mk-small text-marketing-text">Step {activeStep + 1} / {totalSteps}</p>
          </div>

          <div ref={scrollerRef} onScroll={updateActiveStep} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {systemSteps.map((step, index) => (
              <div key={step.title} ref={(node) => { cardRefs.current[index] = node }} className="min-w-0 shrink-0 basis-[88%] snap-start sm:basis-[72%] md:basis-[58%] lg:basis-[46%]">
                <Card className={cn("h-full", activeStep === index && "border-marketing-accent") }>
                  <CardHeader className="space-y-3">
                    <Badge variant="outline" className={cn("mk-small", activeStep === index && "border-marketing-accent text-marketing-accent")}>Step {index + 1}</Badge>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                    <CardDescription className="mk-body mk-muted text-base">{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-1.5 w-full rounded-full bg-marketing-border/60"><div className="h-full rounded-full bg-marketing-accent/70" style={{ width: `${((index + 1) / totalSteps) * 100}%` }} /></div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
