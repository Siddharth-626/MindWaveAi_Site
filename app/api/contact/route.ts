import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";
import { sendContactConfirmation, sendAdminNotification } from "@/lib/email";
import { triggerCRMWebhook } from "@/lib/webhook";

// Conditionally import db — skip in dev if Supabase not configured
async function tryInsertContact(data: object) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("Supabase not configured — skipping DB insert");
    return { id: "local-dev" };
  }
  const { insertContact } = await import("@/lib/db");
  return insertContact(data as Parameters<typeof insertContact>[0]);
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limit check
    const rateLimitResult = rateLimit(`contact:${ip}`);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please wait a few minutes before submitting again.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.resetAt.toString(),
          },
        }
      );
    }

    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request format" },
        { status: 400 }
      );
    }

    // Validate input
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check your submission and try again.",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const data = validationResult.data;

    // Honeypot check — if filled, silently succeed (don't alert bots)
    if (data.honeypot && data.honeypot.length > 0) {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    // Prepare contact data
    const contactData = {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      company: data.company.trim(),
      phone: data.phone?.trim(),
      service: data.service,
      budget: data.budget,
      message: data.message.trim(),
      source: "Website Contact Form",
      tags: ["Inbound - Website", `Service: ${data.service}`],
    };

    // Execute all async operations concurrently
    const [dbResult, emailResult, webhookResult] = await Promise.allSettled([
      tryInsertContact(contactData),
      sendContactConfirmation({
        name: contactData.name,
        email: contactData.email,
        service: contactData.service,
      }),
      sendAdminNotification(contactData),
      triggerCRMWebhook(contactData),
    ]);

    // Log any non-critical failures
    if (dbResult.status === "rejected") {
      console.error("DB insert failed:", dbResult.reason);
    }
    if (emailResult.status === "rejected") {
      console.error("Email send failed:", emailResult.reason);
    }
    if (webhookResult.status === "rejected") {
      console.error("CRM webhook failed:", webhookResult.reason);
    }

    // Return success even if secondary actions fail — the lead is received
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll be in touch within 1 business day.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again or email us directly.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
