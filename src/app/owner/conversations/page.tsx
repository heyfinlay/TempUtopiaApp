export default function OwnerConversations() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">Conversations</p>
        <h1 className="text-3xl font-semibold text-slate-900">Inbound & outbound messages</h1>
        <p className="mt-2 text-sm text-slate-600">Every message the agent handled on your behalf.</p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="space-y-4">
          {[
            "Follow‑up sent to Jenna — waiting on reply",
            "Inbound: Hannah asked about availability — qualified",
            "Outbound: Reminder sent for consult tomorrow",
          ].map((item) => (
            <div key={item} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
