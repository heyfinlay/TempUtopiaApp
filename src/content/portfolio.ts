export type PortfolioItem = {
  client: string
  sector: string
  headline: string
  metric: string
  description: string
}

export const portfolio: PortfolioItem[] = [
  {
    client: "Lumen Health",
    sector: "Healthcare services",
    headline: "DMs to bookings without a VA",
    metric: "+27% booked calls",
    description: "Captured Instagram DMs, added smart replies, and routed to calendar with reminders.",
  },
  {
    client: "Volt Mobility",
    sector: "Local service",
    headline: "Stopped losing weekend enquiries",
    metric: "<5 min response time",
    description: "Inbox + form capture with auto-replies and follow-up nudges to book a slot.",
  },
  {
    client: "Northbeam Labs",
    sector: "B2B product",
    headline: "More demos from inbound",
    metric: "1.5x demo volume",
    description: "Qualification + booking flows plus reactivation when prospects went quiet.",
  },
]
