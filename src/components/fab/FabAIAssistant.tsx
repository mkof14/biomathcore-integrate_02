"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FabAIAssistant() {
  const path = usePathname();
  if (path?.startsWith("/member/health-assistant") || path?.startsWith("/ai-assistant")) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 print:hidden">
      <Link
        href="/member/health-assistant"
        prefetch={false}
        aria-label="AI Health Assistant"
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 shadow-lg transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="currentColor" aria-hidden="true">
          <path d="M12 3c4.97 0 9 3.582 9 8 0 4.418-4.03 8-9 8-.777 0-1.532-.084-2.253-.244-.235-.053-.482.006-.665.164L6.2 21.8a.75.75 0 0 1-1.28-.53v-2.266c0-.23-.105-.448-.285-.596C3.63 17.042 3 15.58 3 14c0-4.418 4.03-8 9-8Zm-3 7.25a.75.75 0 1 0 0 1.5h6a.75.75 0 1 0 0-1.5H9Zm0-3a.75.75 0 1 0 0 1.5h6a.75.75 0 1 0 0-1.5H9Z"/>
        </svg>
        <span className="absolute -right-0.5 -top-0.5 block h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-100"></span>
        </span>
        <span className="pointer-events-none absolute -left-2 -translate-x-full rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
          AI Health Assistant
        </span>
      </Link>
    </div>
  );
}
