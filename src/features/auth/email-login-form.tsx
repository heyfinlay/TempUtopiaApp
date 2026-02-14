"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { UnderlitButton } from "@/components/primitives/underlit-button";

const sanitizeNext = (value: string | null): string => {
  if (!value) {
    return "/dashboard";
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
};

export const EmailLoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createSupabaseBrowserClient();

      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message || "Unable to create account.");
          setIsPending(false);
          return;
        }

        if (data.session) {
          const searchParams = new URLSearchParams(window.location.search);
          const next = sanitizeNext(searchParams.get("redirect") ?? searchParams.get("next"));
          router.push(next);
          return;
        }

        setSuccess("Account created. Check your email to confirm, then sign in.");
        setIsPending(false);
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message || "Unable to sign in.");
        setIsPending(false);
        return;
      }

      const searchParams = new URLSearchParams(window.location.search);
      const next = sanitizeNext(searchParams.get("redirect") ?? searchParams.get("next"));
      router.push(next);
    } catch {
      setError(mode === "signup" ? "Unable to create account." : "Unable to sign in.");
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`flex-1 rounded-md border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
            mode === "signin"
              ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-100"
              : "border-slate-700/60 text-slate-400 hover:text-slate-200"
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-md border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
            mode === "signup"
              ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-100"
              : "border-slate-700/60 text-slate-400 hover:text-slate-200"
          }`}
        >
          Create account
        </button>
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wide text-slate-400">Email</label>
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wide text-slate-400">Password</label>
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your password"
          required
        />
      </div>
      <UnderlitButton type="submit" disabled={isPending}>
        {isPending ? (mode === "signup" ? "Creating account..." : "Signing in...") : mode === "signup" ? "Create account" : "Sign in"}
      </UnderlitButton>
      {success ? <p className="text-sm text-emerald-300">{success}</p> : null}
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </form>
  );
};
