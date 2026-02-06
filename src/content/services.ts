export type Service = {
  name: string
  summary: string
  outcomes: string[]
  tag?: string
}

export const services: Service[] = [
  {
    name: "Landing Systems",
    summary: "Composable hero, offer, proof, and objection modules tuned for paid traffic.",
    outcomes: [
      "Speed-to-ship: new variants in days, not weeks",
      "On-page storytelling aligned to top channels",
      "Structured experiment backlog with reporting",
    ],
    tag: "Build",
  },
  {
    name: "Creative Sprints",
    summary: "High-intent hooks, motion-first assets, and offer positioning mapped to funnel stages.",
    outcomes: [
      "Angle matrix with 6–10 active themes",
      "Platform-native ad sets with rapid refresh",
      "Performance design kit for your team",
    ],
    tag: "Scale",
  },
  {
    name: "Media & Measurement",
    summary: "Full-funnel media ops with clean data, pacing, and attribution sanity checks.",
    outcomes: [
      "Spend allocation by MER and LTV/CAC guardrails",
      "Pixel & conversion APIs hardened",
      "Weekly experiment reviews with clear next bets",
    ],
    tag: "Operate",
  },
]
