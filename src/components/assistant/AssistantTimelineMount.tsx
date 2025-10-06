"use client";
import AssistantTimeline from "./AssistantTimeline";
export default function AssistantTimelineMount({
  userId = "U1001",
}: {
  userId?: string;
}) {
  return <AssistantTimeline userId={userId} />;
}
