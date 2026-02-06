"use client"

import { useMemo, useState } from "react"
import { z } from "zod"

import { services } from "@/content/services"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { leadSchema, type LeadFormInput } from "@/lib/validators"

type FormState = {
  data: LeadFormInput
  errors: Partial<Record<keyof LeadFormInput, string>>
  step: 1 | 2
  status: "idle" | "submitting" | "success" | "error"
  message?: string
}

const employeesOptions = ["1-5", "6-15", "16-50", "51-200", "200+"]
const spendOptions = ["< $10k/mo", "$10k-25k/mo", "$25k-75k/mo", "$75k-150k/mo", "$150k+/mo"]

const initialData: LeadFormInput = {
  business_name: "",
  website_url: "",
  industry: "",
  employees_range: "",
  ad_spend_range: "",
  primary_goal: "",
  services_interested: [],
  contact_name: "",
  email: "",
  phone: "",
  preferred_contact: "",
  notes: "",
  source: "lead_intake",
  honeypot: "",
}

export function LeadIntakeForm() {
  const [state, setState] = useState<FormState>({
    data: initialData,
    errors: {},
    step: 1,
    status: "idle",
  })

  const servicesList = useMemo(() => services.map((s) => s.name), [])

  const updateField = <K extends keyof LeadFormInput>(key: K, value: LeadFormInput[K]) => {
    setState((prev) => ({ ...prev, data: { ...prev.data, [key]: value }, errors: { ...prev.errors, [key]: undefined } }))
  }

  const toggleService = (service: string) => {
    setState((prev) => {
      const exists = prev.data.services_interested.includes(service)
      const services_interested = exists
        ? prev.data.services_interested.filter((s) => s !== service)
        : [...prev.data.services_interested, service]
      return { ...prev, data: { ...prev.data, services_interested }, errors: { ...prev.errors, services_interested: undefined } }
    })
  }

  const nextStep = () => {
    const stepOneSchema = leadSchema.pick({
      business_name: true,
      employees_range: true,
      ad_spend_range: true,
      services_interested: true,
      website_url: true,
      industry: true,
      primary_goal: true,
      honeypot: true,
      source: true,
    })
    const parsed = stepOneSchema.safeParse(state.data)
    if (!parsed.success) {
      const errors = mapZodErrors(parsed.error)
      setState((prev) => ({ ...prev, errors }))
      return
    }
    setState((prev) => ({ ...prev, step: 2 }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState((prev) => ({ ...prev, status: "submitting", message: undefined }))
    const parsed = leadSchema.safeParse(state.data)
    if (!parsed.success) {
      const errors = mapZodErrors(parsed.error)
      setState((prev) => ({ ...prev, errors, status: "idle", step: prev.step }))
      return
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state.data),
        cache: "no-store",
      })

      const body = (await res.json()) as { ok: boolean; error?: string }
      if (!body.ok) throw new Error(body.error || "Submission failed")

      setState({
        data: { ...initialData, source: "lead_intake" },
        errors: {},
        step: 1,
        status: "success",
        message: "Thanks! We’ll review and send a calendar link shortly.",
      })
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: "error",
        message: error instanceof Error ? error.message : "Unable to submit right now.",
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span
            className={cn(
              "size-8 rounded-full border border-white/20 flex items-center justify-center",
              state.step === 1 ? "bg-white/10 text-white" : "bg-black/50 text-slate-300"
            )}
          >
            1
          </span>
          <span>Company</span>
          <div className="h-px w-12 bg-white/15" />
          <span
            className={cn(
              "size-8 rounded-full border border-white/20 flex items-center justify-center",
              state.step === 2 ? "bg-white/10 text-white" : "bg-black/50 text-slate-300"
            )}
          >
            2
          </span>
          <span>Contact</span>
        </div>
        {state.status === "success" ? (
          <span className="text-sm text-emerald-300">Submitted</span>
        ) : null}
      </div>

      {state.status === "success" ? (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-100 text-sm">
          {state.message}
        </div>
      ) : null}
      {state.status === "error" ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-100 text-sm">
          {state.message}
        </div>
      ) : null}

      {state.step === 1 ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="business_name">Business name *</Label>
            <Input
              id="business_name"
              value={state.data.business_name}
              onChange={(e) => updateField("business_name", e.target.value)}
              aria-invalid={Boolean(state.errors.business_name)}
              placeholder="e.g., Volt Mobility"
            />
            {state.errors.business_name ? (
              <p className="text-xs text-red-300">{state.errors.business_name}</p>
            ) : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employees_range">Team size *</Label>
              <div className="grid grid-cols-2 gap-2">
                {employeesOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => updateField("employees_range", option)}
                    className={cn(
                      "rounded-md border px-3 py-2 text-sm transition-colors",
                      state.data.employees_range === option
                        ? "border-sky-400/70 bg-sky-400/10 text-white"
                        : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {state.errors.employees_range ? (
                <p className="text-xs text-red-300">{state.errors.employees_range}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ad_spend_range">Current monthly ad spend *</Label>
              <div className="grid grid-cols-2 gap-2">
                {spendOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => updateField("ad_spend_range", option)}
                    className={cn(
                      "rounded-md border px-3 py-2 text-sm transition-colors",
                      state.data.ad_spend_range === option
                        ? "border-pink-400/70 bg-pink-400/10 text-white"
                        : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {state.errors.ad_spend_range ? (
                <p className="text-xs text-red-300">{state.errors.ad_spend_range}</p>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Services interested *</Label>
            <div className="flex flex-wrap gap-2">
              {servicesList.map((service) => {
                const active = state.data.services_interested.includes(service)
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition-colors",
                      active
                        ? "border-sky-400/70 bg-sky-400/15 text-white shadow-[0_0_24px_rgba(56,189,248,0.45)]"
                        : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20"
                    )}
                  >
                    {service}
                  </button>
                )
              })}
            </div>
            {state.errors.services_interested ? (
              <p className="text-xs text-red-300">{state.errors.services_interested}</p>
            ) : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="primary_goal">Primary goal</Label>
              <Input
                id="primary_goal"
                value={state.data.primary_goal}
                onChange={(e) => updateField("primary_goal", e.target.value)}
                placeholder="e.g., Lower CAC, scale spend, reposition"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={state.data.industry}
                onChange={(e) => updateField("industry", e.target.value)}
                placeholder="e.g., Consumer SaaS"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="button" onClick={nextStep} className="bg-gradient-to-r from-sky-400 to-pink-500 text-black">
              Next
            </Button>
          </div>
        </div>
      ) : null}

      {state.step === 2 ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact_name">Contact name *</Label>
              <Input
                id="contact_name"
                value={state.data.contact_name}
                onChange={(e) => updateField("contact_name", e.target.value)}
                aria-invalid={Boolean(state.errors.contact_name)}
                placeholder="Your name"
              />
              {state.errors.contact_name ? (
                <p className="text-xs text-red-300">{state.errors.contact_name}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work email *</Label>
              <Input
                id="email"
                type="email"
                value={state.data.email}
                onChange={(e) => updateField("email", e.target.value)}
                aria-invalid={Boolean(state.errors.email)}
                placeholder="you@company.com"
              />
              {state.errors.email ? <p className="text-xs text-red-300">{state.errors.email}</p> : null}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                value={state.data.phone ?? ""}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+1 555 123 4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferred_contact">Preferred contact</Label>
              <Input
                id="preferred_contact"
                value={state.data.preferred_contact ?? ""}
                onChange={(e) => updateField("preferred_contact", e.target.value)}
                placeholder="Email, Phone, Slack"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="website_url">Website</Label>
              <Input
                id="website_url"
                value={state.data.website_url ?? ""}
                onChange={(e) => updateField("website_url", e.target.value)}
                placeholder="https://"
              />
              {state.errors.website_url ? <p className="text-xs text-red-300">{state.errors.website_url}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="honeypot" className="sr-only">
                Company fax
              </Label>
              <Input
                id="honeypot"
                name="company_fax"
                autoComplete="off"
                tabIndex={-1}
                value={state.data.honeypot}
                onChange={(e) => updateField("honeypot", e.target.value)}
                className="hidden"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Anything else?</Label>
            <Textarea
              id="notes"
              value={state.data.notes ?? ""}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Context, timelines, stakeholders, tech stack"
            />
          </div>
          <div className="flex flex-wrap gap-3 justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setState((prev) => ({ ...prev, step: 1 }))}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={state.status === "submitting"}
              className="bg-gradient-to-r from-sky-400 to-pink-500 text-black shadow-lg shadow-pink-500/30"
            >
              {state.status === "submitting" ? "Submitting..." : "Submit application"}
            </Button>
          </div>
        </div>
      ) : null}
    </form>
  )
}

function mapZodErrors(error: z.ZodError<Record<string, unknown>>) {
  const errors: Partial<Record<keyof LeadFormInput, string>> = {}
  for (const issue of error.issues) {
    const path = issue.path[0]
    if (typeof path === "string") {
      errors[path as keyof LeadFormInput] = issue.message
    }
  }
  return errors
}
