import { NextResponse } from "next/server";
import { getBlackboxRepo } from "@/lib/repos/blackboxRepo";
export async function POST(req: Request){
  const body = await req.json().catch(()=> ({} as any));
  const before = typeof body?.before === "string" ? body.before : undefined;
  const n = await getBlackboxRepo().clear(before);
  return NextResponse.json({ ok:true, cleared:n });
}
