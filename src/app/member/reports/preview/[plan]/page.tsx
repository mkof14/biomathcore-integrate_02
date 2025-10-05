export const dynamic = "force-dynamic";

export default async function PreviewPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan } = await params;
  if (!["core","daily","max"].includes((plan || "").toLowerCase())) {
    return <main className="p-6">Unknown plan</main>;
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/reports/generate/${plan}`, { cache: "no-store" });
  const data = await res.json();
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-2">Report preview: {plan}</h1>
      <pre className="rounded-xl p-4 bg-slate-900 text-slate-100 overflow-auto text-xs">
        {JSON.stringify(data,null,2)}
      </pre>
    </main>
  );
}
