import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("owner_user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!client) {
    return NextResponse.json({ error: "no_client" }, { status: 400 });
  }

  const payload = (await request.json().catch(() => null)) as
    | {
        industry?: string;
        location?: string;
        max_outreach_per_day?: number;
        approval_required?: boolean;
        exclude_keywords?: string;
        offer_focus?: string;
      }
    | null;

  if (!payload) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const { error } = await supabase.from("agent_settings").upsert({
    client_id: client.id,
    industry: payload.industry ?? null,
    location: payload.location ?? null,
    max_outreach_per_day: payload.max_outreach_per_day ?? 15,
    approval_required: payload.approval_required ?? true,
    exclude_keywords: payload.exclude_keywords ?? null,
    offer_focus: payload.offer_focus ?? null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
