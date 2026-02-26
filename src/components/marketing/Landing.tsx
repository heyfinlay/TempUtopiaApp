"use client"

import { useEffect, type MouseEvent } from "react"
import { Sparkles } from "lucide-react"
import Link from "next/link"

import { AdminAutomationCalculator } from "@/components/sections/AdminAutomationCalculator"
import { DemoProofSection } from "@/components/sections/DemoProofSection"
import { FAQSection } from "@/components/sections/FAQSection"
import { FinalCTASection } from "@/components/sections/FinalCTASection"
import { ForWhoSection } from "@/components/sections/ForWhoSection"
import { HeroSection } from "@/components/sections/HeroSection"
import { focusLeadForm } from "@/components/sections/LeadIntakeForm"
import { PackagesSection } from "@/components/sections/PackagesSection"
import { SystemStepsCarousel } from "@/components/sections/SystemStepsCarousel"
import { Button } from "@/components/marketing-ui/button"

const navItems = [
  { label: "System", href: "#system-diagram" },
  { label: "Proof", href: "#demo-proof" },
  { label: "Calculator", href: "#roi" },
  { label: "Packages", href: "#packages" },
  { label: "FAQ", href: "#faq" },
]

export function Landing() {
  useEffect(() => {
    document.body.classList.add("marketing-body")
    return () => document.body.classList.remove("marketing-body")
  }, [])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  const handlePrimaryCta = () => {
    scrollTo("cta")
    focusLeadForm()
  }
  const handleSecondaryCta = () => scrollTo("system-diagram")

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return
    e.preventDefault()
    if (href === "#cta") return handlePrimaryCta()
    scrollTo(href.slice(1))
  }

  return (
    <div className="min-h-screen bg-marketing-bg text-marketing-text">
      <header className="sticky top-0 z-40 border-b border-marketing-border/80 bg-marketing-bg/95 backdrop-blur">
        <nav className="mk-container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium tracking-[0.08em] text-marketing-text">
            <Sparkles className="size-4 text-marketing-accent" />
            Temporary Utopia
          </div>
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="mk-small rounded-md text-marketing-muted transition-colors hover:text-marketing-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marketing-accent focus-visible:ring-offset-2"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        <HeroSection onPrimaryClick={handlePrimaryCta} onSecondaryClick={handleSecondaryCta} />
        <SystemStepsCarousel />
        <DemoProofSection />
        <AdminAutomationCalculator />
        <ForWhoSection />
        <PackagesSection onBookAudit={handlePrimaryCta} />
        <FAQSection />
        <FinalCTASection onPrimaryClick={handlePrimaryCta} />
      </main>

      <footer className="border-t border-marketing-border bg-marketing-surface py-8">
        <div className="mk-container flex flex-col justify-between gap-4 lg:flex-row">
          <div className="flex items-center gap-2 text-sm font-medium tracking-[0.08em] text-marketing-text">
            <Sparkles className="size-4 text-marketing-accent" />
            Temporary Utopia
          </div>
          <div className="flex flex-wrap gap-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="mk-small text-marketing-muted transition-colors hover:text-marketing-text"
              >
                {item.label}
              </a>
            ))}
            <a href="/login" className="mk-small text-marketing-muted transition-colors hover:text-marketing-text">
              Sign in
            </a>
          </div>
          <p className="mk-small mk-muted">Automated lead systems that turn enquiries into booked calls.</p>
        </div>
      </footer>
    </div>
  )
}
