"use client";

import * as React from "react";
import {
  Bell,
  CheckCircle2,
  CircleDot,
  Clock,
  Download,
  ExternalLink,
  Home,
  Inbox,
  LifeBuoy,
  Search,
  Sparkles,
  Target,
  CalendarDays,
  FileText,
  LineChart,
  Plug,
} from "lucide-react";

// Mock data
 type TaskRow = {
  id: string;
  when: string;
  title: string;
  source: string;
  output: string;
  status: "complete" | "needs_approval" | "failed";
  proof_url?: string;
};

type LeadRow = {
  id: string;
  company: string;
  meta: string;
  channel: string;
  fitScore: number;
  reason: string;
  originTask: string;
};

const MOCK_TASKS: TaskRow[] = [
  {
    id: "T-2042",
    when: "Today 08:30",
    title: "Inbox briefing + action items",
    source: "Inbox Operator",
    output: "6 actions",
    status: "complete",
    proof_url: "",
  },
  {
    id: "T-2041",
    when: "Yesterday 17:10",
    title: "Draft proposal for Redwood Advisory",
    source: "Proposal Operator",
    output: "Draft ready",
    status: "needs_approval",
    proof_url: "",
  },
  {
    id: "T-2040",
    when: "Yesterday 09:06",
    title: "Update CRM opportunities",
    source: "CRM Operator",
    output: "+5 updates",
    status: "complete",
    proof_url: "",
  },
  {
    id: "T-2038",
    when: "Mon 09:11",
    title: "Draft weekly client report",
    source: "Reporting Operator",
    output: "1 draft",
    status: "complete",
    proof_url: "",
  },
  {
    id: "T-2032",
    when: "Sun 10:00",
    title: "Scope creep monitor",
    source: "Monitoring Operator",
    output: "1 alert",
    status: "failed",
    proof_url: "",
  },
];

const MOCK_LEADS: LeadRow[] = [
  {
    id: "E-3001",
    company: "Redwood Advisory",
    meta: "Retainer client",
    channel: "Email",
    fitScore: 91,
    reason: "Proposal approved — awaiting sign-off",
    originTask: "T-2041",
  },
  {
    id: "E-3002",
    company: "Northside Capital",
    meta: "Project engagement",
    channel: "CRM",
    fitScore: 74,
    reason: "Weekly reporting sent",
    originTask: "T-2038",
  },
  {
    id: "E-3003",
    company: "Harbour Strategy",
    meta: "Discovery",
    channel: "Calendar",
    fitScore: 88,
    reason: "Follow-up drafted",
    originTask: "T-2040",
  },
];

type TaskStatus = TaskRow["status"];

