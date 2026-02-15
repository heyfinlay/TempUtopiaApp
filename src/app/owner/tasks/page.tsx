export default function OwnerTasks() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">Tasks</p>
        <h1 className="text-3xl font-semibold text-white">Agent actions</h1>
        <p className="mt-2 text-sm text-slate-300">What the assistant completed and what’s queued.</p>
      </header>

      <div className="glass-panel rounded-3xl p-6">
        <div className="space-y-3 text-sm text-slate-300">
          {[
            { title: "Sent 12 follow‑ups", meta: "Last 24h", status: "Done" },
            { title: "Queued 4 reminders", meta: "Goes out tomorrow", status: "Queued" },
            { title: "Prepared 3 lead summaries", meta: "Awaiting review", status: "Review" },
          ].map((item) => (
            <div key={item.title} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-white">{item.title}</p>
                <p className="text-xs text-slate-400">{item.meta}</p>
              </div>
              <span className="tag-pill inline-flex w-fit rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
