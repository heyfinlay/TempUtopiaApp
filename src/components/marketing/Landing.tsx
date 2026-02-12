"use client"

import type { MouseEvent } from "react"
import { Sparkles } from "lucide-react"
import Link from "next/link"

import { AuditTimelineSection } from "@/components/sections/AuditTimelineSection"
import { DeliverablesSection } from "@/components/sections/DeliverablesSection"
import { DemoProofSection } from "@/components/sections/DemoProofSection"
import { FAQSection } from "@/components/sections/FAQSection"
import { FinalCTASection } from "@/components/sections/FinalCTASection"
import { ForWhoSection } from "@/components/sections/ForWhoSection"
import { HeroSection } from "@/components/sections/HeroSection"
import { focusLeadForm } from "@/components/sections/LeadIntakeForm"
import { OutcomesSection } from "@/components/sections/OutcomesSection"
import { PackagesSection } from "@/components/sections/PackagesSection"
import { SystemStepsCarousel } from "@/components/sections/SystemStepsCarousel"
import { WhyUsSection } from "@/components/sections/WhyUsSection"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "System", href: "#system-diagram" },
  { label: "Outcomes", href: "#outcomes" },
  { label: "Proof", href: "#demo-proof" },
  { label: "Packages", href: "#packages" },
  { label: "FAQ", href: "#faq" },
]

export function Landing() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handlePrimaryCta = () => {
    scrollTo("cta")
    focusLeadForm()
  }

  const handleSecondaryCta = () => {
    scrollTo("system-diagram")
  }

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return

    e.preventDefault()
    if (href === "#cta") {
      handlePrimaryCta()
      return
    }

    scrollTo(href.slice(1))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-800">
            <Sparkles className="size-4 text-emerald-600" />
            Temporary Utopia
          </div>
          <div className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="transition-colors hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button asChild size="sm" variant="outline" className="hidden border-slate-200 text-slate-900 md:inline-flex">
              <Link href="#system-diagram" onClick={(e) => handleNavClick(e, "#system-diagram")}>
                See How It Works
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-emerald-600 text-white shadow-sm hover:bg-emerald-700">
              <Link
                href="#cta"
                onClick={(e) => {
                  e.preventDefault()
                  handlePrimaryCta()
                }}
              >
                Book a Free Audit
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        <HeroSection onPrimaryClick={handlePrimaryCta} onSecondaryClick={handleSecondaryCta} />
        <SystemStepsCarousel />
        <OutcomesSection />
        <DemoProofSection />
        <ForWhoSection />
        <DeliverablesSection />
        <WhyUsSection />
        <AuditTimelineSection />
        <PackagesSection onBookAudit={handlePrimaryCta} />
        <FAQSection />
        <FinalCTASection onPrimaryClick={handlePrimaryCta} />
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 text-slate-600">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 sm:px-6 lg:flex-row lg:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-800">
            <Sparkles className="size-4 text-emerald-600" />
            Temporary Utopia
          </div>
          <div className="flex gap-6 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="transition-colors hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
            <a href="#cta" onClick={(e) => handleNavClick(e, "#cta")} className="transition-colors hover:text-slate-900">
              Book Audit
            </a>
          </div>
          <p className="text-xs text-slate-500">Automated lead systems that turn enquiries into booked calls.</p>
        </div>
      </footer>
    </div>
  )
}
