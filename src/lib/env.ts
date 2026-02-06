import "server-only"

import { z } from "zod"

const serverEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
})

const parsed = serverEnvSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
})

if (!parsed.success) {
  console.error("❌ Invalid environment variables", parsed.error.flatten().fieldErrors)
  throw new Error("Invalid environment variables")
}

export const env = parsed.data

export type Env = typeof env
