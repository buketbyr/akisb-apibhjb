export default function handler(_req, res) {
  const raw = process.env.DATABASE_URL || "";
  try {
    const u = new URL(raw);
    const masked = `${u.protocol}//***:***@${u.host}${u.pathname}?${u.searchParams.toString()}`;
    res.status(200).json({
      ok: !!raw,
      host: u.host,
      schema: u.searchParams.get("schema") || "(none)",
      url: masked
    });
  } catch {
    res.status(200).json({ ok: false, error: "parse-failed", sample: raw ? raw.slice(0, 24) + "..." : "" });
  }
}
