import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/marketing-ui/card"

const faqItems = [
  {
    question: "Do we need to change tools?",
    answer: "No. We integrate with what you already use — Google Workspace, Slack, CRMs, docs, and more.",
  },
  {
    question: "Is this secure?",
    answer: "Yes. Operators run with strict permissions and clear guardrails. We only access what’s approved.",
  },
  {
    question: "How long does installation take?",
    answer: "Most installs run 7–10 days depending on scope.",
  },
  {
    question: "Who approves client‑facing work?",
    answer: "You do. Operators can draft and prepare, but approvals stay with your team.",
  },
  {
    question: "What if our workflows are unique?",
    answer: "That’s the point — we configure operators to your engagement lifecycle and reporting cadence.",
  },
  {
    question: "Is there a long contract?",
    answer: "No. We focus on the install and earn ongoing work through performance.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionIntro title="Questions firms usually ask" eyebrow="FAQ" />
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
