export default function OwnerIntegrations() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">Integrations</p>
        <h1 className="text-3xl font-semibold text-white">Your current stack</h1>
        <p className="mt-2 text-sm text-slate-300">We plug into what you already use.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { name: "Website forms", status: "Connected" },
          { name: "Instagram DMs", status: "Connected" },
          { name: "Calendly / Calendar", status: "Live sync" },
          { name: "CRM / Sheets", status: "Synced" },
        ].map((item) => (
          <div key={item.name} className="glass-card rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.status}</p>
            <p className="mt-2 text-lg font-semibold text-white">{item.name}</p>
            <p className="mt-2 text-sm text-slate-300">We ingest messages and sync outcomes automatically.</p>
            <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cyan-200">
              Healthy
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
