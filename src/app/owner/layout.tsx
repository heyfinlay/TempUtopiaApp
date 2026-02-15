import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/owner", label: "Overview" },
  { href: "/owner/conversations", label: "Conversations" },
  { href: "/owner/meetings", label: "Meetings" },
  { href: "/owner/tasks", label: "Tasks" },
  { href: "/owner/integrations", label: "Integrations" },
];

export default function OwnerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center text-sm font-semibold">TU</div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Temporary Utopia</p>
              <p className="text-sm font-semibold text-slate-900">Owner Dashboard</p>
            </div>
          </div>
          <Link
            href="/login"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 hover:border-slate-300 hover:text-slate-800"
          >
            Sign in
          </Link>
        </div>
        <div className="border-t border-slate-200">
          <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-2 px-4 py-2 sm:px-6 lg:px-8">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full border border-transparent px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 transition-colors",
                  "hover:border-emerald-200 hover:text-emerald-700",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
