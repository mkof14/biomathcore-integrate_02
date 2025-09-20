import type { BlackBoxJob, BlackBoxResult } from "@/lib/report-engine/contracts/blackboxSchemas";

type Row = {
  id: string; kind: string; payload: any; createdAt: Date; status: string;
  result?: any; error?: string; canceledAt?: Date; clearedAt?: Date;
};

const mem = new Map<string, Row>();
const cuid = () => Math.random().toString(36).slice(2)+Date.now().toString(36);

export function makeBlackboxMemoryRepo(){
  return {
    async create(j: Pick<BlackBoxJob,"kind"|"payload">){
      const id = cuid();
      const r: Row = { id, kind:j.kind, payload:j.payload, createdAt:new Date(), status:"queued" };
      mem.set(id,r);
      return { id:r.id, kind:r.kind, payload:r.payload, createdAt:r.createdAt } as const;
    },
    async list(limit=50){
      return Array.from(mem.values()).sort((a,b)=>+b.createdAt-+a.createdAt).slice(0,limit);
    },
    async get(id: string){ return mem.get(id) ?? null; },
    async setResult(id: string, res: Omit<BlackBoxResult,"id">){
      const r = mem.get(id); if (!r) return;
      if (res.ok){ r.status="done"; r.result=res.data; r.error=undefined; }
      else { r.status="failed"; r.error=res.error||"error"; r.result=undefined; }
    },
    async cancel(id: string){ const r=mem.get(id); if(!r) return false; r.status="canceled"; r.canceledAt=new Date(); return true; },
    async clear(beforeISO?: string){ 
      let n=0; const t= beforeISO? new Date(beforeISO).getTime():Infinity;
      for (const r of mem.values()){ if (+r.createdAt < t){ r.clearedAt=new Date(); n++; } }
      return n;
    },
  };
}
