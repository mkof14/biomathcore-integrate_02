import { redirect } from "next/navigation";
type Props = { params: Promise<{ category: string; service: string }> };
export default async function Page({ params }: Props) {
  const { service } = await params;
  redirect(`/svc/${service}`);
}
