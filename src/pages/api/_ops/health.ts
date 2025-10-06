import type { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "HEAD") {
    res.status(200).end();
    return;
  }
  res.status(200).json({ ok: true, ts: Date.now(), service: "web" });
}
