import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  return NextResponse.json({
    methods: [
      { id:"pm_1", brand:"visa", last4:"4242", exp:"12/27", default:true },
      { id:"pm_2", brand:"mastercard", last4:"4444", exp:"05/28", default:false }
    ]
  });
}
