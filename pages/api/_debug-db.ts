// pages/api/_debug-db.ts
export default function handler(_req, res) {
  const raw = process.env.DATABASE_URL || "";
  try { const u = new URL(raw);
    res.status(200).json({ ok: !!raw, host: u.host, schema: u.searchParams.get("schema") || "(none)" });
  } catch { res.status(200).json({ ok: false }); }
}


