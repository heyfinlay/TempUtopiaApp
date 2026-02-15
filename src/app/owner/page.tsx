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
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">Today’s summary</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Your assistant handled the follow‑ups.</h1>
          <p className="text-base text-slate-300">
            Everything below is what the agent did for you today — conversations, bookings, and the next actions queued.
          </p>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Key outcome</p>
          <p className="mt-2 text-2xl font-semibold text-white">6 new consults booked</p>
          <p className="mt-2 text-sm text-slate-300">Average response time: 14 seconds</p>
          <div className="mt-4 h-1 w-full rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="glass-panel rounded-2xl p-4">
            <metric.icon className="h-5 w-5 text-cyan-300" />
            <p className="mt-3 text-sm text-slate-400">{metric.label}</p>
            <p className="text-2xl font-semibold text-white">{metric.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-semibold text-white">Recent conversations</h2>
          <div className="mt-4 space-y-3">
            {[
              { name: "Lila (Botox) — asked about availability", status: "Qualified" },
              { name: "Dr. Kim (Dermal filler) — requested price range", status: "Pending" },
              { name: "Nina (Facial) — booked consult", status: "Booked" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-sm text-slate-200">{item.name}</p>
                <span className="tag-pill rounded-full px-2 py-1 text-xs font-semibold">{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-semibold text-white">Next actions</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Send consent forms to 3 leads</li>
            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Confirm calendar blocks for Friday</li>
            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Follow‑up message queued for 5pm</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
