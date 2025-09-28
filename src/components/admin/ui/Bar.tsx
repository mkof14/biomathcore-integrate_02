"use client";
import { useEffect, useRef } from "react";
export default function Bar({data,labelKey,valueKey}:{data:any[];labelKey:string;valueKey:string}) {
  const ref = useRef<HTMLCanvasElement|null>(null);
  useEffect(()=>{
    const c = ref.current; if(!c) return; const ctx = c.getContext("2d")!;
    const w = c.width = c.clientWidth; const h = c.height = c.clientHeight;
    ctx.clearRect(0,0,w,h);
    const max = Math.max(...data.map(d=>Number(d[valueKey])||0), 1);
    const bw = w/(Math.max(1,data.length)*1.4);
    data.forEach((d,i)=>{
      const x = i*(bw*1.4)+bw*0.2;
      const val = Number(d[valueKey])||0;
      const bh = (val/max)*(h-20);
      ctx.fillStyle = "#22d3ee";
      ctx.fillRect(x, h-bh, bw, bh);
    });
  },[data,labelKey,valueKey]);
  return <canvas ref={ref} className="w-full h-[220px]"/>;
}
