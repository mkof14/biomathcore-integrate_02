/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
import { saveReport } from "@/lib/report-engine/store";
import { generateReport } from "@/lib/report-engine/generate";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try{
    const body = await req.json().catch(()=> ({ /* TODO: implement or remove */ }));
    const userId = body?.userId || "U1001";
    const scope = {
      includeQuestionnaires: body?.includeQuestionnaires ?? ["patient","lifestyle","medical-history"],
      includeDevices: !!body?.includeDevices,
      includeLabs: !!body?.includeLabs,
      includeSexualHealth: !!body?.includeSexualHealth
    };
    const r = await generateReport(userId, scope);
    saveReport(r);
    return NextResponse.json({ ok:true, id:r.id });
  }catch(e: unknown){
    return NextResponse.json({ ok:false, error:"failed" }, { status: 500 });
  }
}
