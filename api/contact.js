// ============================================================
// api/contact.js — Vercel Serverless Function
// Handles contact form + newsletter signups from Thriftonyte
// Emails go directly to support@thriftonyte.com for n8n processing
// Newsletter signups also go to Brevo for list storage
// Powered by Resend for reliable delivery
// ============================================================

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID) || 2;

export default async function handler(req, res) {
  // Allow CORS from your domain
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { type, name, email, message, subject } = req.body;

  try {
    // ── NEWSLETTER SIGNUP ──────────────────────────────────
    if (type === "newsletter") {
      // 1. Add to Brevo list (kept for list storage)
      if (BREVO_API_KEY) {
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
      }

      // 2. Send notification to support@ for n8n to process via Resend
      await resend.emails.send({
        from: 'Thriftonyte <onboarding@resend.dev>',
        to: 'support@thriftonyte.com',
        reply_to: email,
        subject: `[Newsletter Signup] ${email}`,
        text: `New newsletter signup:\n\nName: ${name || "Not provided"}\nEmail: ${email}\n\nTimestamp: ${new Date().toISOString()}`,
        html: `
          <h2>New Newsletter Signup</h2>
          <p><strong>Name:</strong> ${name || "Not provided"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        `,
      });

      return res.status(200).json({ success: true, message: "Subscribed!" });
    }

    // ── CONTACT / SUPPORT FORM ─────────────────────────────
    if (type === "contact") {
      await resend.emails.send({
        from: 'Thriftonyte <onboarding@resend.dev>',
        to: 'support@thriftonyte.com',
        reply_to: email,
        subject: `[Contact Form] ${subject || "Website Contact Form"}`,
        text: `New contact form submission:\n\nName: ${name || "Not provided"}\nEmail: ${email}\nSubject: ${subject || "Website Contact Form"}\n\nMessage:\n${message}\n\nTimestamp: ${new Date().toISOString()}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name || "Not provided"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "Website Contact Form"}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message?.replace(/\n/g, '<br>')}</p>
          <hr />
          <p><small>Timestamp: ${new Date().toISOString()}</small></p>
        `,
      });

      return res.status(200).json({ success: true, message: "Message received!" });
    }

    return res.status(400).json({ error: "Invalid type" });

  } catch (err) {
    console.error("API Error:", err.message);
    return res.status(500).json({ error: "Something went wrong", detail: err.message });
  }
}
