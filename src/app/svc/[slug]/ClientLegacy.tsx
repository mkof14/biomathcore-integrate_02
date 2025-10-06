"use client";
import dynamic from "next/dynamic";

const LegacyMount = dynamic(
  () =>
    import(
      "../../../../_legacy_routes/src__app__services__[slug]/ServiceGeneratorMount"
    )
      .then((m: any) => m.default || m)
      .catch(() => Promise.resolve(() => null)),
  { ssr: false },
) as any;

export default function ClientLegacy({ slug }: { slug: string }) {
  return <LegacyMount slug={slug} />;
}
