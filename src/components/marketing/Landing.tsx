"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check, Sparkles } from "lucide-react"
import Link from "next/link"

import {
  heroContent,
  heroPlaybook,
  journeySteps,
  problems,
  approach,
  siteNav,
  trustContent,
  conversionBlock,
  journeyContent,
  problemContent,
  approachContent,
  servicesContent,
  portfolioContent,
  footerContent,
} from "@/content/site"
import { portfolio } from "@/content/portfolio"
import { services } from "@/content/services"
import { testimonials } from "@/content/testimonials"
import { Aurora } from "@/components/reactbits/Aurora"
import { LeadIntakeForm } from "@/components/sections/LeadIntakeForm"
import { InsightsSignup } from "@/components/sections/InsightsSignup"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const sectionSpacing = "py-20 md:py-24"

export function Landing() {
  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_20%_-10%,rgba(56,189,248,0.2),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(251,113,133,0.25),transparent_35%),linear-gradient(180deg,#05060a_0%,#090b12_40%,#070910_100%)] text-slate-50">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_35%,rgba(255,255,255,0.04)_70%)]" />
      <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/5 bg-black/60">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-sky-200">
            <Sparkles className="size-4 text-pink-300" />
            Temporary Utopia
          </div>
          <div className="hidden items-center gap-6 text-sm text-slate-200/80 md:flex">
            {siteNav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button asChild size="sm" variant="outline" className="hidden md:inline-flex border-white/20 text-white">
              <Link href="#conversion">Book Call</Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-to-r from-sky-400 to-pink-500 text-black shadow-lg shadow-pink-500/20">
              <Link href="#conversion">Apply</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="relative">
        <section id="hero" className={cn(sectionSpacing, "relative overflow-hidden")}>
          <Aurora />
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div className="space-y-6">
              <Badge variant="outline" className="border-sky-400/40 bg-white/5 text-sky-100">
                {heroContent.eyebrow}
              </Badge>
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
                >
                  {heroContent.title}
                </motion.h1>
                <p className="text-lg text-slate-300 max-w-2xl">{heroContent.subtitle}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-gradient-to-r from-sky-400 to-pink-500 text-black shadow-lg shadow-pink-500/30">
                  <Link href={heroContent.primaryCta.href}>{heroContent.primaryCta.label}</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10">
                  <Link href={heroContent.secondaryCta.href}>{heroContent.secondaryCta.label}</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {heroContent.stats.map((stat) => (
                  <Card key={stat.label} className="border-white/10 bg-white/5 shadow-none backdrop-blur">
                    <CardHeader className="px-5">
                      <CardTitle className="text-2xl font-semibold text-white">{stat.value}</CardTitle>
                      <CardDescription className="text-slate-300">{stat.label}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/3 to-sky-500/10 p-8 shadow-2xl shadow-pink-500/10"
              >
                <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                  <div className="size-10 rounded-full bg-gradient-to-r from-sky-400/70 to-pink-500/70" />
                  <div>
                    <p className="text-sm text-slate-300">{heroPlaybook.title}</p>
                    <p className="font-semibold text-white">{heroPlaybook.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-4 pt-6">
                  {approach.map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <div className="mt-1">
                        <div className="size-2.5 rounded-full bg-gradient-to-r from-sky-300 to-pink-400 shadow-[0_0_24px_rgba(56,189,248,0.65)]" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-slate-300">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="journey" className={sectionSpacing}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="outline" className="border-sky-400/40 bg-white/5 text-sky-100">
                  {journeyContent.eyebrow}
                </Badge>
                <h2 className="text-3xl font-semibold text-white">{journeyContent.title}</h2>
                <p className="text-slate-300 max-w-2xl">{journeyContent.subtitle}</p>
              </div>
              <Button variant="ghost" asChild className="hidden md:inline-flex text-slate-200">
                <Link href="#conversion" className="inline-flex items-center gap-2">
                  Book the build
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {journeySteps.map((step, idx) => (
                <Card key={step.title} className="border-white/10 bg-white/5 backdrop-blur shadow-none">
                  <CardHeader className="space-y-3">
                    <Badge className="w-fit bg-gradient-to-r from-sky-400 to-pink-500 text-black">
                      {String(idx + 1).padStart(2, "0")}
                    </Badge>
                    <CardTitle className="text-white">{step.title}</CardTitle>
                    <CardDescription className="text-slate-300">{step.body}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="problem" className={sectionSpacing}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div className="space-y-4">
              <Badge variant="outline" className="border-pink-400/40 bg-white/5 text-pink-100">
                {problemContent.eyebrow}
              </Badge>
              <h2 className="text-3xl font-semibold text-white">{problemContent.title}</h2>
              <p className="text-slate-300 max-w-2xl">{problemContent.subtitle}</p>
              <div className="space-y-3">
                {problems.map((problem) => (
                  <div key={problem} className="flex items-start gap-3">
                    <Check className="mt-1 size-5 text-sky-300" />
                    <p className="text-slate-200">{problem}</p>
                  </div>
                ))}
              </div>
            </div>
            <Card className="border-white/10 bg-gradient-to-br from-white/5 via-slate-900/40 to-sky-500/10 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">How we unblock it</CardTitle>
                <CardDescription className="text-slate-300">
                  A conversion-first operating model that connects story, creative, and media pacing.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {approach.map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="approach" className={sectionSpacing}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-3">
              <Badge variant="outline" className="border-sky-400/40 bg-white/5 text-sky-100">
                {approachContent.eyebrow}
              </Badge>
              <h2 className="text-3xl font-semibold text-white">{approachContent.title}</h2>
              <p className="text-slate-300 max-w-2xl">{approachContent.subtitle}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {approach.map((item) => (
                <Card key={item.title} className="border-white/10 bg-white/5 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-white">{item.title}</CardTitle>
                    <CardDescription className="text-slate-300">{item.detail}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className={sectionSpacing}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-3">
              <Badge variant="outline" className="border-pink-400/40 bg-white/5 text-pink-100">
                {servicesContent.eyebrow}
              </Badge>
              <h2 className="text-3xl font-semibold text-white">{servicesContent.title}</h2>
              <p className="text-slate-300 max-w-2xl">{servicesContent.subtitle}</p>
              </div>
              <Button variant="ghost" asChild className="hidden md:inline-flex text-slate-200">
                <Link href="#conversion" className="inline-flex items-center gap-2">
                  See fit
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <Card key={service.name} className="border-white/10 bg-white/5 backdrop-blur">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{service.name}</CardTitle>
                      {service.tag ? (
                        <Badge className="bg-gradient-to-r from-sky-400 to-pink-500 text-black">{service.tag}</Badge>
                      ) : null}
                    </div>
                    <CardDescription className="text-slate-300">{service.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {service.outcomes.map((outcome) => (
                      <div key={outcome} className="flex gap-2 text-sm text-slate-200">
                        <Check className="mt-0.5 size-4 text-sky-300" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className={sectionSpacing}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-3">
              <Badge variant="outline" className="border-sky-400/40 bg-white/5 text-sky-100">
                {portfolioContent.eyebrow}
              </Badge>
              <h2 className="text-3xl font-semibold text-white">{portfolioContent.title}</h2>
              <p className="text-slate-300 max-w-2xl">{portfolioContent.subtitle}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {portfolio.map((item) => (
                <Card key={item.client} className="border-white/10 bg-gradient-to-br from-white/5 via-slate-900/40 to-sky-500/10 backdrop-blur">
                  <CardHeader>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      {item.sector}
                    </p>
                    <CardTitle className="text-white">{item.client}</CardTitle>
                    <CardDescription className="text-slate-200">{item.headline}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-lg font-semibold text-sky-200">{item.metric}</p>
                    <p className="text-sm text-slate-300">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="trust" className={sectionSpacing}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-4">
                <Badge variant="outline" className="border-pink-400/40 bg-white/5 text-pink-100">
                  {trustContent.testimonialsEyebrow}
                </Badge>
                <h2 className="text-3xl font-semibold text-white">{trustContent.title}</h2>
                <p className="text-slate-300 max-w-xl">{trustContent.subtitle}</p>
                <div className="space-y-3">
                  {trustContent.process.map((item) => (
                    <div key={item} className="flex gap-3 text-slate-200">
                      <Check className="mt-1 size-5 text-pink-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {testimonials.map((item) => (
                  <Card key={item.name} className="border-white/10 bg-white/5 backdrop-blur">
                    <CardContent className="space-y-3 pt-6">
                      <p className="text-sm text-slate-200">“{item.quote}”</p>
                      <div className="text-xs uppercase tracking-[0.14em] text-slate-400">
                        {item.name} · {item.role} · {item.company}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="conversion" className={cn(sectionSpacing, "bg-white/5")}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
              <div className="space-y-3">
                <Badge variant="outline" className="border-sky-400/40 bg-black/60 text-sky-100">
                  Conversion
                </Badge>
                <h2 className="text-3xl font-semibold text-white">{conversionBlock.title}</h2>
                <p className="text-slate-300 max-w-2xl">{conversionBlock.subtitle}</p>
                <div className="rounded-2xl border border-white/10 bg-black/60 p-6 shadow-2xl shadow-sky-500/10">
                  <LeadIntakeForm />
                </div>
              </div>
              <div className="space-y-6">
                <Card className="border-white/10 bg-gradient-to-br from-white/5 via-slate-900/40 to-pink-500/10 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      Book a call
                      <Sparkles className="size-4 text-pink-300" />
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      {conversionBlock.calloutDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild className="bg-gradient-to-r from-sky-400 to-pink-500 text-black w-full shadow-lg shadow-pink-500/30">
                      <Link href="#conversion">Book a call</Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="border-white/10 bg-white/5 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-white">{conversionBlock.insightsTitle}</CardTitle>
                    <CardDescription className="text-slate-300">
                      {conversionBlock.insightsSubtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InsightsSignup />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-black/80 py-10 text-slate-400">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 sm:px-6 lg:flex-row lg:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-200">
              <Sparkles className="size-4 text-pink-300" />
              Temporary Utopia
            </div>
            <div className="flex gap-6 text-sm">
              {siteNav.map((item) => (
                <a key={item.href} href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
            <p className="text-xs text-slate-500">{footerContent.tagline}</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
