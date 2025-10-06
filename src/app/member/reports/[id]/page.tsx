import { getReport } from "@/lib/report-engine/store";

export default async function ReportView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rep = getReport(id);

  if (!rep) {
    return (
      <div className="p-6 max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Report</h1>
        <div className="rounded border p-4 bg-white">Not found</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{rep.title}</h1>
        <div className="text-sm text-slate-500">
          {new Date(rep.createdAt).toLocaleString()}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded p-4 border bg-white">
          <div className="font-semibold mb-2">Insights</div>
          <ul className="space-y-2 text-sm">
            {rep.insights.map((i: any, idx: number) => (
              <li key={idx} className="flex gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-xs ${
                    i.kind === "risk"
                      ? "bg-rose-100 text-rose-700"
                      : i.kind === "trend"
                        ? "bg-sky-100 text-sky-700"
                        : i.kind === "recommendation"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {i.kind}
                </span>
                <div>
                  <div className="font-medium">{i.label}</div>
                  <div className="text-slate-600">{i.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded p-4 border bg-white">
          <div className="font-semibold mb-2">Metrics</div>
          <ul className="text-sm">
            {Object.entries(rep.metrics).map(([k, v]) => (
              <li key={k}>
                <strong>{k}:</strong> {String(v)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded p-4 border bg-white">
        <div className="font-semibold mb-2">Sections</div>
        <div className="prose max-w-none">
          {rep.sections.map((s: any) => (
            <section key={s.id} className="mb-6">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: s.html }} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
