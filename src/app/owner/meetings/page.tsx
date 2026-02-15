export default function OwnerMeetings() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">Meetings</p>
        <h1 className="text-3xl font-semibold text-slate-900">Booked consults</h1>
        <p className="mt-2 text-sm text-slate-600">Upcoming and recently booked appointments.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: "Consult — Sarah", time: "Tue 10:30 AM", status: "Confirmed" },
          { title: "Consult — Mia", time: "Wed 2:00 PM", status: "Pending" },
          { title: "Consult — Ava", time: "Thu 11:00 AM", status: "Confirmed" },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">{item.time}</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{item.title}</p>
            <span className="mt-3 inline-flex rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
