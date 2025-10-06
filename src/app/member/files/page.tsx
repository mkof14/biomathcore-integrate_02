"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FilesPanel from "@/components/health/FilesPanel";

export default function MemberFilesPage() {
  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex items-center mb-2">
        <Link
          href="/member/health-blackbox"
          className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-slate-100 mb-1">
          Your Files
        </h1>
        <p className="text-slate-300 text-sm">
          Manage, preview, share, and download files stored in your Health Black
          Box.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
        <FilesPanel userId="U1001" />
      </div>
    </div>
  );
}
