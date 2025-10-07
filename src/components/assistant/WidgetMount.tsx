"use client";
import FloatingAssistant from "@/components/assistant/FloatingAssistant";
const enabled = process.env.NEXT_PUBLIC_HEALTH_WIDGET_ENABLED === "true";
export default function WidgetMount() {
  return enabled ? <FloatingAssistant /> : null;
}
