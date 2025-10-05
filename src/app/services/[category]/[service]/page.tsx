import { redirect } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ category: string; service: string }> };

export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  return { title: `${service.replace(/-/g, " ")} • BioMath Core` };
}

export default async function Page({ params }: Props) {
  const { service } = await params;
  redirect(`/svc/${service}`);
}
