import { startOtel } from "@/otel/tracing";
export async function register() { await startOtel(); }
