import { Resend } from "resend";

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured — emails will not be sent");
    return null;
  }
  return new Resend(apiKey);
}

const FROM_EMAIL = "MindWaveAI <noreply@mindwaveai.co>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "hello@mindwaveai.co";

export async function sendContactConfirmation(data: {
  name: string;
  email: string;
  service: string;
}) {
  const resend = getResend();
  if (!resend) return null;

  const serviceLabels: Record<string, string> = {
    "workflow-automation": "Workflow Automation",
    "ai-chatbots": "AI Chatbots & Assistants",
    "data-pipeline": "Data Pipeline Automation",
    "crm-integration": "CRM & Sales Automation",
    "marketing-automation": "Marketing Automation",
    "custom-ai": "Custom AI Development",
    other: "General Inquiry",
  };

  const { data: result, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: "We received your inquiry — MindWaveAI",
    html: `<!DOCTYPE html><html><body style="font-family:Inter,sans-serif;background:#f8fafc;padding:20px;"><div style="max-width:600px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;">
<div style="background:#0F172A;padding:32px 40px;"><span style="color:white;font-size:20px;font-weight:700;">MindWaveAI</span></div>
<div style="padding:40px;">
<h1 style="color:#0F172A;font-size:24px;margin:0 0 16px;">Thank you, ${data.name}!</h1>
<p style="color:#475569;line-height:1.7;margin:0 0 24px;">We received your inquiry about <strong>${serviceLabels[data.service] || data.service}</strong> and will be in touch within 1 business day.</p>
<a href="https://mindwaveai.co/book-call" style="display:inline-block;background:#2563eb;color:white;font-weight:600;padding:14px 28px;border-radius:10px;text-decoration:none;">Book Your Free AI Audit</a>
</div></div></body></html>`,
  });

  if (error) throw error;
  return result;
}

export async function sendAdminNotification(data: {
  name: string;
  email: string;
  company: string;
  phone?: string;
  service: string;
  budget?: string;
  message: string;
}) {
  const resend = getResend();
  if (!resend) return null;

  const { data: result, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Lead: ${data.name} from ${data.company}`,
    html: `<!DOCTYPE html><html><body style="font-family:Inter,sans-serif;background:#f8fafc;padding:20px;">
<div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;">
<div style="background:#2563eb;padding:20px 28px;"><h2 style="color:white;margin:0;">New Inbound Lead</h2><p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px;">Source: Website Contact Form</p></div>
<div style="padding:28px;">
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
<p><strong>Company:</strong> ${data.company}</p>
${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
<p><strong>Service:</strong> ${data.service}</p>
${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ""}
<p><strong>Message:</strong> ${data.message}</p>
<div style="margin-top:20px;padding:14px;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;">
<p style="color:#166534;font-size:14px;margin:0;font-weight:600;">Tag: Inbound - Website | Status: New Lead</p>
</div>
</div></div></body></html>`,
  });

  if (error) throw error;
  return result;
}
