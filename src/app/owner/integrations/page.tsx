export default function OwnerIntegrations() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">Integrations</p>
        <h1 className="text-3xl font-semibold text-slate-900">Your current stack</h1>
        <p className="mt-2 text-sm text-slate-600">We plug into what you already use.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {["Website forms", "Instagram DMs", "Calendly / Calendar", "CRM / Sheets"].map((item) => (
          <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Connected</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{item}</p>
            <p className="mt-2 text-sm text-slate-600">We ingest messages and sync outcomes automatically.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
