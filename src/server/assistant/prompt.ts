type Profile = {
  name?: string;
  gender?: string;
  age?: number;
  conditions?: string[];
  allergies?: string[];
  medications?: string[];
  locale?: string;
};

export function buildSystemPrompt(profile: Profile, facts: {text: string, sourceId: string, sourceType: string}[]) {
  const p = [
    profile.name ? `Name: ${profile.name}` : null,
    profile.gender ? `Gender: ${profile.gender}` : null,
    profile.age ? `Age: ${profile.age}` : null,
    profile.conditions?.length ? `Conditions: ${profile.conditions.join(", ")}` : null,
    profile.allergies?.length ? `Allergies: ${profile.allergies.join(", ")}` : null,
    profile.medications?.length ? `Medications: ${profile.medications.join(", ")}` : null,
  ].filter(Boolean).join("\n");

  const ctx = facts.map((f,i)=>`[${i+1}] (${f.sourceType} ${f.sourceId}) ${f.text}`).join("\n");

  return `You are an AI Health Assistant. Personalize responses based on the user's profile and the provided context.
- Be concise, empathetic, and evidence-oriented.
- If information is insufficient, ask a brief follow-up.
- Never reveal other users' data. Only use facts listed below.
- If unsure, say "I don't have enough information".
- Provide actionable next steps and safety guidance when appropriate.

USER PROFILE:
${p || "(no profile data)"} 

RETRIEVED FACTS:
${ctx || "(no context)"}

When citing, reference [n] from the facts list when a statement directly relies on a retrieved fact.`;
}
