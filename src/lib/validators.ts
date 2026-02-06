import { z } from "zod"

export const leadSchema = z.object({
  business_name: z.string().min(2, "Business name is required"),
  website_url: z.string().url().optional().or(z.literal("").transform(() => undefined)),
  industry: z.string().optional(),
  employees_range: z.string().min(1, "Choose a range"),
  ad_spend_range: z.string().min(1, "Choose a range"),
  primary_goal: z.string().optional(),
  services_interested: z.array(z.string()).min(1, "Select at least one service"),
  contact_name: z.string().min(2, "Contact name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  preferred_contact: z.string().optional(),
  notes: z.string().optional(),
  source: z.string().default("lead_intake"),
  honeypot: z.string().optional(),
})

export type LeadFormInput = z.infer<typeof leadSchema>

export const insightsSchema = z.object({
  email: z.string().email("Valid email required"),
  source: z.string().default("website"),
  honeypot: z.string().optional(),
})

export type InsightsFormInput = z.infer<typeof insightsSchema>
