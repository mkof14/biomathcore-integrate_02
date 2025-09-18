"use client";
import { useEffect, useMemo, useState } from "react";
import Bar from "@/components/admin/ui/Bar";
import DataTable from "@/components/admin/ui/DataTable";

export default function Finance() {
  const [data,setData] = useState<any>(null);
  const [mode,setMode] = useState<"daily"|"monthly"|"yearly">("daily");
  useEffect(()=>{ fetch("/api/finance/summary").then(r=>r.json()).then(setData); },[]);
  const current = useMemo(()=>data?.[mode]||[],[data,mode]);

  const exportCSV = () => {
    if(!data) return;
    const rows = [["Type","Label","Revenue"]]
      .concat(["daily","monthly","yearly"].flatMap((k:any)=> (data[k]||[]).map((r:any)=>[k, r.d??r.m??r.y, r.revenue])));
    const csv = rows.map(r=>r.join(",")).join("\n");
    const blob = new Blob([csv], {type:"text/csv"}); const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="finance_export.csv"; a.click(); URL.revokeObjectURL(url);
  };

  const cohorts = useMemo(()=>Array.from({length:6}).map((_,i)=>({ cohort:`2025-${i+1}`, repeats: Math.round(30+Math.random()*60)})),[]);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Finance Monitor</h2>
      <div className="flex gap-2">
        {(["daily","monthly","yearly"] as const).map(k=>(
          <button key={k} onClick={()=>setMode(k)} className={`px-3 py-1 rounded ${mode===k?"bg-sky-500 text-slate-900":"bg-slate-800"}`}>{k}</button>
        ))}
        <button onClick={exportCSV} className="ml-auto px-3 py-1 rounded bg-emerald-400 text-slate-900 font-semibold">Export CSV</button>
      </div>

      <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4">
        <div className="mb-2 text-sm text-slate-300">Revenue ({mode})</div>
        {current.length>0 && <Bar data={current} labelKey={mode==="daily"?"d":mode==="monthly"?"m":"y"} valueKey="revenue" />}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-slate-300 mb-2">Returns & Reasons</div>
          <DataTable rows={(data?.returns||[])} cols={[
            {key:"reason",label:"Reason"},
            {key:"amount",label:"Amount", render:(r:any)=>`$${r.amount}`}
          ]}/>
        </div>
        <div>
          <div className="text-sm text-slate-300 mb-2">Repeat Payments (Cohorts)</div>
          <DataTable rows={cohorts} cols={[{key:"cohort",label:"Cohort"},{key:"repeats",label:"Repeats"}]} />
        </div>
      </div>
    </div>
  );
}
