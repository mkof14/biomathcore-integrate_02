"use client";
import { useParams } from "next/navigation";

type RouteParams = { categorySlug?: string };

export default function CategoryClient() {
  const params = useParams<RouteParams>();
  const slug = params?.categorySlug;
  if (!slug) return null;
  return <div>Category (client): {slug}</div>;
}
