"use client";

import * as React from "react";
import {
  Bell,
  CheckCircle2,
  CircleDot,
  Clock,
  Download,
  ExternalLink,
  Filter,
  Gauge,
  Home,
  Inbox,
  LifeBuoy,
  PauseCircle,
  PlayCircle,
  Search,
  Settings,
  Sparkles,
  Target,
  Wand2,
  CalendarDays,
  FileText,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";

// Mock data
const MOCK_TASKS = [
  {
    id: "T-1042",
    when: "Today 09:12",
    title: "Find 10 new cosmetic clinics in Melbourne",
    source: "Google Maps",
    output: "+12 leads",
    status: "complete",
  },
  {
    id: "T-1041",
    when: "Yesterday 18:40",
    title: "Draft outreach messages (approval required)",
    source: "Templates",
    output: "12 queued",
    status: "needs_approval",
  },
  {
    id: "T-1040",
    when: "Yesterday 09:06",
    title: "Enrich leads with website + socials",
    source: "Web",
    output: "+18 enriched",
    status: "complete",
  },
  {
    id: "T-1038",
    when: "Mon 09:11",
    title: "Search for “dentist + Invisalign” clinics",
    source: "Google",
    output: "+21 leads",
    status: "complete",
  },
  {
    id: "T-1032",
    when: "Sun 10:00",
    title: "Generate weekly report",
    source: "Internal",
    output: "1 PDF",
    status: "failed",
  },
] as const;

const MOCK_LEADS = [
  {
    id: "L-2001",
    company: "Vogue Aesthetics",
    meta: "Richmond • 14 staff",
    channel: "Instagram",
    fitScore: 91,
    reason: "Runs ads, high-end branding, strong reviews",
    originTask: "T-1042",
  },
  {
    id: "L-2002",
    company: "Northside Cosmetic Clinic",
    meta: "Brunswick • 9 staff",
    channel: "Website",
    fitScore: 74,
    reason: "Good services, weak follow-up funnel",
    originTask: "T-1042",
  },
  {
    id: "L-2003",
    company: "Glow Medispa",
    meta: "South Yarra • 6 staff",
    channel: "Facebook",
    fitScore: 88,
    reason: "High engagement, inconsistent booking system",
    originTask: "T-1038",
  },
] as const;

type TaskStatus = (typeof MOCK_TASKS)[number]["status"];

type NavKey =
  | "overview"
  | "tasks"
  | "leads"
  | "outreach"
  | "schedule"
  | "settings"
  | "support";

function StatusBadge({ status }: { status: TaskStatus }) {
  const map: Record<
    TaskStatus,
    { label: string; tone: "good" | "warn" | "bad"; icon: React.ReactNode }
  > = {
    complete: { label: "Complete", tone: "good", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
    needs_approval: { label: "Needs approval", tone: "warn", icon: <Inbox className="h-3.5 w-3.5" /> },
    failed: { label: "Failed", tone: "bad", icon: <CircleDot className="h-3.5 w-3.5" /> },
  };
  const s = map[status];
  return (
    <span className={`tag-pill ${s.tone}`}>
      {s.icon}
      {s.label}
    </span>
  );
}

function NavItem({
  active,
  label,
  icon,
  right,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  right?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`nav-link ${active ? "active" : ""}`}
      type="button"
    >
      <span className="nav-left">
        <span className="nav-ico">{icon}</span>
        <span className="nav-label">{label}</span>
      </span>
      {right ? <span className="nav-right">{right}</span> : null}
    </button>
  );
}

export default function ClientPortalDashboard() {
  const [activeNav, setActiveNav] = React.useState<NavKey>("overview");
  const [industry, setIndustry] = React.useState("Cosmetic clinics");
  const [location, setLocation] = React.useState("Melbourne, VIC");
  const [maxOutreach, setMaxOutreach] = React.useState("15");
  const [approvalRequired, setApprovalRequired] = React.useState(true);
  const [excludeKeywords, setExcludeKeywords] = React.useState(
    "bulk billing, student clinic, low-cost, franchise",
  );
  const [offerFocus, setOfferFocus] = React.useState(
    "We build AI-powered lead systems that turn DMs and enquiries into booked calls & more sales.",
  );
  const [agentRunning, setAgentRunning] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  const tasks = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return MOCK_TASKS;
    return MOCK_TASKS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.source.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const leads = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return MOCK_LEADS;
    return MOCK_LEADS.filter(
      (l) =>
        l.company.toLowerCase().includes(q) ||
        l.channel.toLowerCase().includes(q) ||
        l.originTask.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  return (
    <div className="portal-shell">
      <div className="portal-glow" />

      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <div className="logo" />
            <div>
              <h1>Temporary Utopia</h1>
              <span>Client Portal • Prototype</span>
            </div>
          </div>

          <div className="search">
            <Search className="h-4 w-4 text-white/70" />
            <input
              placeholder="Search tasks, leads, companies…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="kbd">⌘ K</span>
          </div>

          <div className="top-actions">
            <button
              className="pill"
              type="button"
              onClick={() => setAgentRunning((prev) => !prev)}
            >
              <span className={`dot ${agentRunning ? "good" : "bad"}`} />
              {agentRunning ? "Agent Running" : "Agent Paused"}
            </button>
            <button className="pill" type="button">
              <Bell className="h-4 w-4" />
              <span className="count">3</span>
            </button>
            <div className="avatar">FS</div>
          </div>
        </div>
      </header>

      <div className="wrap">
        <aside className="sidebar">
          <div className="side-head">
            <div className="side-title">
              <h2>Portal Navigation</h2>
              <span className="badge">Client View</span>
            </div>
            <div className="side-sub">
              <span className="chip">Proof of work</span>
              <span className="chip">Daily runs</span>
              <span className="chip">Safe settings</span>
            </div>
          </div>
          <nav className="nav">
            <NavItem
              active={activeNav === "overview"}
              label="Overview"
              icon={<Home className="h-4 w-4" />}
              onClick={() => setActiveNav("overview")}
            />
            <NavItem
              active={activeNav === "tasks"}
              label="Work Log (Tasks)"
              icon={<FileText className="h-4 w-4" />}
              right={<span className="count">28</span>}
              onClick={() => setActiveNav("tasks")}
            />
            <NavItem
              active={activeNav === "leads"}
              label="Leads"
              icon={<Target className="h-4 w-4" />}
              right={<span className="count">146</span>}
              onClick={() => setActiveNav("leads")}
            />
            <NavItem
              active={activeNav === "outreach"}
              label="Outreach"
              icon={<MessageSquare className="h-4 w-4" />}
              right={<span className="count">12</span>}
              onClick={() => setActiveNav("outreach")}
            />
            <NavItem
              active={activeNav === "schedule"}
              label="Schedule"
              icon={<CalendarDays className="h-4 w-4" />}
              onClick={() => setActiveNav("schedule")}
            />
            <NavItem
              active={activeNav === "settings"}
              label="Agent Settings"
              icon={<Settings className="h-4 w-4" />}
              onClick={() => setActiveNav("settings")}
            />
            <NavItem
              active={activeNav === "support"}
              label="Support"
              icon={<LifeBuoy className="h-4 w-4" />}
              onClick={() => setActiveNav("support")}
            />
          </nav>
        </aside>

        <main className="main">
          <section className="hero">
            <div className="hero-grid">
              <div className="h-title">
                <h3>Welcome back 👋</h3>
                <p>
                  This is your client portal — the place you check to see what the agent has done,
                  what it’s doing next, and what’s working.
                </p>
                <div className="cta-row">
                  <button className="btn primary">
                    <Sparkles className="h-4 w-4" /> Request a lead push now
                  </button>
                  <button className="btn">
                    <Target className="h-4 w-4" /> Add a target profile
                  </button>
                  <button className="btn danger">
                    <PauseCircle className="h-4 w-4" /> Pause outreach
                  </button>
                </div>
              </div>
              <div className="card" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="k">Agent status</div>
                <div className="v">{agentRunning ? "Running" : "Paused"}</div>
                <div className="s">
                  <span className={`tag-pill ${agentRunning ? "good" : "bad"}`}>
                    <i /> {agentRunning ? "Healthy" : "Paused"}
                  </span>
                  <span className="mono">
                    <Clock className="h-3 w-3" /> Last run: 09:12 AM
                  </span>
                </div>
                <div className="spark">
                  <i style={{ width: "62%" }} />
                </div>
              </div>
            </div>
            <div className="cards">
              <div className="card">
                <div className="k">Leads found (24h)</div>
                <div className="v">18</div>
                <div className="s">+6 vs yesterday</div>
                <div className="spark">
                  <i style={{ width: "68%" }} />
                </div>
              </div>
              <div className="card">
                <div className="k">Messages queued</div>
                <div className="v">12</div>
                <div className="s">Waiting approval</div>
                <div className="spark">
                  <i style={{ width: "42%" }} />
                </div>
              </div>
              <div className="card">
                <div className="k">Replies</div>
                <div className="v">4</div>
                <div className="s">2 positive signals</div>
                <div className="spark">
                  <i style={{ width: "36%" }} />
                </div>
              </div>
              <div className="card">
                <div className="k">Booked calls</div>
                <div className="v">1</div>
                <div className="s">This week</div>
                <div className="spark">
                  <i style={{ width: "18%" }} />
                </div>
              </div>
            </div>
          </section>

          {activeNav === "overview" && (
            <section className="grid">
              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h4>Work Log (last 7 days)</h4>
                    <p>Proof-of-work timeline. Click a task to see exactly what the agent did.</p>
                  </div>
                  <div className="right-actions">
                    <span className="tag-pill">All sources</span>
                    <span className="tag-pill">Last 7 days</span>
                    <button className="btn">View all</button>
                  </div>
                </div>
                <div className="panel-body">
                  <div className="table-shell">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="th">When</th>
                          <th className="th">Task</th>
                          <th className="th">Source</th>
                          <th className="th">Output</th>
                          <th className="th">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.slice(0, 5).map((t) => (
                          <tr key={t.id} className="row">
                            <td className="mono">{t.when}</td>
                            <td>{t.title}</td>
                            <td className="mono">{t.source}</td>
                            <td className="mono">{t.output}</td>
                            <td>
                              <StatusBadge status={t.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="note">
                    Design intention: tasks are the “source of truth”. Everything else (leads,
                    outreach, reports) is derived from task outputs.
                  </div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h4>Daily schedule</h4>
                    <p>What’s set to run automatically. Keep it simple — change only what matters.</p>
                  </div>
                  <div className="right-actions">
                    <button className="btn">Edit schedule</button>
                  </div>
                </div>
                <div className="panel-body">
                  <div style={{ display: "grid", gap: "10px" }}>
                    <div className="row" style={{ borderRadius: "18px" }}>
                      <div className="row-inner">
                        <div>
                          <div style={{ fontWeight: 700 }}>Morning lead sweep</div>
                          <div className="help">Runs daily at 9:00 AM • Finds 10–20 leads</div>
                        </div>
                        <span className="tag-pill good">
                          <i /> Active
                        </span>
                      </div>
                    </div>
                    <div className="row" style={{ borderRadius: "18px" }}>
                      <div className="row-inner">
                        <div>
                          <div style={{ fontWeight: 700 }}>Outreach drafting</div>
                          <div className="help">Runs daily at 6:30 PM • Requires approval</div>
                        </div>
                        <span className="tag-pill warn">
                          <i /> Approval
                        </span>
                      </div>
                    </div>
                    <div className="row" style={{ borderRadius: "18px" }}>
                      <div className="row-inner">
                        <div>
                          <div style={{ fontWeight: 700 }}>Weekly report</div>
                          <div className="help">Runs Friday at 5:00 PM • Summary + metrics</div>
                        </div>
                        <span className="tag-pill bad">
                          <i /> Needs fix
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ height: "12px" }} />

                  <div className="panel" style={{ boxShadow: "none", background: "rgba(255,255,255,0.02)" }}>
                    <div className="panel-head" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <div>
                        <h4>Agent Settings (safe)</h4>
                        <p>Client-configurable controls. Everything else stays locked.</p>
                      </div>
                    </div>
                    <div className="panel-body">
                      <div className="form">
                        <div className="row2">
                          <div className="field">
                            <div className="label">Target industry</div>
                            <select
                              className="select"
                              value={industry}
                              onChange={(e) => setIndustry(e.target.value)}
                            >
                              <option>Cosmetic clinics</option>
                              <option>Dental clinics</option>
                              <option>Real estate agencies</option>
                              <option>Trades & construction</option>
                            </select>
                          </div>
                          <div className="field">
                            <div className="label">Location</div>
                            <input
                              className="input"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row2">
                          <div className="field">
                            <div className="label">Max outreach per day</div>
                            <input
                              className="input"
                              value={maxOutreach}
                              onChange={(e) => setMaxOutreach(e.target.value)}
                            />
                          </div>
                          <div className="field">
                            <div className="label">Approval required</div>
                            <div className="select" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <span>{approvalRequired ? "Yes — review before sending" : "No — auto-send"}</span>
                              <button
                                className="btn"
                                type="button"
                                onClick={() => setApprovalRequired((v) => !v)}
                              >
                                Toggle
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="field">
                          <div className="label">Exclude keywords</div>
                          <input
                            className="input"
                            value={excludeKeywords}
                            onChange={(e) => setExcludeKeywords(e.target.value)}
                          />
                          <div className="help">Prevents low-fit leads from being added to your list.</div>
                        </div>
                        <div className="field">
                          <div className="label">Offer focus (what the agent should pitch)</div>
                          <textarea
                            className="textarea"
                            value={offerFocus}
                            onChange={(e) => setOfferFocus(e.target.value)}
                          />
                        </div>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                          <button className="btn primary">Save settings</button>
                          <button className="btn">
                            Preview targeting <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="note">
                        Design intention: this settings area should feel like “tuning a car” — not configuring a server.
                        Clients can change direction, but they can’t break the system.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeNav === "leads" && (
            <section className="panel">
              <div className="panel-head">
                <div>
                  <h4>Leads preview</h4>
                  <p>A quick look at the newest leads the agent added.</p>
                </div>
                <div className="right-actions">
                  <button className="btn">
                    <Download className="h-4 w-4" /> Export CSV
                  </button>
                  <button className="btn">View all leads</button>
                </div>
              </div>
              <div className="panel-body">
                <div className="table-shell">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="th">Company</th>
                        <th className="th">Channel</th>
                        <th className="th">Fit score</th>
                        <th className="th">Reason</th>
                        <th className="th">Origin task</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead.id} className="row">
                          <td>
                            <strong>{lead.company}</strong>
                            <div className="help">{lead.meta}</div>
                          </td>
                          <td className="mono">{lead.channel}</td>
                          <td>
                            <span className={`tag-pill ${lead.fitScore >= 85 ? "good" : lead.fitScore >= 70 ? "warn" : "bad"}`}>
                              <i /> {lead.fitScore}
                            </span>
                          </td>
                          <td className="help">{lead.reason}</td>
                          <td className="mono">{lead.originTask}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {activeNav === "tasks" && (
            <section className="panel">
              <div className="panel-head">
                <div>
                  <h4>Work Log</h4>
                  <p>All tasks executed by the agent.</p>
                </div>
              </div>
              <div className="panel-body">
                <div className="table-shell">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="th">When</th>
                        <th className="th">Task</th>
                        <th className="th">Source</th>
                        <th className="th">Output</th>
                        <th className="th">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((t) => (
                        <tr key={t.id} className="row">
                          <td className="mono">{t.when}</td>
                          <td>{t.title}</td>
                          <td className="mono">{t.source}</td>
                          <td className="mono">{t.output}</td>
                          <td>
                            <StatusBadge status={t.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {activeNav === "schedule" && (
            <section className="panel">
              <div className="panel-head">
                <div>
                  <h4>Daily schedule</h4>
                  <p>Loops and automated runs.</p>
                </div>
                <div className="right-actions">
                  <button className="btn">Edit schedule</button>
                </div>
              </div>
              <div className="panel-body">
                <div style={{ display: "grid", gap: "10px" }}>
                  <div className="row" style={{ borderRadius: "18px" }}>
                    <div className="row-inner">
                      <div>
                        <div style={{ fontWeight: 700 }}>Morning lead sweep</div>
                        <div className="help">Runs daily at 9:00 AM • Finds 10–20 leads</div>
                      </div>
                      <span className="tag-pill good">
                        <i /> Active
                      </span>
                    </div>
                  </div>
                  <div className="row" style={{ borderRadius: "18px" }}>
                    <div className="row-inner">
                      <div>
                        <div style={{ fontWeight: 700 }}>Outreach drafting</div>
                        <div className="help">Runs daily at 6:30 PM • Requires approval</div>
                      </div>
                      <span className="tag-pill warn">
                        <i /> Approval
                      </span>
                    </div>
                  </div>
                  <div className="row" style={{ borderRadius: "18px" }}>
                    <div className="row-inner">
                      <div>
                        <div style={{ fontWeight: 700 }}>Weekly report</div>
                        <div className="help">Runs Friday at 5:00 PM • Summary + metrics</div>
                      </div>
                      <span className="tag-pill bad">
                        <i /> Needs fix
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeNav === "settings" && (
            <section className="panel">
              <div className="panel-head">
                <div>
                  <h4>Agent Settings (safe)</h4>
                  <p>Client-configurable controls. Everything else stays locked.</p>
                </div>
              </div>
              <div className="panel-body">
                <div className="form">
                  <div className="row2">
                    <div className="field">
                      <div className="label">Target industry</div>
                      <select
                        className="select"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                      >
                        <option>Cosmetic clinics</option>
                        <option>Dental clinics</option>
                        <option>Real estate agencies</option>
                        <option>Trades & construction</option>
                      </select>
                    </div>
                    <div className="field">
                      <div className="label">Location</div>
                      <input
                        className="input"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row2">
                    <div className="field">
                      <div className="label">Max outreach per day</div>
                      <input
                        className="input"
                        value={maxOutreach}
                        onChange={(e) => setMaxOutreach(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <div className="label">Approval required</div>
                      <div className="select" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span>{approvalRequired ? "Yes — review before sending" : "No — auto-send"}</span>
                        <button
                          className="btn"
                          type="button"
                          onClick={() => setApprovalRequired((v) => !v)}
                        >
                          Toggle
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="label">Exclude keywords</div>
                    <input
                      className="input"
                      value={excludeKeywords}
                      onChange={(e) => setExcludeKeywords(e.target.value)}
                    />
                    <div className="help">Prevents low-fit leads from being added to your list.</div>
                  </div>
                  <div className="field">
                    <div className="label">Offer focus (what the agent should pitch)</div>
                    <textarea
                      className="textarea"
                      value={offerFocus}
                      onChange={(e) => setOfferFocus(e.target.value)}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button className="btn primary">Save settings</button>
                    <button className="btn">
                      Preview targeting <ExternalLink className="h-4 w-4" />
                    </button>
                    <button className="btn">
                      <Wand2 className="h-4 w-4" /> Improve targeting
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeNav === "outreach" && (
            <section className="panel">
              <div className="panel-head">
                <div>
                  <h4>Outreach</h4>
                  <p>Approval inbox for queued messages.</p>
                </div>
                <div className="right-actions">
                  <button className="btn">
                    <Inbox className="h-4 w-4" /> Review queued messages
                  </button>
                  <button className="btn">
                    <Filter className="h-4 w-4" /> Filters
                  </button>
                </div>
              </div>
              <div className="panel-body">
                <div className="note">Hook this to queued_outreach and render approval cards here.</div>
              </div>
            </section>
          )}

          {activeNav === "support" && (
            <section className="panel">
              <div className="panel-head">
                <div>
                  <h4>Support</h4>
                  <p>Fast help: report an issue, request a change, or book a call.</p>
                </div>
              </div>
              <div className="panel-body">
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button className="btn primary">
                    <LifeBuoy className="h-4 w-4" /> Report an issue
                  </button>
                  <button className="btn">
                    <CalendarDays className="h-4 w-4" /> Book a call
                  </button>
                </div>
              </div>
            </section>
          )}

          <div className="note">
            Prototype only. Replace mock arrays with Supabase queries and wire buttons to real actions.
          </div>
        </main>
      </div>
    </div>
  );
}
