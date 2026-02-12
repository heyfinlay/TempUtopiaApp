import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
    <section id="faq" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionIntro title="Questions people usually ask" eyebrow="FAQ" />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {faqItems.map((item, idx) => (
            <Reveal key={item.question} delay={idx * 0.03}>
              <Card className="border-slate-200/80 bg-white/90 shadow-[0_16px_36px_-26px_rgba(15,23,42,0.32)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-slate-900">{item.question}</CardTitle>
                  <CardDescription className="text-slate-600">{item.answer}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
