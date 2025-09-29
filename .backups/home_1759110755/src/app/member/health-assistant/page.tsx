"use client";

import AssistantChat from "@/components/assistant/AssistantChat";

export default function HealthAssistantPage() {
  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
      <h1 className="text-2xl font-semibold text-slate-100">AI Health Assistant</h1>
      <p className="text-slate-300 text-sm">
        Talk, type, and get guidance. Voice input/output supported.
      </p>

      {/* Unified agent on the page */}
      <AssistantChat initialLang="en" />
    </div>
  );
}
