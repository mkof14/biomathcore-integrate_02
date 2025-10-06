import { redirect } from "next/navigation";
import { categoryClassFor } from "@/app/_components/CategoryVisual";
import { categoryColorFor, CATEGORY_COLOR } from "@/app/_components/CategoryVisual";
import type { Metadata } from "next";

type Props = { params: Promise<{ category: string; service: string }> };

export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  return { title: `${service.replace(/-/g, " ")} • BioMath Core` };
}

export default async function Page({
  const svcColor = CATEGORY_COLOR[(data?.category?.slug as string)] ?? categoryColorFor(params?.category as string, data?.category?.title);
 params }: Props) {
  const { service } = await params;
  redirect(`/svc/${service}`);
}
