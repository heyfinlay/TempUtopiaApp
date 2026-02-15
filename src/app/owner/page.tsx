import { CheckCircle2, MessageSquareText, Sparkles, CalendarCheck2 } from "lucide-react";

const metrics = [
  { label: "Inbound conversations", value: "18", icon: MessageSquareText },
  { label: "Outbound follow-ups", value: "12", icon: Sparkles },
  { label: "Booked meetings", value: "6", icon: CalendarCheck2 },
  { label: "Tasks completed", value: "24", icon: CheckCircle2 },
];

export default function OwnerOverview() {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">Today’s summary</p>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Your assistant handled the follow‑ups.</h1>
          <p className="text-base text-slate-600">
            Everything below is what the agent did for you today — conversations, bookings, and the next actions queued.
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Key outcome</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-900">6 new consults booked</p>
          <p className="mt-2 text-sm text-emerald-800/80">Average response time: 14 seconds</p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <metric.icon className="h-5 w-5 text-emerald-600" />
            <p className="mt-3 text-sm text-slate-500">{metric.label}</p>
            <p className="text-2xl font-semibold text-slate-900">{metric.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Recent conversations</h2>
          <div className="mt-4 space-y-3">
            {[
              { name: "Lila (Botox) — asked about availability", status: "Qualified" },
              { name: "Dr. Kim (Dermal filler) — requested price range", status: "Pending" },
              { name: "Nina (Facial) — booked consult", status: "Booked" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-700">{item.name}</p>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Next actions</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">Send consent forms to 3 leads</li>
            <li className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">Confirm calendar blocks for Friday</li>
            <li className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">Follow‑up message queued for 5pm</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
