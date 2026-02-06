import { headers } from "next/headers"
import { NextResponse } from "next/server"

import { getSupabaseServerClient } from "@/lib/supabase"
import { insightsSchema } from "@/lib/validators"

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 12
const ipBuckets = new Map<string, number[]>()

function getIp(hdrs: Headers): string {
  const forwarded = hdrs.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown"
  return "unknown"
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW_MS
  const hits = ipBuckets.get(ip)?.filter((ts) => ts > windowStart) ?? []
  hits.push(now)
  ipBuckets.set(ip, hits)
  return hits.length > RATE_LIMIT_MAX
}

export async function POST(req: Request) {
  const hdrs = await headers()
  const ip = getIp(hdrs)
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Rate limit exceeded" }, { status: 429 })
  }

  const payload = await req.json().catch(() => null)
  if (!payload) {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  if (payload.company_fax || payload.honeypot) {
    return NextResponse.json({ ok: true })
  }

  const parsed = insightsSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 })
  }

  const { honeypot: _honeypot, ...data } = parsed.data
  void _honeypot

  const supabase = getSupabaseServerClient()
  const { error } = await supabase.from("insights_subscribers").upsert(data, { onConflict: "email" })

  if (error) {
    console.error("Supabase upsert error", error)
    return NextResponse.json({ ok: false, error: "Failed to save subscriber" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
