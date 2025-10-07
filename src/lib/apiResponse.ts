/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
// File: PLACEHOLDER
import { NextResponse } from "next/server";

type JsonInit = number | ResponseInit | undefined;

export function ok<T extends object>(data: T, init?: JsonInit) {
  return NextResponse.json(
    { ok: true, ...(data as any) },
    init as ResponseInit,
  );
}

export function bad(status: number, error: string, extra?: object) {
  return NextResponse.json(
    {
      ok: false,
      error,
      ...(extra ||
        {
          /* TODO: implement or remove */
        }),
    },
    { status },
  );
}
