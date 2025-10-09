import { Suspense } from "react";
import ServicesCategoryClient from "./ServicesCategoryClient";

export default async function Page(props: { params: Promise<{ category: string }> }) {
  const { category } = await props.params;
  return (
    <Suspense fallback={<div className="p-6 text-gray-400">Loading…</div>}>
      <ServicesCategoryClient category={category} />
    </Suspense>
  );
}
