"use client";
import { useEffect, useState } from "react";
export default function AiAssistantModal(){
  const [open,setOpen]=useState(false);
  useEffect(()=>{
    const onOpen=()=>setOpen(true);
    window.addEventListener("open-ai-assistant",onOpen as any);
    return ()=>window.removeEventListener("open-ai-assistant",onOpen as any);
  },[]);
  if(!open) return null;
  return (
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={()=>setOpen(false)} />
      <div className="relative w-[min(1000px,92vw)] h-[min(720px,88vh)] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
        <button onClick={()=>setOpen(false)} aria-label="Close" className="absolute right-2 top-2 rounded-md px-3 py-1.5 text-sm text-white bg-white/10 hover:bg-white/20">Close</button>
        <iframe src="/member/health-assistant" className="w-full h-full" title="AI Health Assistant" />
      </div>
    </div>
  );
}
