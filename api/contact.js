// ============================================================
// api/contact.js — Vercel Serverless Function
// Handles contact form + newsletter signups from Thriftonyte
// Deploy this inside your /api folder in the repo
// ============================================================

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID) || 2;

export default async function handler(req, res) {
  // Allow CORS from your domain
  res.setHeader("Access-Control-Allow-Origin", "https://thriftonyte.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { type, name, email, message, subject } = req.body;

  try {
    // ── NEWSLETTER SIGNUP ──────────────────────────────────
    if (type === "newsletter") {
      // 1. Add to Brevo list
      await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          attributes: { FIRSTNAME: name || "" },
          listIds: [BREVO_LIST_ID],
          updateEnabled: true,
        }),
      });

      // 2. Trigger welcome email via Apps Script
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email, name }),
      });

      return res.status(200).json({ success: true, message: "Subscribed!" });
    }

    // ── CONTACT / SUPPORT FORM ─────────────────────────────
    if (type === "contact") {
      // Send to Apps Script → routes to support@thriftonyte.com
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name,
          email,
          subject: subject || "Website Contact Form",
          message,
        }),
      });

      return res.status(200).json({ success: true, message: "Message received!" });
    }

    return res.status(400).json({ error: "Invalid type" });

  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
