import { Check, Minus } from "lucide-react"

import { Reveal } from "@/components/sections/Reveal"
import { SectionIntro } from "@/components/sections/SectionIntro"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/marketing-ui/card"

const perfectFor = ["Clinics & health services", "Trades & local service businesses", "High-ticket service providers", "Agencies and consultants", "Real estate / finance / legal"]
const notIdealFor = ["Businesses with no enquiry volume", "People who want “more followers”", "One-product stores with no sales process"]

export function ForWhoSection() {
  return (
    <section id="for-who" className="mk-section">
      <div className="mk-container space-y-8">
        <Reveal>
          <SectionIntro title="This is built for businesses that sell with conversations." subtitle="If your business relies on enquiries turning into calls, this works extremely well." eyebrow="Who It’s For" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card>
              <CardHeader><CardTitle>Perfect for</CardTitle></CardHeader>
              <CardContent className="space-y-3">{perfectFor.map((item)=><div key={item} className="mk-body flex gap-2 text-base text-marketing-text"><Check className="mt-1 size-4 text-marketing-accent" /><span>{item}</span></div>)}</CardContent>
            </Card>
          </Reveal>
          <Reveal delay={0.06}>
            <Card className="bg-marketing-surface-soft">
              <CardHeader><CardTitle>Not ideal for</CardTitle></CardHeader>
              <CardContent className="space-y-3">{notIdealFor.map((item)=><div key={item} className="mk-body flex gap-2 text-base text-marketing-text"><Minus className="mt-1 size-4 text-marketing-muted" /><span>{item}</span></div>)}</CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
