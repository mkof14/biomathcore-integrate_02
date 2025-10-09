import { Suspense } from "react";
import ServicesClient from "./ServicesClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-400">Loading…</div>}>
      <ServicesClient />
    </Suspense>
  );
}
