"use client"

import { useEffect, type MouseEvent } from "react"
import { Sparkles } from "lucide-react"
import Link from "next/link"

import { AuditTimelineSection } from "@/components/sections/AuditTimelineSection"
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
    return () => {
      document.body.classList.remove("marketing-body")
    }
  }, [])

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
    <div className="min-h-screen bg-[var(--m-bg)] text-[color:var(--m-text)]">
      <header className="sticky top-0 z-40 border-b border-[var(--m-border)] bg-white/90 backdrop-blur-md">
        <nav className="m-container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 text-[var(--m-text-sm)] font-semibold uppercase tracking-[0.14em] text-[color:var(--m-text)]">
            <Sparkles className="size-4 text-[var(--m-accent)]" />
            Temporary Utopia
          </div>
          <div className="hidden items-center gap-6 text-[var(--m-text-sm)] text-[color:var(--m-text-muted)] md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="rounded-[var(--m-radius-sm)] px-1 py-1 transition-colors hover:text-[color:var(--m-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--m-accent)] focus-visible:ring-offset-2"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button asChild size="sm" variant="outline" className="hidden md:inline-flex">
              <Link href="#system-diagram" onClick={(e) => handleNavClick(e, "#system-diagram")}>
                See How It Works
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex">
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
        <AuditTimelineSection />
        <FinalCTASection onPrimaryClick={handlePrimaryCta} />
      </main>

      <footer className="border-t border-[var(--m-border)] bg-white py-10 text-[color:var(--m-text-muted)]">
        <div className="m-container flex flex-col justify-between gap-4 lg:flex-row">
          <div className="flex items-center gap-2 text-[var(--m-text-sm)] font-semibold uppercase tracking-[0.16em] text-[color:var(--m-text)]">
            <Sparkles className="size-4 text-[var(--m-accent)]" />
            Temporary Utopia
          </div>
          <div className="flex gap-6 text-[var(--m-text-sm)]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="rounded-[var(--m-radius-sm)] px-1 py-1 transition-colors hover:text-[color:var(--m-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--m-accent)] focus-visible:ring-offset-2"
              >
                {item.label}
              </a>
            ))}
            <a href="/login" className="rounded-[var(--m-radius-sm)] px-1 py-1 transition-colors hover:text-[color:var(--m-text)]">
              Sign in
            </a>
            <a href="#cta" onClick={(e) => handleNavClick(e, "#cta")} className="rounded-[var(--m-radius-sm)] px-1 py-1 transition-colors hover:text-[color:var(--m-text)]">
              Book Audit
            </a>
          </div>
          <p className="text-[var(--m-text-sm)]">Automated lead systems that turn enquiries into booked calls.</p>
        </div>
      </footer>
    </div>
  )
}
