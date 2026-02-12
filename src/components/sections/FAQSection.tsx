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
    <section id="faq" className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <SectionIntro title="Questions people usually ask" eyebrow="FAQ" />
        <div className="grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <Card key={item.question} className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="space-y-2">
                <CardTitle className="text-slate-900">{item.question}</CardTitle>
                <CardDescription className="text-slate-600">{item.answer}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
