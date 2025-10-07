"use client";
export const dynamic = "force-dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthShell from "../_components/AuthShell";

export default function SignInPage() {
  const sp = useSearchParams();
  const reset = sp.get("reset") === "1";
  const error = sp.get("error") || "";
  const emailFromQS = sp.get("email") || "";

  const [csrf, setCsrf] = useState("");
  const [email, setEmail] = useState(emailFromQS);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hideResetBanner, setHideResetBanner] = useState(false);

  const pwdRef = useRef<HTMLInputElement>(null);

  const showResetBanner = useMemo(
    () => reset && !hideResetBanner,
    [reset, hideResetBanner],
  );
  const showErrorBanner = error === "CredentialsSignin";

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/auth/csrf", { cache: "no-store" });
        const j = await r.json();
        if (j?.csrfToken) setCsrf(j.csrfToken);
      } catch {}
    })();
  }, []);

  useEffect(() => {
    if (reset) {
      setPassword("");
      const el = pwdRef.current;
      if (el) {
        el.value = "";
        // @ts-ignore
        el.autocomplete = "new-password";
      }
    }
  }, [reset]);

  const pwdAutoComplete = reset ? "new-password" : "current-password";
  const pwdInputKey = reset ? "pwd-after-reset" : "pwd-normal";

  const commonInputProps = {
    lang: "en" as const,
    inputMode: "text" as const,
    autoCorrect: "off" as const,
    autoCapitalize: "none" as const,
    spellCheck: false,
  };

  return (
    <AuthShell
      title="BioMath Core — Sign In"
      subtitle="After login you’ll be redirected to your member area."
      logoSrc="/images/BMCore-Logo-33.png"
    >
      {showResetBanner && (
        <div className="mb-4 flex items-start justify-between gap-3 rounded-lg bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200">
          <div>
            ✅ Your password has been changed. Please sign in with your new
            password.
          </div>
          <button
            onClick={() => setHideResetBanner(true)}
            className="btn-nasa"
            aria-label="Close"
            type="button"
          >
            ✕
          </button>
        </div>
      )}

      {showErrorBanner && (
        <div className="mb-4 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200">
          Sign in failed. Check the details you provided are correct.
        </div>
      )}

      <form
        method="post"
        action="/api/auth/callback/credentials"
        className="grid gap-4"
        onSubmit={() => setSubmitting(true)}
        autoComplete="off"
      >
        <input type="hidden" name="csrfToken" value={csrf} />
        <input
          type="hidden"
          name="callbackUrl"
          value="/member/questionnaires"
        />

        <div className="grid gap-2">
          <label className="text-slate-200 text-sm">Email</label>
          <input
            {...commonInputProps}
            name="email"
            type="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl bg-white text-black px-4 py-3 shadow focus:outline-none"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-slate-200 text-sm">Password</label>
          <div className="relative">
            <input
              {...commonInputProps}
              ref={pwdRef}
              key={pwdInputKey}
              name="password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl bg-white text-black px-4 py-3 pr-12 shadow focus:outline-none"
              placeholder="••••••••"
              autoComplete={pwdAutoComplete}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              aria-label="Toggle password visibility"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-nasa"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>

        <div className="mt-2 flex items-center justify-between text-sm">
          <a
            href="/auth/forgot-password"
            className="text-sky-300 hover:text-sky-200"
          >
            Forgot password?
          </a>
          <a href="/auth/sign-up" className="text-sky-300 hover:text-sky-200">
            Sign Up
          </a>
        </div>
      </form>
    </AuthShell>
  );
}
