"use client";
import { useEffect, useState } from "react";
type Service = { name:string; status:"UP"|"DOWN"|"DEGRADED"; latencyMs:number; lastIncident?:string };

export default function Monitoring() {
  const [services,setServices] = useState<Service[]>([
    { name:"API Gateway", status:"UP", latencyMs: 82 },
    { name:"Auth Service", status:"UP", latencyMs: 65 },
    { name:"Payments", status:"DEGRADED", latencyMs: 210, lastIncident:"Refund spikes" },
    { name:"Devices Stream", status:"UP", latencyMs: 95 },
    { name:"Analytics", status:"UP", latencyMs: 120 },
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setServices(prev => prev.map(s => {
        const jitter = Math.max(40, Math.min(400, Math.round(s.latencyMs + (Math.random()*20-10))));
        return { ...s, latencyMs: jitter };
      }));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Monitoring</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Overall Status">
          <div className="text-2xl font-semibold">Operational</div>
          <div className="text-slate-400 text-xs">All systems nominal</div>
        </Card>
        <Card title="Incidents (24h)">
          <div className="text-2xl font-semibold">3</div>
          <div className="text-slate-400 text-xs">2 resolved • 1 investigating</div>
        </Card>
        <Card title="API p95 latency">
          <div className="text-2xl font-semibold">~ 220 ms</div>
          <div className="text-slate-400 text-xs">Target &lt; 300 ms</div>
        </Card>
      </div>

      <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4">
        <div className="mb-3 text-sm text-slate-300">Services</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-slate-400">
              <tr><th className="text-left py-2">Service</th><th className="text-left py-2">Status</th><th className="text-left py-2">Latency</th><th className="text-left py-2">Last incident</th></tr>
            </thead>
            <tbody>
              {services.map((s,i)=>(
                <tr key={i} className="border-t border-slate-800">
                  <td className="py-2">{s.name}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      s.status==="UP" ? "bg-emerald-400/20 text-emerald-300" :
                      s.status==="DEGRADED" ? "bg-amber-400/20 text-amber-300" :
                      "bg-rose-400/20 text-rose-300"
                    }`}>{s.status}</span>
                  </td>
                  <td className="py-2">{s.latencyMs} ms</td>
                  <td className="py-2">{s.lastIncident ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Event Stream (sample)">
          <div className="h-[220px] overflow-auto space-y-2 text-xs text-slate-300">
            <div>20:31:12 • devices/online • +3</div>
            <div>20:31:05 • auth/login • 200</div>
            <div>20:30:53 • payments/refund • 201</div>
            <div>20:30:41 • alerts/new • Payment latency spike</div>
            <div>20:30:18 • analytics/batch • success</div>
          </div>
        </Card>
        <Card title="Uptime (sample)">
          <div className="h-[220px] grid grid-cols-12 gap-1">
            {Array.from({length: 96}).map((_,i)=>(
              <div key={i} className={`h-4 ${i%13===0 ? "bg-rose-500/60" : "bg-emerald-500/60"}`} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
function Card({title, children}:{title:string;children:React.ReactNode}) {
  return (
    <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4">
      <div className="mb-2 text-sm text-slate-300">{title}</div>
      {children}
    </div>
  );
}
