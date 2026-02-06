export type Service = {
  name: string
  summary: string
  outcomes: string[]
  tag?: string
}

export const services: Service[] = [
  {
    name: "Lead Capture System",
    summary: "Collect every lead from DMs, forms, messages, and email without manual work.",
    outcomes: ["Instagram + Facebook DM capture", "Website and email ingestion", "Centralized lead log with source tags"],
    tag: "Capture",
  },
  {
    name: "Follow-Up Automation",
    summary: "Human-feeling replies and sequences that keep leads warm and move them forward.",
    outcomes: ["Instant replies and qualification", "Timed reminders and nudges", "Re-engagement when people go quiet"],
    tag: "Follow Up",
  },
  {
    name: "Booking + Close",
    summary: "Guided booking flows with visibility so you know what’s converting.",
    outcomes: ["Calendar booking + confirmations", "Lead tracking and status updates", "Pipeline view you can share"],
    tag: "Book",
  },
]
