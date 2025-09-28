"use client";

import { useState } from "react";
import Image from "next/image";
import AuthShell from "@/components/AuthShell";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const res = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email,
          password,
          callbackUrl: "/member/questionnaires",
        }).toString(),
      });
      if (res.ok) {
        window.location.href = "/member/questionnaires";
      } else {
        setMessage("Sign in failed. Check your email or password.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Sign in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell>
      <div className="flex flex-col items-center mb-6">
        <Image
          src="/images/BMCore-Logo-33.png"
          alt="BioMath Core"
          width={180}
          height={64}
          priority
        />
        <h1 className="mt-4 text-2xl font-semibold text-white">Sign In</h1>
      </div>

      {message && (
        <div className="mb-4 rounded bg-red-500/20 text-red-200 px-4 py-2 text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm mb-1 text-slate-200">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl bg-white text-black px-4 py-3 shadow focus:outline-none"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-slate-200">Password</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
              className="w-full rounded-xl bg-white text-black px-4 py-3 pr-12 shadow focus:outline-none"
              placeholder="••••••••"
              autoComplete="current-password"
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
          className="rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 text-white font-semibold py-3 disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>

        <div className="mt-2 flex items-center justify-between text-sm">
          <a href="/auth/forgot-password" className="text-sky-300 hover:text-sky-200">
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
