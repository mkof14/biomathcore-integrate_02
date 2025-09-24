import { NextResponse } from "next/server";

export async function GET() {
  // TODO: заменить на реальные данные из БД/хранилища
  const data = {
    userId: "U1001",
    totalBytes: 0,
    files: 0,
    quotaBytes: 2 * 1024 * 1024 * 1024,
    lastBackup: "—",
    anomaly: true,
    encrypted: true,
  };
  return NextResponse.json(data);
}
