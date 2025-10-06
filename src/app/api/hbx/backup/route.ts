import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "started",
    startedAt: new Date().toISOString(),
  });
}
