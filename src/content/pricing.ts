export type PricingTier = {
  name: string
  setup: string
  description: string
  includes: string[]
  optional: string
  bestFor: string
}

export const pricing: PricingTier[] = [
  {
    name: "Starter",
    setup: "$1,500 setup",
    description: "For solo operators who want a clean lead capture system.",
    bestFor: "Best if you just need capture + booking working reliably.",
    includes: ["lead capture + auto replies", "booking flow setup", "basic follow-up automation", "7-day launch support"],
    optional: "$297/mo ongoing support",
  },
  {
    name: "Pro",
    setup: "$2,500 setup",
    description: "For businesses who want a real pipeline and smarter automation.",
    bestFor: "Best if you need qualification + pipeline visibility.",
    includes: ["everything in Starter", "qualification flow", "CRM logging", "follow-up sequences", "dashboard view"],
    optional: "$497/mo optimization + improvements",
  },
  {
    name: "Scale",
    setup: "$5,000 setup",
    description: "For teams ready to scale leads, bookings, and conversions.",
    bestFor: "Best if you need multi-channel + routing + reactivation.",
    includes: [
      "everything in Pro",
      "multi-channel follow-up",
      "reactivation sequences",
      "advanced routing + tagging",
      "priority support",
    ],
    optional: "$997/mo growth + automation expansion",
  },
]
