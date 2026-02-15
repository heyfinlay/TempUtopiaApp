import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

const requireSecret = () => {
  const secret = process.env.AGENT_LOG_SECRET;
  if (!secret) return null;
  return secret;
};

export async function POST(request: Request) {
  const secret = requireSecret();
  if (secret) {
    const header = request.headers.get("x-agent-secret");
    if (header !== secret) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
  }

  const payload = (await request.json().catch(() => null)) as
    | {
        client_id: string;
        agent_id?: string | null;
        run?: {
          type: string;
          status?: string;
          summary?: string;
          output_count?: number;
          meta?: Record<string, unknown>;
          proof_url?: string | null;
        };
        tasks?: Array<{
          title: string;
          source?: string | null;
          output?: string | null;
          status?: string | null;
          proof_url?: string | null;
        }>;
        leads?: Array<{
          company: string;
          channel?: string | null;
          fit_score?: number | null;
          reason?: string | null;
        }>;
      }
    | null;

  if (!payload?.client_id) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  let runId: string | null = null;
  if (payload.run) {
    const { data: run, error } = await supabase
      .from("agent_runs")
      .insert({
        client_id: payload.client_id,
        agent_id: payload.agent_id ?? null,
        type: payload.run.type,
        status: payload.run.status ?? "complete",
        summary: payload.run.summary ?? null,
        output_count: payload.run.output_count ?? 0,
        meta: payload.run.meta ?? {},
        proof_url: payload.run.proof_url ?? null,
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    runId = run.id;
  }

  if (payload.tasks?.length) {
    const { error } = await supabase.from("agent_tasks").insert(
      payload.tasks.map((task) => ({
        client_id: payload.client_id,
        agent_id: payload.agent_id ?? null,
        run_id: runId,
        title: task.title,
        source: task.source ?? null,
        output: task.output ?? null,
        status: task.status ?? "complete",
        proof_url: task.proof_url ?? null,
      })),
    );
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  if (payload.leads?.length) {
    const { error } = await supabase.from("leads").insert(
      payload.leads.map((lead) => ({
        client_id: payload.client_id,
        company: lead.company,
        channel: lead.channel ?? null,
        fit_score: lead.fit_score ?? null,
        reason: lead.reason ?? null,
      })),
    );
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  return NextResponse.json({ ok: true, run_id: runId });
}
