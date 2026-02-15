import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

export async function GET() {
  const supabase = await createServerSupabaseClient();
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data: client } = await supabase
    .from("clients")
    .select("id,name,industry,timezone")
    .eq("owner_user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!client) {
    return NextResponse.json({ empty: true });
  }

  const since24 = hoursAgo(24);

  const [{ data: agent }, { data: settings }] = await Promise.all([
    supabase.from("agents").select("id,name,status,last_run_at").eq("client_id", client.id).limit(1).maybeSingle(),
    supabase.from("agent_settings").select("*").eq("client_id", client.id).limit(1).maybeSingle(),
  ]);

  const [
    leadsCount,
    queuedCount,
    repliesCount,
    bookedCount,
    tasks,
    leads,
  ] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("client_id", client.id).gte("created_at", since24),
    supabase
      .from("agent_tasks")
      .select("id", { count: "exact", head: true })
      .eq("client_id", client.id)
      .eq("status", "needs_approval")
      .gte("created_at", since24),
    supabase
      .from("conversations")
      .select("id", { count: "exact", head: true })
      .eq("client_id", client.id)
      .eq("direction", "inbound")
      .gte("created_at", since24),
    supabase
      .from("meetings")
      .select("id", { count: "exact", head: true })
      .eq("client_id", client.id)
      .eq("status", "confirmed")
      .gte("created_at", since24),
    supabase
      .from("agent_tasks")
      .select("id,created_at,title,source,output,status")
      .eq("client_id", client.id)
      .order("created_at", { ascending: false })
      .limit(7),
    supabase
      .from("leads")
      .select("id,company,channel,fit_score,reason,origin_task_id,created_at")
      .eq("client_id", client.id)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return NextResponse.json({
    client,
    agent,
    settings,
    metrics: {
      leads24h: leadsCount.count ?? 0,
      queued24h: queuedCount.count ?? 0,
      replies24h: repliesCount.count ?? 0,
      booked24h: bookedCount.count ?? 0,
    },
    tasks: tasks.data ?? [],
    leads: leads.data ?? [],
  });
}
