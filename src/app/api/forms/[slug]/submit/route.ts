import { NextResponse } from "next/server"
type RouteContext = { params: { slug: string } }
export async function POST(req: Request, ctx: RouteContext) {
  try {
    const slug = ctx?.params?.slug
    if (!slug) return NextResponse.json({ ok:false,error:"Invalid slug" },{ status:400 })
    let payload: unknown
    try { payload = await req.json() } catch { return NextResponse.json({ ok:false,error:"Invalid JSON body" },{ status:400 }) }
    return NextResponse.json({ ok:true,slug,payload },{ status:200 })
  } catch (e) {
    const m = e instanceof Error ? e.message : "Unknown error"
    return NextResponse.json({ ok:false,error:m },{ status:500 })
  }
}
export const dynamic = "force-dynamic"
