import EnginePageClient from "./render";
import { resolvePlanForRequest } from "@/app/lib/planServer";

export default async function QuestionnairePage() {
  const plan = await resolvePlanForRequest(); // "STANDARD" | "PREMIUM" | "MAX"
  return (
    <div className="w-full">
      <EnginePageClient plan={plan} />
    </div>
  );
}
