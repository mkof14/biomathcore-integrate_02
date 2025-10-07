"use client";
import { useEffect, useRef } from "react";
export default function Sparkline({
  data,
}: {
  data: { x: number; y: number }[];
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const w = (c.width = c.clientWidth);
    const h = (c.height = c.clientHeight);
    ctx.clearRect(0, 0, w, h);
    const max = Math.max(...data.map((d) => d.y)),
      min = Math.min(...data.map((d) => d.y));
    const sx = w / Math.max(1, data.length - 1);
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = i * sx;
      const y = h - ((d.y - min) / (max - min || 1)) * h;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    });
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [data]);
  return <canvas ref={ref} className="w-full h-[180px]" />;
}
