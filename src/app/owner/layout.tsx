"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/owner", label: "Overview" },
  { href: "/owner/conversations", label: "Conversations" },
  { href: "/owner/meetings", label: "Meetings" },
  { href: "/owner/tasks", label: "Tasks" },
  { href: "/owner/integrations", label: "Integrations" },
];

export default function OwnerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="owner-shell min-h-screen text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-indigo-500/30 text-sm font-semibold text-cyan-200 shadow-lg">
              TU
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Temporary Utopia</p>
              <p className="text-sm font-semibold text-white">Owner Command Center</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200 sm:block">
              Live
            </div>
            <Link
              href="/login"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="glass-panel hidden w-60 flex-col gap-2 rounded-3xl p-4 lg:flex">
          <div className="mb-2">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Navigation</p>
          </div>
          <nav className="flex flex-col gap-2">
            {NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition",
                    "hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white",
                    isActive && "glass-outline text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-400">
            Next sync in <span className="text-cyan-200">12 min</span>
          </div>
        </aside>

        <div className="flex w-full flex-1 flex-col gap-6">
          <nav className="glass-panel flex gap-2 overflow-x-auto rounded-3xl p-3 lg:hidden">
            {NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-full border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300",
                    "hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white",
                    isActive && "glass-outline text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <main className="w-full space-y-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