type NavKey = "overview" | "work" | "engagements" | "reports" | "integrations" | "support";

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
    <button onClick={onClick} className={`nav-link ${active ? "active" : ""}`} type="button">
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
  const [industry, setIndustry] = React.useState("Professional services");
  const [location, setLocation] = React.useState("Australia");
  const [approvalRequired, setApprovalRequired] = React.useState(true);
  const [excludeKeywords, setExcludeKeywords] = React.useState("low-fit, out-of-scope, low-value");
  const [offerFocus, setOfferFocus] = React.useState(
    "We install AI operators that protect billable time — inbox, proposals, CRM, reporting.",
  );
  const [agentRunning, setAgentRunning] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [metrics, setMetrics] = React.useState({
    hoursSaved: 7.5,
    proposalsDrafted: 12,
    reportsSent: 4,
    approvalsNeeded: 2,
  });
  const [tasksData, setTasksData] = React.useState(MOCK_TASKS);
  const [leadsData, setLeadsData] = React.useState(MOCK_LEADS);
  const [saving, setSaving] = React.useState(false);

  const tasks = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return tasksData;
    return tasksData.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.source || "").toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q),
    );
  }, [searchQuery, tasksData]);

  const engagements = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return leadsData;
    return leadsData.filter(
      (l) =>
        l.company.toLowerCase().includes(q) ||
        (l.channel || "").toLowerCase().includes(q) ||
        (l.originTask || "").toLowerCase().includes(q),
    );
  }, [searchQuery, leadsData]);

  React.useEffect(() => {
    type SummaryResponse = {
      empty?: boolean;
      metrics?: {
        leads24h?: number;
        queued24h?: number;
        replies24h?: number;
        booked24h?: number;
      };
      tasks?: Array<{
        id: string;
        created_at: string;
        title: string;
        source?: string | null;
        output?: string | null;
        status?: string | null;
        proof_url?: string | null;
      }>;
      leads?: Array<{
        id: string;
        company: string;
        channel?: string | null;
        fit_score?: number | null;
        reason?: string | null;
        origin_task_id?: string | null;
        created_at?: string | null;
      }>;
      settings?: {
        industry?: string | null;
        location?: string | null;
        approval_required?: boolean | null;
        exclude_keywords?: string | null;
        offer_focus?: string | null;
      } | null;
      agent?: { status?: string | null } | null;
    };

    const load = async () => {
      try {
        const res = await fetch("/api/owner/summary", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as SummaryResponse;
        if (data?.empty) return;
        if (data?.metrics) {
          setMetrics({
            hoursSaved: Math.max(0, (data.metrics.replies24h ?? 0) * 1.5),
            proposalsDrafted: data.metrics.leads24h ?? 0,
            reportsSent: data.metrics.booked24h ?? 0,
            approvalsNeeded: data.metrics.queued24h ?? 0,
          });
        }
        if (Array.isArray(data?.tasks) && data.tasks.length > 0) {
          setTasksData(
            data.tasks.map((t) => {
              const validStatuses = ["complete", "needs_approval", "failed"];
              const status = (validStatuses.includes(t.status ?? "") ? t.status : "complete") as TaskRow["status"];
              return {
                id: t.id,
                when: new Date(t.created_at).toLocaleString(),
                title: t.title,
                source: t.source ?? "",
                output: t.output ?? "",
                status,
                proof_url: t.proof_url ?? "",
              };
            }),
          );
        }
        if (Array.isArray(data?.leads) && data.leads.length > 0) {
          setLeadsData(
            data.leads.map((l) => ({
              id: l.id,
              company: l.company,
              meta: l.created_at ? new Date(l.created_at).toLocaleDateString() : "",
              channel: l.channel ?? "",
              fitScore: l.fit_score ?? 0,
              reason: l.reason ?? "",
              originTask: l.origin_task_id ?? "",
            })),
          );
        }
        if (data?.settings) {
          setIndustry(data.settings.industry ?? industry);
          setLocation(data.settings.location ?? location);
          setApprovalRequired(Boolean(data.settings.approval_required ?? approvalRequired));
          setExcludeKeywords(data.settings.exclude_keywords ?? excludeKeywords);
          setOfferFocus(data.settings.offer_focus ?? offerFocus);
        }
        if (data?.agent?.status) {
          setAgentRunning(data.agent.status !== "paused");
        }
      } catch {
        // keep mock fallback
      }
    };

    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveSettings = async () => {
    setSaving(true);
    try {
      await fetch("/api/owner/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry,
          location,
          approval_required: approvalRequired,
          exclude_keywords: excludeKeywords,
          offer_focus: offerFocus,
        }),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="portal-shell">
      <div className="portal-glow" />

      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <div className="logo" />
            <div>
              <h1>Temporary Utopia</h1>
              <span>Client Portal</span>
            </div>
          </div>

          <div className="search">
            <Search className="h-4 w-4 text-white/70" />
            <input
              placeholder="Search operators, work log, engagements…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="kbd">⌘ K</span>
          </div>

          <div className="top-actions">
            <button className="pill" type="button" onClick={() => setAgentRunning((prev) => !prev)}>
              <span className={`dot ${agentRunning ? "good" : "bad"}`} />
              {agentRunning ? "Operators Running" : "Operators Paused"}
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
              <span className="chip">Engagements</span>
              <span className="chip">Reports</span>
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
              active={activeNav === "work"}
              label="Work log"
              icon={<FileText className="h-4 w-4" />}
              right={<span className="count">28</span>}
              onClick={() => setActiveNav("work")}
            />
            <NavItem
              active={activeNav === "engagements"}
              label="Engagements"
              icon={<Target className="h-4 w-4" />}
              right={<span className="count">14</span>}
              onClick={() => setActiveNav("engagements")}
            />
            <NavItem
              active={activeNav === "reports"}
              label="Reports"
              icon={<LineChart className="h-4 w-4" />}
              onClick={() => setActiveNav("reports")}
            />
            <NavItem
              active={activeNav === "integrations"}
              label="Integrations"
              icon={<Plug className="h-4 w-4" />}
              onClick={() => setActiveNav("integrations")}
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
                <h3>Operator overview</h3>
                <p>
                  This is your operational view — what the operators have done, what’s waiting approval,
                  and where billable time is being protected.
                </p>
                <div className="cta-row">
                  <button className="btn primary">
                    <Sparkles className="h-4 w-4" /> Request operator upgrade
                  </button>
                  <button className="btn">
                    <FileText className="h-4 w-4" /> View work log
                  </button>
                  <button className="btn">
                    <LineChart className="h-4 w-4" /> View report
                  </button>
                </div>
              </div>
              <div className="card" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="k">Operator status</div>
                <div className="v">{agentRunning ? "Running" : "Paused"}</div>
                <div className="s">
                  <span className={`tag-pill ${agentRunning ? "good" : "bad"}`}>
                    <i /> {agentRunning ? "Healthy" : "Paused"}
                  </span>
                  <span className="mono">
                    <Clock className="h-3 w-3" /> Last run: 08:30 AM
                  </span>
                </div>
                <div className="spark">
                  <i style={{ width: "62%" }} />
                </div>
              </div>
            </div>
            <div className="cards">
              <div className="card">
                <div className="k">Billable time saved</div>
                <div className="v">{metrics.hoursSaved} hrs</div>
                <div className="s">Estimated weekly gain</div>
                <div className="spark">
                  <i style={{ width: "68%" }} />
                </div>
              </div>
              <div className="card">
                <div className="k">Proposals drafted</div>
                <div className="v">{metrics.proposalsDrafted}</div>
                <div className="s">This month</div>
                <div className="spark">
                  <i style={{ width: "52%" }} />
                </div>
              </div>
              <div className="card">
                <div className="k">Reports delivered</div>
                <div className="v">{metrics.reportsSent}</div>
                <div className="s">This month</div>
                <div className="spark">
                  <i style={{ width: "36%" }} />
                </div>
              </div>
              <div className="card">
                <div className="k">Approvals needed</div>
                <div className="v">{metrics.approvalsNeeded}</div>
                <div className="s">Awaiting review</div>
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
                    <h4>Work log (last 7 days)</h4>
                    <p>Proof-of-work timeline. Click a task to see exactly what ran.</p>
                  </div>
                  <div className="right-actions">
                    <span className="tag-pill">All operators</span>
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
                          <th className="th">Operator</th>
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
                            <td className="mono">
                              {t.output}
                              {t.proof_url ? (
                                <a
                                  href={t.proof_url}
                                  className="block text-xs text-cyan-300 underline"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  View proof
                                </a>
                              ) : null}
                            </td>
                            <td>
                              <StatusBadge status={t.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="note">
                    Keep this page tight: operators, work log, outcomes, and reporting. Everything else stays hidden.
                  </div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h4>Integrations health</h4>
                    <p>Connected systems with safe permissions.</p>
                  </div>
                  <div className="right-actions">
                    <button className="btn">Review access</button>
                  </div>
                </div>
                <div className="panel-body">
                  <div style={{ display: "grid", gap: "10px" }}>
                    <div className="row" style={{ borderRadius: "18px" }}>
                      <div className="row-inner">
                        <div>
                          <div style={{ fontWeight: 700 }}>Google Workspace</div>
                          <div className="help">Read access + drafts only</div>
                        </div>
                        <span className="tag-pill good">
                          <i /> Healthy
                        </span>
                      </div>
                    </div>
                    <div className="row" style={{ borderRadius: "18px" }}>
                      <div className="row-inner">
                        <div>
                          <div style={{ fontWeight: 700 }}>CRM</div>
                          <div className="help">Write access to opportunities</div>
                        </div>
                        <span className="tag-pill warn">
                          <i /> Needs review
                        </span>
                      </div>
                    </div>
                    <div className="row" style={{ borderRadius: "18px" }}>
                      <div className="row-inner">
                        <div>
                          <div style={{ fontWeight: 700 }}>Reporting folder</div>
                          <div className="help">Weekly exports + client updates</div>
                        </div>
                        <span className="tag-pill good">
                          <i /> Healthy
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ height: "12px" }} />

                  <div className="panel" style={{ boxShadow: "none", background: "rgba(255,255,255,0.02)" }}>
                    <div className="panel-head" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <div>
                        <h4>Operator settings (safe)</h4>
                        <p>Client-configurable controls. Everything else stays locked.</p>
                      </div>
                    </div>
                    <div className="panel-body">
                      <div className="form">
                        <div className="row2">
                          <div className="field">
                            <div className="label">Industry focus</div>
                            <select className="select" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                              <option>Professional services</option>
                              <option>Consulting & advisory</option>
                              <option>Agencies</option>
                              <option>Legal</option>
                            </select>
                          </div>
                          <div className="field">
                            <div className="label">Location</div>
                            <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} />
                          </div>
                        </div>
                        <div className="row2">
                          <div className="field">
                            <div className="label">Approval required</div>
                            <div className="select" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <span>{approvalRequired ? "Yes — review before sending" : "No — auto-send"}</span>
                              <button className="btn" type="button" onClick={() => setApprovalRequired((v) => !v)}>
                                Toggle
                              </button>
                            </div>
                          </div>
                          <div className="field">
                            <div className="label">Exclude keywords</div>
                            <input className="input" value={excludeKeywords} onChange={(e) => setExcludeKeywords(e.target.value)} />
                          </div>
                        </div>
                        <div className="field">
                          <div className="label">Operator focus</div>
                          <textarea className="textarea" value={offerFocus} onChange={(e) => setOfferFocus(e.target.value)} />
                        </div>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                          <button className="btn primary" onClick={saveSettings} disabled={saving}>
                            {saving ? "Saving..." : "Save settings"}
                          </button>
                          <button className="btn">
                            Review access <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="note">
                        You can adjust direction without breaking the system. Everything critical stays locked.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeNav === "engagements" && (
            <section className="panel">
              <div className="panel-head">
                <div>
                  <h4>Engagements</h4>
                  <p>A quick view of active client work and operator actions.</p>
                </div>
                <div className="right-actions">
                  <button className="btn">
                    <CalendarDays className="h-4 w-4" /> Book a review
                  </button>
                  <button className="btn">View all</button>
                </div>
              </div>
              <div className="panel-body">
                <div className="table-shell">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="th">Client</th>
                        <th className="th">Channel</th>
                        <th className="th">Health</th>
                        <th className="th">Status</th>
                        <th className="th">Origin task</th>
                      </tr>
                    </thead>
                    <tbody>
                      {engagements.map((lead) => (
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

          {activeNav === "work" && (
            <section className="panel">
              <div className="panel-head">
                <div>
                  <h4>Work log</h4>
                  <p>All operator runs and outputs.</p>
                </div>
              </div>
              <div className="panel-body">
                <div className="table-shell">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="th">When</th>
                        <th className="th">Task</th>
                        <th className="th">Operator</th>
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

          {activeNav === "reports" && (
            <section className="panel">
              <div className="panel-head">
                <div>
                  <h4>Reports</h4>
                  <p>Weekly summaries and monthly performance snapshots.</p>
                </div>
                <div className="right-actions">
                  <button className="btn">
                    <Download className="h-4 w-4" /> Download latest
                  </button>
                </div>
              </div>
              <div className="panel-body">
                <div style={{ display: "grid", gap: "10px" }}>
                  <div className="row" style={{ borderRadius: "18px" }}>
                    <div className="row-inner">
                      <div>
                        <div style={{ fontWeight: 700 }}>Weekly summary — 1 Mar</div>
                        <div className="help">Hours saved, proposals drafted, reports delivered</div>
                      </div>
                      <span className="tag-pill good">
                        <i /> Ready
                      </span>
                    </div>
                  </div>
                  <div className="row" style={{ borderRadius: "18px" }}>
                    <div className="row-inner">
                      <div>
                        <div style={{ fontWeight: 700 }}>Monthly performance — February</div>
                        <div className="help">Operator ROI + client outcomes</div>
                      </div>
                      <span className="tag-pill warn">
                        <i /> Drafting
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeNav === "integrations" && (
            <section className="panel">
              <div className="panel-head">
                <div>
                  <h4>Integrations</h4>
                  <p>Connected systems and permission scope.</p>
                </div>
              </div>
              <div className="panel-body">
                <div className="form">
                  <div className="field">
                    <div className="label">Connected stack</div>
                    <div className="help">Google Workspace · Slack · CRM · Calendar</div>
                  </div>
                  <div className="field">
                    <div className="label">Permissions</div>
                    <div className="help">Read + draft access only. No direct sending without approval.</div>
                  </div>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button className="btn">Review access</button>
                    <button className="btn">
                      Request new integration <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
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
            Portal focus: operators, work log, engagements, reports, and integrations. Keep everything else hidden.
          </div>
        </main>
      </div>
    </div>
  );
}
