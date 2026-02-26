import { ChevronDown } from "lucide-react"

import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"
import { Card } from "@/components/marketing-ui/card"

const faqItems = [
  {
    question: "Does this replace my receptionist?",
    answer: "No — it removes missed leads and admin, and your team can step in when needed.",
  },
  {
    question: "What if the AI says the wrong thing?",
    answer: "It follows a controlled script + rules. We also monitor and improve it.",
  },
  {
    question: "Do I need new software?",
    answer: "Usually no. We connect to what you already use.",
  },
  {
    question: "How fast can we launch?",
    answer: "Most setups go live within days.",
  },
  {
    question: "Can it handle multiple languages?",
    answer: "Yes — the system can reply in the customer’s language.",
  },
  {
    question: "Do you lock me into contracts?",
    answer: "No long contracts. We win by results.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="m-section relative">
      <div className="m-container space-y-8">
        <Reveal>
          <SectionIntro title="Questions people usually ask" eyebrow="FAQ" />
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-2">
          {faqItems.map((item, idx) => (
            <Reveal key={item.question} delay={idx * 0.03}>
              <Card className="overflow-hidden p-0">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--m-accent)] focus-visible:ring-offset-2">
                    <h3 className="m-body font-medium text-[color:var(--m-text)]">{item.question}</h3>
                    <ChevronDown className="size-4 shrink-0 text-[color:var(--m-text-muted)] transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 text-[length:var(--m-text-sm)] leading-relaxed text-[color:var(--m-text-muted)]">{item.answer}</div>
                </details>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
