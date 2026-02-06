"use client"

import type { MouseEvent } from "react"
import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"

import { faqs } from "@/content/faq"
import {
  finalCta,
  footerContent,
  heroContent,
  modules,
  problemSection,
  process,
  proofStrip,
  siteNav,
  whatYouGet,
  whoFor,
} from "@/content/site"
import { pricing } from "@/content/pricing"
import { LeadIntakeForm, focusLeadForm } from "@/components/sections/LeadIntakeForm"
import { InsightsSignup } from "@/components/sections/InsightsSignup"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const sectionSpacing = "py-20 md:py-24"
const accent = "text-emerald-700"
const accentBg = "bg-emerald-600 hover:bg-emerald-700"

export function Landing() {
  const handlePrimaryCta = (e?: MouseEvent) => {
    e?.preventDefault()
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth", block: "start" })
    focusLeadForm()
  }

  const handleSecondaryCta = (e?: MouseEvent) => {
    e?.preventDefault()
    document.getElementById("what-we-do")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleNavClick = (e: MouseEvent, href: string) => {
    if (href === "#cta") {
      handlePrimaryCta(e)
      return
    }
    if (href.startsWith("#")) {
      e.preventDefault()
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.14em] uppercase text-slate-800">
            <Sparkles className="size-4 text-emerald-600" />
            Temporary Utopia
          </div>
          <div className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            {siteNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="hover:text-slate-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button asChild size="sm" variant="outline" className="hidden md:inline-flex border-slate-200 text-slate-900">
              <Link href="#what-we-do">See What We Build</Link>
            </Button>
            <Button asChild size="sm" className={`${accentBg} text-white shadow-sm`}>
              <Link href="#cta" onClick={handlePrimaryCta}>
                Book a Free Audit
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        <section id="hero" className={cn(sectionSpacing, "relative overflow-hidden")}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.08),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(15,23,42,0.05),transparent_32%)]" />
          </div>
          <div className="relative mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <Badge variant="outline" className="border-emerald-200 bg-white text-emerald-700">
                {heroContent.eyebrow}
              </Badge>
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
                >
                  {heroContent.title}
                </motion.h1>
                <p className="text-lg text-slate-600 max-w-3xl">{heroContent.subtitle}</p>
                <p className="text-sm text-slate-500">{heroContent.trustLine}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={handlePrimaryCta} className={`${accentBg} text-white shadow-sm`}>
                  {heroContent.primaryCta.label}
                </Button>
                <Button variant="outline" className="border-slate-200 text-slate-900" onClick={handleSecondaryCta}>
                  {heroContent.secondaryCta.label}
                </Button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {proofStrip.map((item) => (
                <Card key={item} className="border-slate-200 bg-white shadow-sm">
                  <CardHeader className="py-4">
                    <CardTitle className="text-base font-semibold text-slate-900">{item}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className={sectionSpacing}>
          <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Proof"
              title="Outcomes we optimize for"
              subtitle="Lead capture, faster replies, and more booked calls with less admin."
            />
            <div className="grid gap-4 md:grid-cols-4">
              {proofStrip.map((item) => (
                <Card key={item} className="border-slate-200 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">{item}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="problem" className={sectionSpacing}>
          <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="The Problem" title={problemSection.title} subtitle="Why leads leak out of the funnel." />
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardContent className="space-y-3 pt-6">
                  {problemSection.bullets.map((bullet) => (
                    <div key={bullet} className="flex gap-2 text-sm text-slate-700">
                      <Check className="mt-0.5 size-4 text-emerald-600" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="border-emerald-200 bg-emerald-50 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-emerald-800">{problemSection.closing}</CardTitle>
                  <CardDescription className="text-sm text-emerald-700">What every system guarantees</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {problemSection.guarantees.map((item) => (
                    <div key={item} className="flex gap-2 text-sm text-emerald-800">
                      <Check className="mt-0.5 size-4" />
                      <span>{item}</span>
                    </div>
                  ))}
                  <div className="mt-3 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-medium text-emerald-800">
                    {problemSection.miniFlow}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="what-we-do" className={sectionSpacing}>
          <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="What we do"
              title="A complete lead system — installed in under 7 days."
              subtitle="Capture, follow up, and book without adding headcount."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {modules.map((item) => (
                <Card key={item.title} className="border-slate-200 bg-white shadow-sm">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-slate-900">{item.title}</CardTitle>
                    <CardDescription className="text-slate-600">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {item.bullets.map((bullet) => (
                      <div key={bullet} className="flex gap-2 text-sm text-slate-700">
                        <Check className="mt-0.5 size-4 text-emerald-600" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className={sectionSpacing}>
          <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="How it works"
              title="Simple process. Fast delivery."
              subtitle="Three steps. Clear owners. Launch in days, not weeks."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {process.map((step, idx) => (
                <Card key={step.title} className="border-slate-200 bg-white shadow-sm">
                  <CardHeader className="space-y-3">
                    <Badge className="w-fit bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {String(idx + 1).padStart(2, "0")}
                    </Badge>
                    <CardTitle className="text-slate-900">{step.title}</CardTitle>
                    <CardDescription className="text-slate-600">{step.detail}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="what-you-get" className={sectionSpacing}>
          <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="What you get" title={whatYouGet.title} subtitle={whatYouGet.intro} />
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="grid gap-3 pt-6 md:grid-cols-2">
                {whatYouGet.bullets.map((item) => (
                  <div key={item} className="flex gap-2 text-sm text-slate-700">
                    <Check className="mt-0.5 size-4 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="who-for" className={sectionSpacing}>
          <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Who this is for" title={whoFor.title} subtitle="Clarity on fit before we start." />
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900">This is for you if</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {whoFor.for.map((item) => (
                    <div key={item} className="flex gap-2 text-sm text-slate-700">
                      <Check className="mt-0.5 size-4 text-emerald-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="border-slate-200 bg-slate-50 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900">This is not for you if</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {whoFor.notFor.map((item) => (
                    <div key={item} className="flex gap-2 text-sm text-slate-700">
                      <Check className="mt-0.5 size-4 text-emerald-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className={sectionSpacing}>
          <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Pricing" title="Choose a setup that matches where you’re at." subtitle="Clear tiers. Optional support." />
            <div className="grid gap-6 md:grid-cols-3">
              {pricing.map((tier) => (
                <Card key={tier.name} className="border-slate-200 bg-white shadow-sm">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-slate-900">{tier.name}</CardTitle>
                    <CardDescription className={`text-lg font-semibold ${accent}`}>{tier.setup}</CardDescription>
                    <CardDescription className="text-slate-600">{tier.description}</CardDescription>
                    <p className="text-sm font-medium text-slate-700">{tier.bestFor}</p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {tier.includes.map((item) => (
                      <div key={item} className="flex gap-2 text-sm text-slate-700">
                        <Check className="mt-0.5 size-4 text-emerald-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                    <div className="rounded-lg border border-slate-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                      Optional ongoing support: {tier.optional}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className={sectionSpacing}>
          <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="FAQ" title="Quick answers before we talk" subtitle="Plain language responses to the questions most teams ask." />
            <div className="grid gap-4 md:grid-cols-2">
              {faqs.map((item) => (
                <Card key={item.question} className="border-slate-200 bg-white shadow-sm">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-slate-900">{item.question}</CardTitle>
                    <CardDescription className="text-slate-600">{item.answer}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className={sectionSpacing}>
          <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-lg shadow-slate-100 md:px-10">
              <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
                <div className="space-y-4">
                  <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                    Next step
                  </Badge>
                  <h2 className="text-3xl font-semibold text-slate-900">{finalCta.title}</h2>
                  <p className="text-lg text-slate-600">{finalCta.subtitle}</p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild className={`${accentBg} text-white shadow-sm`}>
                      <Link href={finalCta.primaryCta.href}>{finalCta.primaryCta.label}</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-slate-200 text-slate-900">
                      <Link href={finalCta.secondaryCta.href}>{finalCta.secondaryCta.label}</Link>
                    </Button>
                  </div>
                  <div className="flex gap-2 text-sm text-slate-700">
                    <Check className="mt-0.5 size-4 text-emerald-600" />
                    <span>{finalCta.assurance}</span>
                  </div>
                </div>
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-6">
                  <div className="space-y-2 border-b border-slate-200 pb-3">
                    <p className="text-sm font-medium text-slate-900">Share context</p>
                    <p className="text-sm text-slate-600">
                      We reply in one business day with a quick fit check and suggested agenda.
                    </p>
                  </div>
                  <LeadIntakeForm />
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-slate-900">Want the monthly breakdown instead?</span>
                      <Sparkles className="size-4 text-emerald-600" />
                    </div>
                    <p className="text-sm text-slate-600">Join the Insights list. One email. No fluff.</p>
                    <div className="mt-3">
                      <InsightsSignup compact />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-200 bg-white py-8 text-slate-600">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 sm:px-6 lg:flex-row lg:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-800">
              <Sparkles className="size-4 text-emerald-600" />
              Temporary Utopia
            </div>
            <div className="flex gap-6 text-sm">
              {siteNav.map((item) => (
                <a key={item.href} href={item.href} className="hover:text-slate-900 transition-colors">
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

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
      <p className="text-slate-600 max-w-2xl">{subtitle}</p>
    </div>
  )
}
