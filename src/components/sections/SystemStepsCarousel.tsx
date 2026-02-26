"use client"

import { useCallback, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Badge } from "@/components/marketing-ui/badge"
import { Button } from "@/components/marketing-ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/marketing-ui/card"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/sections/Reveal"

const systemSteps = [
  {
    title: "A new enquiry comes in",
    description: "Someone messages you, fills out a form, or calls your business.",
  },
  {
    title: "They get an instant reply",
    description: "The system responds immediately, even if you’re busy or asleep.",
  },
  {
    title: "It asks the right questions",
    description: "It finds out what they need and whether they’re a good fit.",
  },
  {
    title: "It books them a time to talk",
    description: "If they’re serious, it schedules a call straight into your calendar.",
  },
  {
    title: "It reminds them so they show up",
    description: "Automatic reminders reduce no-shows and wasted time.",
  },
  {
    title: "You see everything in one place",
    description: "Every lead, message, and result is tracked in a simple dashboard.",
  },
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
    <section id="system-diagram" className="m-section relative">
      <div className="m-container space-y-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <p className="m-overline">System Steps</p>
            <h2 className="m-h2">Here’s the system we install.</h2>
            <p className="m-body m-muted max-w-2xl">
              Swipe through the exact 6-step process that turns a new enquiry into a booked call.
            </p>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
              onClick={() => scrollToIndex(activeStep - 1)}
              disabled={activeStep === 0}
              aria-label="Go to previous step"
            >
              <ChevronLeft />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
              onClick={() => scrollToIndex(activeStep + 1)}
              disabled={activeStep === totalSteps - 1}
              aria-label="Go to next step"
            >
              <ChevronRight />
            </Button>
          </div>
        </Reveal>

        <Reveal className="m-card p-4 sm:p-5 md:p-6" delay={0.05}>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                Lead → Booked Call
              </Badge>
              <p className="text-[var(--m-text-sm)] m-muted md:hidden">Swipe to explore</p>
            </div>
            <p className="text-[var(--m-text-sm)] font-medium text-[color:var(--m-text)]">
              Step {activeStep + 1} / {totalSteps}
            </p>
          </div>

          <div
            ref={scrollerRef}
            onScroll={updateActiveStep}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {systemSteps.map((step, index) => (
              <div
                key={step.title}
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
                className="min-w-0 shrink-0 basis-[88%] snap-start sm:basis-[72%] md:basis-[58%] lg:basis-[46%]"
              >
                <Card
                  className={cn(
                    "m-card h-full transition-all duration-300 hover:-translate-y-1",
                    activeStep === index && "border-emerald-300"
                  )}
                >
                  <CardHeader className="space-y-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "w-fit border-slate-200 bg-slate-50 text-slate-700",
                        activeStep === index && "border-emerald-200 bg-emerald-50 text-emerald-700"
                      )}
                    >
                      Step {index + 1}
                    </Badge>
                    <CardTitle className="m-h3">{step.title}</CardTitle>
                    <CardDescription className="m-body m-muted">{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-1.5 w-full rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500/70 transition-[width]"
                        style={{ width: `${((index + 1) / totalSteps) * 100}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {systemSteps.map((step, index) => (
              <button
                type="button"
                key={step.title}
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to step ${index + 1}`}
                aria-current={activeStep === index ? "true" : undefined}
                className={cn(
                  "size-2.5 rounded-full bg-slate-300 transition-all hover:bg-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  activeStep === index && "w-6 bg-emerald-600 hover:bg-emerald-600"
                )}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
