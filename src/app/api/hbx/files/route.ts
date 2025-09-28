import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId") || "U1001";
  return NextResponse.json({
    userId,
    files: [
      { id: "f1", name: "sample.jpg", sizeBytes: 152300, url: "/demo/sample.jpg" },
      { id: "f2", name: "readme.txt", sizeBytes: 31, url: "/demo/readme.txt" }
    ],
  });
}
