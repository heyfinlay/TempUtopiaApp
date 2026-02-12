"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { LeadFormInput } from "@/lib/validators"

type Step = 1 | 2 | 3 | 4 | 5
type Status = "idle" | "submitting" | "success" | "error"

type WizardValues = {
  businessType: string
  primaryGoal: string
  businessName: string
  contactName: string
  email: string
  phone: string
  bookingPreference: "share_times" | "redirect_calendar" | ""
  preferredTimes: string
  honeypot: string
}

const totalSteps = 5
const calendarUrl = "https://calendly.com"

const businessTypes = ["Cosmetic Clinic", "Dental", "Real Estate", "Trades", "Other"]
const primaryGoals = ["More leads", "More booked calls", "Less admin", "Better follow-up"]

const bookingOptions: Array<{ value: WizardValues["bookingPreference"]; title: string; description: string }> = [
  {
    value: "share_times",
    title: "Share times and call me",
    description: "Tell us your availability and we will coordinate the best slot.",
  },
  {
    value: "redirect_calendar",
    title: "Take me to the calendar",
    description: "After submit, you can jump straight into available booking slots.",
  },
]

const goalToService: Record<string, string> = {
  "More leads": "Lead Capture System",
  "More booked calls": "Booking + Reminders",
  "Less admin": "Follow-Up Automation",
  "Better follow-up": "Follow-Up Automation",
}

const initialValues: WizardValues = {
  businessType: "",
  primaryGoal: "",
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  bookingPreference: "",
  preferredTimes: "",
  honeypot: "",
}

