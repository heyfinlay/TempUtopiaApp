"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { insightsSchema, type InsightsFormInput } from "@/lib/validators"

type Status = "idle" | "submitting" | "success" | "error"

const initialData: InsightsFormInput = {
  email: "",
  source: "website",
  honeypot: "",
}

export function InsightsSignup({ compact = false }: { compact?: boolean }) {
  const [data, setData] = useState<InsightsFormInput>(initialData)
  const [error, setError] = useState<string | undefined>()
  const [status, setStatus] = useState<Status>("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")
    setError(undefined)

    const parsed = insightsSchema.safeParse(data)
    if (!parsed.success) {
      setStatus("idle")
      const first = parsed.error.issues[0]
      setError(first?.message || "Please enter a valid email.")
      return
    }

    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        cache: "no-store",
      })
      const body = (await res.json()) as { ok: boolean; error?: string }
      if (!body.ok) throw new Error(body.error || "Could not subscribe")
      setStatus("success")
      setData(initialData)
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-3", compact && "space-y-2")}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="insights-email" className="sr-only">
            Email
          </label>
          <Input
            id="insights-email"
            type="email"
            placeholder="you@company.com"
            value={data.email}
            onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
            aria-invalid={Boolean(error)}
          />
          <Input
            id="insights-fax"
            name="company_fax"
            tabIndex={-1}
            autoComplete="off"
            value={data.honeypot}
            onChange={(e) => setData((prev) => ({ ...prev, honeypot: e.target.value }))}
            className="hidden"
          />
        </div>
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="sm:w-fit bg-emerald-600 text-white hover:bg-emerald-700"
        >
          {status === "submitting" ? "Sending..." : "Join"}
        </Button>
      </div>
      {status === "success" ? (
        <p className="text-sm text-emerald-300">You’re in. Watch for the next drop.</p>
      ) : null}
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </form>
  )
}
