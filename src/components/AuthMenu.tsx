"use client";

import { signOut } from "next-auth/react";

export default function AuthMenu({ email }: { email?: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      {email && (
        <span className="text-slate-300">
          Signed in as <b className="text-white">{email}</b>
        </span>
      )}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-3 py-1.5
                   text-white font-semibold shadow hover:from-cyan-600 hover:to-emerald-600"
      >
        Sign&nbsp;Out
      </button>
    </div>
  );
}