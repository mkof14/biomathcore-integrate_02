export type RetrievedFact = {
  text: string;
  sourceId: string;
  sourceType: "form" | "report" | "file";
};

export type AssistantCitation = {
  type: "form" | "report" | "file";
  id: string;
  label?: string;
  quote?: string;
  n?: number;
};

export type AssistantJSON = {
  answer: string;
  citations?: AssistantCitation[];
};

export function safeParseAssistantJSON(txt: string): AssistantJSON | null {
  try {
    const obj = JSON.parse(txt);
    if (!obj || typeof obj !== "object") return null;
    if (typeof (obj as any).answer !== "string") return null;
    if ((obj as any).citations != null && !Array.isArray((obj as any).citations)) return null;
    if (Array.isArray((obj as any).citations)) {
      for (const c of (obj as any).citations) {
        if (!c || typeof c !== "object") return null;
        if (!["form","report","file"].includes((c as any).type)) return null;
        if (typeof (c as any).id !== "string") return null;
        if ((c as any).label != null && typeof (c as any).label !== "string") return null;
        if ((c as any).quote != null && typeof (c as any).quote !== "string") return null;
        if ((c as any).n != null && typeof (c as any).n !== "number") return null;
      }
    }
    return obj as AssistantJSON;
  } catch {
    return null;
  }
}
