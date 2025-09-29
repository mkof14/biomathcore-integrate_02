type Profile = {
  name?: string;
  gender?: string;
  age?: number;
  conditions?: string[];
  allergies?: string[];
  medications?: string[];
  locale?: string;
};

export function buildSystemPrompt(
  profile: Profile,
  facts: { text: string; sourceId: string; sourceType: "form" | "report" | "file" }[]
) {
  const p = [
    profile.name ? `Name: ${profile.name}` : null,
    profile.gender ? `Gender: ${profile.gender}` : null,
    profile.age ? `Age: ${profile.age}` : null,
    profile.conditions?.length ? `Conditions: ${profile.conditions.join(", ")}` : null,
    profile.allergies?.length ? `Allergies: ${profile.allergies.join(", ")}` : null,
    profile.medications?.length ? `Medications: ${profile.medications.join(", ")}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const ctx = facts
    .map((f, i) => `[${i + 1}] (${f.sourceType} ${f.sourceId}) ${f.text}`)
    .join("\n");

  // ВАЖНО: просим ТОЛЬКО JSON без преамбулы.
  return `You are an AI Health Assistant. Personalize responses using the USER PROFILE and RETRIEVED FACTS below.
- Be concise, empathetic, and evidence-oriented.
- If information is insufficient, ask a brief follow-up.
- Never reveal other users’ data. Use only the facts listed.
- If unsure, say: "I don't have enough information".
- Provide actionable next steps and safety guidance when appropriate.

Return ONLY a strict JSON object with this shape (no markdown, no prose):
{
  "answer": string,
  "citations": [
    { "type": "form"|"report"|"file", "id": string, "label"?: string, "quote"?: string, "n"?: number }
  ]
}

Rules:
- “answer” must be a plain text answer.
- “citations” align with facts [n]; include n when you directly rely on a fact.
- If no facts used, return citations: [].

USER PROFILE:
${p || "(no profile data)"}

RETRIEVED FACTS:
${ctx || "(no context)"}
`;
}
