"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Item = { id:string; title:string; createdAt:string };

export default function ReportsPage(){
  const [items,setItems] = useState<Item[]>([]);
  const [loading,setLoading] = useState(true);
  const [genLoading,setGenLoading] = useState(false);

  const load = async ()=>{
    setLoading(true);
    try{
      const r = await fetch("/api/reports/list?userId=U1001",{cache:"no-store"});
      const j = await r.json(); setItems(j.items||[]);
    }catch(e){}
    finally{ setLoading(false); }
  };
  useEffect(()=>{ load(); },[]);

  const generate = async ()=>{
    setGenLoading(true);
    try{
      const r = await fetch("/api/reports/generate",{
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          userId:"U1001",
          includeQuestionnaires:["patient","lifestyle","medical-history","sexual-health-male"],
          includeDevices:true,
          includeLabs:true,
          includeSexualHealth:true
        })
      });
      const j = await r.json();
      if(j.ok){ await load(); }
    } finally { setGenLoading(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reports</h1>
        <button onClick={generate} disabled={genLoading}
          className="px-4 py-2 rounded bg-gradient-to-r from-sky-400 to-emerald-400 text-slate-900 font-semibold">
          {genLoading? "Generating…" : "Generate report"}
        </button>
      </div>
      {loading && <div className="text-slate-500">Loading…</div>}
      <div className="grid gap-3">
        {items.map(it=>(
          <Link key={it.id} href={`/member/reports/${it.id}`}
            className="block p-4 rounded border hover:shadow bg-white">
            <div className="text-sm text-slate-500">{new Date(it.createdAt).toLocaleString()}</div>
            <div className="text-lg font-semibold">{it.title}</div>
            <div className="text-sm text-slate-500">ID: {it.id}</div>
          </Link>
        ))}
        {(!loading && items.length===0) && <div className="text-slate-500">No reports yet.</div>}
      </div>
    </div>
  );
}
