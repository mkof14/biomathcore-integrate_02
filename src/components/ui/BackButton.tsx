"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ href }: { href?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => (href ? router.push(href) : router.back())}
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-white
                 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 shadow hover:opacity-90 transition"
    >
      <span aria-hidden>←</span>
      <span>Back</span>
    </button>
  );
}
