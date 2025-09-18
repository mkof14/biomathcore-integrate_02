"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const options = [
  { label:"Go: Dashboard", href:"/admin/dashboard" },
  { label:"Go: Finance", href:"/admin/finance" },
  { label:"Go: Users", href:"/admin/users" },
  { label:"Go: Devices", href:"/admin/devices" },
  { label:"Go: Monitoring", href:"/admin/monitoring" },
  { label:"Go: Behavior", href:"/admin/behavior" },
  { label:"Go: Alerts", href:"/admin/alerts" },
  { label:"Go: Settings", href:"/admin/settings" },
];
export default function CommandPaletteClient(){
  const [open,setOpen]=useState(false);
  const [q,setQ]=useState(""); 
  const r = useRouter();
  useEffect(()=>{
    const onK=(e:KeyboardEvent)=>{ if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){ e.preventDefault(); setOpen(o=>!o);} };
    window.addEventListener("keydown",onK); return ()=>window.removeEventListener("keydown",onK);
  },[]);
  const list = options.filter(o=>o.label.toLowerCase().includes(q.toLowerCase()));
  if(!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-24" onClick={()=>setOpen(false)}>
      <div className="w-full max-w-xl bg-[#0c1324] border border-slate-700 rounded-xl" onClick={e=>e.stopPropagation()}>
        <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Type a command…" className="w-full px-4 py-3 bg-transparent outline-none"/>
        <div className="max-h-72 overflow-auto">
          {list.map((o,i)=>(
            <button key={i} className="w-full text-left px-4 py-2 hover:bg-slate-800" onClick={()=>{setOpen(false); r.push(o.href);}}>{o.label}</button>
          ))}
          {list.length===0 && <div className="px-4 py-6 text-sm text-slate-500">No matches</div>}
        </div>
      </div>
    </div>
  );
}
