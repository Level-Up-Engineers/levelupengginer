// Vercel serverless function: receives lead form submissions and emails them
// to the team via Resend (https://resend.com).
//
// Required environment variables (set in Vercel project settings):
//   RESEND_API_KEY  – API key from resend.com
//   LEAD_TO_EMAIL   – optional, defaults to contact@levelupengineers.com
//   LEAD_FROM_EMAIL – optional, defaults to onboarding@resend.dev (works without
//                     domain verification; switch to e.g.
//                     "Level Up Engineers <leads@levelupengineers.com>" after
//                     verifying the domain in Resend)

const TO_EMAIL = process.env.LEAD_TO_EMAIL || "contact@levelupengineers.com";
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "Level Up Engineers <onboarding@resend.dev>";

interface LeadPayload {
  mode?: string;
  name?: string;
  email?: string;
  phone?: string;
  course?: string;
  startupName?: string;
  topic?: string;
  message?: string;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body: LeadPayload = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
  const { mode, name, email, phone, course, startupName, topic, message } = body;

  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: "Name, email and phone are required" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return res.status(500).json({ error: "Email service not configured" });
  }

  const isCounseling = mode !== "startup";
  const subject = isCounseling
    ? `New Course Lead: ${name}${course ? ` – ${course}` : ""}`
    : `New Startup Studio Lead: ${name}${topic ? ` – ${topic}` : ""}`;

  const rows: [string, string | undefined][] = [
    ["Type", isCounseling ? "Career Counseling" : "Startup Studio"],
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ...(isCounseling
      ? ([["Course", course]] as [string, string | undefined][])
      : ([
          ["Startup / Product", startupName],
          ["Topic", topic],
        ] as [string, string | undefined][])),
    ["Message", message],
  ];

  const html = `
    <h2>${escapeHtml(subject)}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows
        .filter(([, v]) => v?.trim())
        .map(
          ([k, v]) =>
            `<tr><td style="border:1px solid #ddd;font-weight:bold">${k}</td><td style="border:1px solid #ddd">${escapeHtml(v!)}</td></tr>`
        )
        .join("")}
    </table>`;

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject,
      html,
    }),
  });

  if (!resendRes.ok) {
    const detail = await resendRes.text();
    console.error("Resend API error:", resendRes.status, detail);
    return res.status(502).json({ error: "Failed to send notification email" });
  }

  return res.status(200).json({ ok: true });
}
