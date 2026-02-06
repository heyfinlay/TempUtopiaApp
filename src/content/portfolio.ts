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
    sector: "Healthcare SaaS",
    headline: "Self-serve launch drove faster activation",
    metric: "+41% trial-to-paid",
    description: "Rebuilt landing with proof-led hero, objection handling, and in-product story.",
  },
  {
    client: "Volt Mobility",
    sector: "E-mobility",
    headline: "Reduced CAC while scaling spend",
    metric: "-27% blended CAC",
    description: "Channel mix shift, motion ads, and localized landing variants for top metros.",
  },
  {
    client: "Northbeam Labs",
    sector: "AI tooling",
    headline: "Positioned enterprise readiness",
    metric: "1.8x demo volume",
    description: "Narrative repositioning, trust wall, and calibrated outreach playbook.",
  },
]
