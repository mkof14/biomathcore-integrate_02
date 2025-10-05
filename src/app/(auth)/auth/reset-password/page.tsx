"use client";
export const dynamic = "force-dynamic";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthShell from "../../../_components/AuthShell";

export default function ResetPasswordPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const token = sp.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ ok?: string; err?: string }>({});

  const pwdRef = useRef<HTMLInputElement>(null);
  const cfmRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el1 = pwdRef.current;
    const el2 = cfmRef.current;
    if (el1) el1.value = "";
    if (el2) el2.value = "";
  }, []);

  useEffect(() => {
    if (!token) setMsg({ err: "Bad or missing token" });
  }, [token]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    if (password !== confirm) {
      setMsg({ err: "Passwords do not match" });
      return;
    }
    setLoading(true);
    setMsg({});
    try {
      const r = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Reset failed");
      setMsg({ ok: "Password changed. You can sign in now." });
      setTimeout(
        () => router.push(`/sign-in?reset=1&email=${encodeURIComponent(j?.email || "")}`),
        900
      );
    } catch (e: any) {
      setMsg({ err: e.message || "Server error" });
    } finally {
      setLoading(false);
    }
  }

  const commonInputProps = {
    lang: "en" as const,
    inputMode: "text" as const,
    autoCorrect: "off" as const,
    autoCapitalize: "none" as const,
    spellCheck: false,
  };

  return (
    <AuthShell title="Reset Password" subtitle="Choose a new password for your account.">
      {msg.err && (
        <div className="mb-4 rounded-md bg-red-500/15 text-red-200 px-3 py-2 text-sm">
          {msg.err}
        </div>
      )}
      {msg.ok && (
        <div className="mb-4 rounded-md bg-emerald-500/15 text-emerald-200 px-3 py-2 text-sm">
          {msg.ok}
        </div>
      )}

      <form onSubmit={onSubmit} className="grid gap-4" autoComplete="off">
        <div className="grid gap-2">
          <label className="text-slate-200 text-sm">New password</label>
          <div className="relative">
            <input
              {...commonInputProps}
              ref={pwdRef}
              type={show1 ? "text" : "password"}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              minLength={8}
              required
              className="w-full rounded-xl bg-white text-black px-4 py-3 pr-12 shadow focus:outline-none"
              placeholder="New password"
              autoComplete="new-password"
              name="new-password"
            />
            <button
              type="button"
              onClick={() => setShow1((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              aria-label="Toggle password visibility"
            >
              {show1 ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-slate-200 text-sm">Confirm password</label>
          <div className="relative">
            <input
              {...commonInputProps}
              ref={cfmRef}
              type={show2 ? "text" : "password"}
              value={confirm}
              onChange={(e: any) => setConfirm(e.target.value)}
              minLength={8}
              required
              className="w-full rounded-xl bg-white text-black px-4 py-3 pr-12 shadow focus:outline-none"
              placeholder="Confirm password"
              autoComplete="new-password"
              name="new-password-confirm"
            />
            <button
              type="button"
              onClick={() => setShow2((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              aria-label="Toggle password visibility"
            >
              {show2 ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !token}
          className="rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 text-white font-semibold py-3 disabled:opacity-60"
        >
          {loading ? "Saving…" : "Change password"}
        </button>
      </form>
    </AuthShell>
  );
}
