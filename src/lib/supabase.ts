import { createServerSupabaseClient } from "@/lib/supabase/server";

export const getSupabaseServerClient = async () => {
  return createServerSupabaseClient();
};
