"use client";
import Engine from "@/modules/questionnaires/engine/QuestionnaireEngine";
export default function Page() {
  const modules = [
    {
      key: "smoke",
      title: "Smoke",
      questions: [
        { id: "smoke.name", type: "text", label: "Your name", required: true },
        {
          id: "smoke.mode",
          type: "select",
          label: "Mode",
          options: [
            { value: "a", label: "A" },
            { value: "b", label: "B" },
          ],
        },
      ],
    },
  ];
  return (
    <div className="p-4">
      <Engine modules={modules as any} />
    </div>
  );
}
