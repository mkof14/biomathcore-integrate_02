import { notFound } from "next/navigation";

type PageProps = { params: { categorySlug?: string } };

export default async function Page({ params }: PageProps) {
  const slug = params?.categorySlug;
  if (!slug) notFound();

  // TODO: верни свою реализацию здесь
  return <div>Category: {slug}</div>;
}
