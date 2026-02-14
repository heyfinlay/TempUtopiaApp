import { redirect } from "next/navigation";
import { Landing } from "@/components/marketing/Landing";
import { getUser } from "@/lib/supabase/auth";

export default async function LandingPage() {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }

  return <Landing />;
}
