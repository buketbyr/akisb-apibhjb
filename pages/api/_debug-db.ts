import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const raw = process.env.DATABASE_URL || "";
  try {
    const u = new URL(raw);
    res.status(200).json({
      ok: !!raw,
      host: u.host,
      schema: u.searchParams.get("schema") || "(none)"
    });
  } catch {
    res.status(200).json({ ok: false, error: "parse-failed" });
  }
}
