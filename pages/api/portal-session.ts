// Mints a short-lived portal-session token for @unitpay/react.
// The secret key stays server-side; only the token is returned to the browser.
// POST { customerId }  →  { token, expiresAt }
import type { NextApiRequest, NextApiResponse } from "next";
import { UnitPay, ApiError } from "@unitpay/node";

type Data = { token: string; expiresAt: string } | { error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.UNITPAY_SECRET_KEY ?? process.env.UNITPAY_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "UNITPAY_SECRET_KEY is not set on the server." });
  }

  const { customerId } = req.body ?? {};
  if (!customerId) {
    return res.status(400).json({ error: "customerId is required" });
  }

  try {
    const unitpay = new UnitPay({ apiKey, baseUrl: process.env.UNITPAY_BASE_URL || undefined });
    const session = await unitpay.portalSessions.create({ customerId, ttlSeconds: 3600 });
    return res.status(200).json({ token: session.token, expiresAt: session.expiresAt });
  } catch (err) {
    const message =
      err instanceof ApiError
        ? `${err.constructor.name}: ${err.message} (status ${err.status ?? "?"})`
        : err instanceof Error
          ? err.message
          : "Unexpected error";
    return res.status(502).json({ error: message });
  }
}
