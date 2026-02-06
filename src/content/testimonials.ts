export type Testimonial = {
  name: string
  role: string
  company: string
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Priya Raman",
    role: "CMO",
    company: "Lumen Health",
    quote: "They ship like an embedded team. The landing + creative cadence became our new operating rhythm.",
  },
  {
    name: "Aaron Cho",
    role: "Head of Growth",
    company: "Volt Mobility",
    quote: "Clear narratives, crisp builds, and reporting we can actually act on. CAC went down while speed went up.",
  },
  {
    name: "Maya Ellis",
    role: "Founder",
    company: "Northbeam Labs",
    quote: "They translated technical depth into a story buyers believed. The experiment backlog keeps us honest.",
  },
]