export function LeadIntakeForm() {
  const [values, setValues] = useState<WizardValues>(initialValues)
  const [step, setStep] = useState<Step>(1)
  const [status, setStatus] = useState<Status>("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<string>("")

  const progressPercent = useMemo(() => (step / totalSteps) * 100, [step])

  const setField = <K extends keyof WizardValues>(key: K, value: WizardValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: "" }))
  }

  const selectBookingPreference = (value: WizardValues["bookingPreference"]) => {
    setValues((prev) => ({
      ...prev,
      bookingPreference: value,
      preferredTimes: value === "redirect_calendar" ? "" : prev.preferredTimes,
    }))
    setErrors((prev) => ({ ...prev, bookingPreference: "", preferredTimes: "" }))
  }

  const nextStep = () => {
    if (!validateStep(step)) return
    setStep((prev) => Math.min(totalSteps, prev + 1) as Step)
  }

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1) as Step)
  }

  const validateStep = (currentStep: Step) => {
    const nextErrors: Record<string, string> = {}

    if (currentStep === 1 && !values.businessType) {
      nextErrors.businessType = "Please choose your business type."
    }

    if (currentStep === 2 && !values.primaryGoal) {
      nextErrors.primaryGoal = "Please choose your primary goal."
    }

    if (currentStep === 3) {
      if (values.businessName.trim().length < 2) {
        nextErrors.businessName = "Business name is required."
      }
      if (values.contactName.trim().length < 2) {
        nextErrors.contactName = "Contact name is required."
      }
      if (!z.string().email().safeParse(values.email).success) {
        nextErrors.email = "Enter a valid email address."
      }
      if (values.phone.trim() && values.phone.trim().length < 7) {
        nextErrors.phone = "Enter a valid phone number."
      }
    }

    if (currentStep === 4) {
      if (!values.bookingPreference) {
        nextErrors.bookingPreference = "Please pick a booking preference."
      }
      if (values.bookingPreference === "share_times" && values.preferredTimes.trim().length < 8) {
        nextErrors.preferredTimes = "Please share your preferred call times."
      }
    }

    setErrors((prev) => ({ ...prev, ...nextErrors }))
    return Object.keys(nextErrors).length === 0
  }

  const buildPayload = (): LeadFormInput => ({
    business_name: values.businessName.trim(),
    website_url: "",
    industry: values.businessType,
    employees_range: "Not provided",
    ad_spend_range: "Not provided",
    primary_goal: values.primaryGoal,
    services_interested: [goalToService[values.primaryGoal] ?? "Not sure (need audit)"],
    contact_name: values.contactName.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    preferred_contact: values.bookingPreference === "redirect_calendar" ? "Redirect to calendar" : "Call with shared times",
    notes:
      values.bookingPreference === "share_times" && values.preferredTimes.trim()
        ? `Preferred call times: ${values.preferredTimes.trim()}`
        : undefined,
    source: "audit_wizard",
    honeypot: values.honeypot,
  })

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      setStep(4)
      return
    }

    setStatus("submitting")
    setMessage("")

    try {
      const payload = buildPayload()
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      })

      let body: { ok?: boolean; error?: string } | null = null
      try {
        body = (await response.json()) as { ok?: boolean; error?: string }
      } catch {
        body = null
      }

      if (!response.ok || !body?.ok) {
        throw new Error(body?.error || "Unable to submit right now. Please try again.")
      }

      setStatus("success")
      setMessage("Thanks. Your audit request is in. We will reach out shortly.")

      if (values.bookingPreference === "redirect_calendar") {
        window.open(calendarUrl, "_blank", "noopener,noreferrer")
      }
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Unable to submit right now.")
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Book an Audit</p>
          <p className="text-sm font-medium text-slate-700">
            Step {step} of {totalSteps}
          </p>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-[width] duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {status === "success" ? (
        <div className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-medium text-emerald-800">{message}</p>
          {values.bookingPreference === "redirect_calendar" ? (
            <a
              href={calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex text-sm font-medium text-emerald-800 underline underline-offset-4"
            >
              Open calendar
            </a>
          ) : null}
        </div>
      ) : null}
      {status === "error" ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{message}</div>
      ) : null}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`step-${step}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <p className="text-base font-semibold text-slate-900">What type of business are you?</p>
                <p className="text-sm text-slate-600">Choose the closest option.</p>
              </div>
              <div className="grid gap-2">
                {businessTypes.map((type, idx) => {
                  const active = values.businessType === type
                  return (
                    <button
                      type="button"
                      key={type}
                      id={idx === 0 ? "business-type-0" : undefined}
                      onClick={() => setField("businessType", type)}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200",
                        active
                          ? "border-emerald-300 bg-emerald-50 text-emerald-900 shadow-[0_12px_24px_-18px_rgba(16,185,129,0.55)]"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      {type}
                    </button>
                  )
                })}
              </div>
              {errors.businessType ? <p className="text-sm text-red-600">{errors.businessType}</p> : null}
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <div>
                <p className="text-base font-semibold text-slate-900">What is your main goal right now?</p>
                <p className="text-sm text-slate-600">We will tailor the audit to this outcome.</p>
              </div>
              <div className="grid gap-2">
                {primaryGoals.map((goal) => {
                  const active = values.primaryGoal === goal
                  return (
                    <button
                      type="button"
                      key={goal}
                      onClick={() => setField("primaryGoal", goal)}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200",
                        active
                          ? "border-emerald-300 bg-emerald-50 text-emerald-900 shadow-[0_12px_24px_-18px_rgba(16,185,129,0.55)]"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      {goal}
                    </button>
                  )
                })}
              </div>
              {errors.primaryGoal ? <p className="text-sm text-red-600">{errors.primaryGoal}</p> : null}
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-4">
              <div>
                <p className="text-base font-semibold text-slate-900">Your contact details</p>
                <p className="text-sm text-slate-600">So we can send your audit plan.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wizard-business-name">Business name</Label>
                <Input
                  id="wizard-business-name"
                  value={values.businessName}
                  onChange={(e) => setField("businessName", e.target.value)}
                  placeholder="e.g. Midtown Dental"
                  aria-invalid={Boolean(errors.businessName)}
                />
                {errors.businessName ? <p className="text-sm text-red-600">{errors.businessName}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="wizard-contact-name">Name</Label>
                <Input
                  id="wizard-contact-name"
                  value={values.contactName}
                  onChange={(e) => setField("contactName", e.target.value)}
                  placeholder="Your full name"
                  aria-invalid={Boolean(errors.contactName)}
                />
                {errors.contactName ? <p className="text-sm text-red-600">{errors.contactName}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="wizard-email">Email</Label>
                <Input
                  id="wizard-email"
                  type="email"
                  value={values.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="you@company.com"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email ? <p className="text-sm text-red-600">{errors.email}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="wizard-phone">Phone</Label>
                <Input
                  id="wizard-phone"
                  type="tel"
                  value={values.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="+1 555 123 4567"
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone ? <p className="text-sm text-red-600">{errors.phone}</p> : null}
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="space-y-4">
              <div>
                <p className="text-base font-semibold text-slate-900">How would you like to book?</p>
                <p className="text-sm text-slate-600">Pick the easiest path for your schedule.</p>
              </div>
              <div className="grid gap-2">
                {bookingOptions.map((option) => {
                  const active = values.bookingPreference === option.value
                  return (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() => selectBookingPreference(option.value)}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-left transition-all duration-200",
                        active
                          ? "border-emerald-300 bg-emerald-50 text-emerald-900 shadow-[0_12px_24px_-18px_rgba(16,185,129,0.55)]"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      <p className="text-sm font-semibold">{option.title}</p>
                      <p className="text-xs text-slate-600">{option.description}</p>
                    </button>
                  )
                })}
              </div>
              {errors.bookingPreference ? <p className="text-sm text-red-600">{errors.bookingPreference}</p> : null}

              {values.bookingPreference === "share_times" ? (
                <div className="space-y-2">
                  <Label htmlFor="wizard-times">Preferred call times</Label>
                  <Textarea
                    id="wizard-times"
                    value={values.preferredTimes}
                    onChange={(e) => setField("preferredTimes", e.target.value)}
                    placeholder="e.g. Tue/Wed after 2pm, Fri morning"
                    aria-invalid={Boolean(errors.preferredTimes)}
                  />
                  {errors.preferredTimes ? <p className="text-sm text-red-600">{errors.preferredTimes}</p> : null}
                </div>
              ) : null}
            </div>
          ) : null}

          {step === 5 ? (
            <div className="space-y-4">
              <div>
                <p className="text-base font-semibold text-slate-900">Confirm your request</p>
                <p className="text-sm text-slate-600">Review your details, then submit.</p>
              </div>
              <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p>
                  <span className="font-semibold text-slate-900">Business type:</span> {values.businessType}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Primary goal:</span> {values.primaryGoal}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Business:</span> {values.businessName}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Name:</span> {values.contactName}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Email:</span> {values.email}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Phone:</span> {values.phone || "Not provided"}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Booking:</span>{" "}
                  {values.bookingPreference === "redirect_calendar" ? "Redirect to calendar" : "Share call times"}
                </p>
                {values.bookingPreference === "share_times" && values.preferredTimes ? (
                  <p>
                    <span className="font-semibold text-slate-900">Preferred times:</span> {values.preferredTimes}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="space-y-3">
            <Input
              id="wizard-honeypot"
              name="company_fax"
              autoComplete="off"
              tabIndex={-1}
              value={values.honeypot}
              onChange={(e) => setField("honeypot", e.target.value)}
              className="hidden"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1 || status === "submitting"}>
                Back
              </Button>
              {step < 5 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit} disabled={status === "submitting" || status === "success"}>
                  {status === "submitting" ? "Submitting..." : status === "success" ? "Submitted" : "Submit request"}
                </Button>
              )}
            </div>
            <p className="text-xs text-slate-500">Takes about 60 seconds. We reply within one business day.</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function focusLeadForm() {
  if (typeof document === "undefined") return
  const firstOption = document.getElementById("business-type-0")
  if (firstOption instanceof HTMLButtonElement) {
    firstOption.focus({ preventScroll: true })
    firstOption.scrollIntoView({ behavior: "smooth", block: "center" })
    return
  }
  document.getElementById("cta")?.scrollIntoView({ behavior: "smooth", block: "start" })
}
