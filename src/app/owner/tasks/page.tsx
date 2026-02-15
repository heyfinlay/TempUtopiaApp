export default function OwnerTasks() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">Tasks</p>
        <h1 className="text-3xl font-semibold text-slate-900">Agent actions</h1>
        <p className="mt-2 text-sm text-slate-600">What the assistant completed and what’s queued.</p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <ul className="space-y-3 text-sm text-slate-700">
          <li className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">Sent 12 follow‑ups (last 24h)</li>
          <li className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">Queued 4 reminders for tomorrow</li>
          <li className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">Prepared 3 lead summaries for review</li>
        </ul>
      </div>
    </div>
  );
}
