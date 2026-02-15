export default function OwnerConversations() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">Conversations</p>
        <h1 className="text-3xl font-semibold text-white">Inbound & outbound messages</h1>
        <p className="mt-2 text-sm text-slate-300">Every message the agent handled on your behalf.</p>
      </header>

      <div className="table-shell rounded-3xl p-6">
        <div className="space-y-4">
          {[
            { item: "Follow‑up sent to Jenna", detail: "Waiting on reply", status: "Open" },
            { item: "Inbound: Hannah asked about availability", detail: "Qualified", status: "Qualified" },
            { item: "Outbound: Reminder sent for consult tomorrow", detail: "Scheduled", status: "Queued" },
          ].map((row) => (
            <div key={row.item} className="table-row flex flex-col gap-2 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-white">{row.item}</p>
                <p className="text-xs text-slate-400">{row.detail}</p>
              </div>
              <span className="tag-pill inline-flex w-fit rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
