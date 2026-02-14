import { Panel } from "@/components/primitives/panel";
import { EmailLoginForm } from "@/features/auth/email-login-form";

interface LoginPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const readParam = (value: string | string[] | undefined): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const error = readParam(params.error);
  const errorCode = readParam(params.error_code);
  const errorStatus = readParam(params.error_status);
  const requestId = readParam(params.request_id);
  const errorDescription = readParam(params.error_description);

  return (
    <div className="mx-auto max-w-xl py-12">
      <Panel title="Login" subtitle="Sign in or create an account">
        <EmailLoginForm />
        <p className="mt-4 text-xs text-slate-400">
          <a href="/" className="underline decoration-slate-500/60 underline-offset-4">Return to landing page</a>
        </p>

        {error ? (
          <div className="mt-3 space-y-1 rounded-md border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
            <p className="font-medium">{error}</p>
            {errorDescription && errorDescription !== error ? <p className="text-xs text-red-200/90">{errorDescription}</p> : null}
            <p className="text-xs text-red-200/80">
              {errorCode ? `Code: ${errorCode}` : null}
              {errorCode && errorStatus ? " · " : null}
              {errorStatus ? `Status: ${errorStatus}` : null}
              {(errorCode || errorStatus) && requestId ? " · " : null}
              {requestId ? `Request: ${requestId}` : null}
            </p>
          </div>
        ) : null}
      </Panel>
    </div>
  );
}
