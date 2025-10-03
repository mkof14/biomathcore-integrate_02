import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const rep = await getReport(params.id);   // подключи реальную функцию
  if (!rep) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">{rep.title}</h1>
      <div className="text-sm text-slate-500">
        {rep.createdAt ? new Date(rep.createdAt).toLocaleString() : ""}
      </div>

      {(rep.insights ?? []).map((i: any, idx: number) => (
        <div key={idx}>{/* … */}</div>
      ))}

      {Object.entries(rep.metrics ?? {}).map(([k, v]) => (
        <div key={k}>{/* … */}</div>
      ))}

      {(rep.sections ?? []).map((s: any) => (
        <section key={s?.id ?? Math.random()}>{/* … */}</section>
      ))}
    </div>
  );
}

// ↓ заглушка — удали, если уже есть getReport
async function getReport(id: string) {
  return null as any;
}
