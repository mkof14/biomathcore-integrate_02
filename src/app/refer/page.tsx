import type { Metadata } from "next";
import ReferClient from "./ReferClient";

export const metadata: Metadata = {
  title: "Refer a Friend • BioMath Core",
  description: "Invite friends to BioMath Core and unlock benefits.",
};

export default async function ReferPage() {
  // Do any server-side fetching here; pass only plain data to the client
  const title = "Refer a friend";
  return <ReferClient title={title} />;
}
