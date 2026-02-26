import { ChevronDown } from "lucide-react"

import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"

const faqItems = [
  { question: "Does this replace my receptionist?", answer: "No — it removes missed leads and admin, and your team can step in when needed." },
  { question: "What if the AI says the wrong thing?", answer: "It follows a controlled script + rules. We also monitor and improve it." },
  { question: "Do I need new software?", answer: "Usually no. We connect to what you already use." },
  { question: "How fast can we launch?", answer: "Most setups go live within days." },
  { question: "Can it handle multiple languages?", answer: "Yes — the system can reply in the customer’s language." },
  { question: "Do you lock me into contracts?", answer: "No long contracts. We win by results." },
]

export function FAQSection() {
  return (
    <section id="faq" className="mk-section">
      <div className="mk-container space-y-8">
        <Reveal><SectionIntro title="Questions people usually ask" eyebrow="FAQ" /></Reveal>
        <div className="space-y-3">
          {faqItems.map((item, idx) => (
            <Reveal key={item.question} delay={idx * 0.03}>
              <details className="mk-card group p-5">
                <summary className="mk-body flex cursor-pointer list-none items-center justify-between font-medium text-marketing-text">
                  {item.question}
                  <ChevronDown className="size-4 text-marketing-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="mk-body mk-muted mt-3 text-base">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
