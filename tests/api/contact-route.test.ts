import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ─── Mock all external side-effects ───────────────────────────────────────────
vi.mock("@/lib/email", () => ({
  sendContactConfirmation: vi.fn().mockResolvedValue(null),
  sendAdminNotification: vi.fn().mockResolvedValue(null),
}));

vi.mock("@/lib/webhook", () => ({
  triggerCRMWebhook: vi.fn().mockResolvedValue(null),
}));

vi.mock("@/lib/db", () => ({
  insertContact: vi.fn().mockResolvedValue({ id: "mock-id-123" }),
}));

// Rate limit: allow all by default, override per-test when needed
vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn().mockReturnValue({ success: true, remaining: 4, resetAt: Date.now() + 60000 }),
}));

// ─── Valid form payload ────────────────────────────────────────────────────────
const validBody = {
  name: "Alice Johnson",
  email: "alice@example.com",
  company: "TechCorp",
  service: "workflow-automation",
  message: "We want to automate our onboarding process end to end.",
};

function makeRequest(body: unknown, method = "POST"): NextRequest {
  return new NextRequest("http://localhost/api/contact", {
    method,
    headers: { "Content-Type": "application/json", "x-forwarded-for": "1.2.3.4" },
    body: JSON.stringify(body),
  });
}

// ─── Tests ───────────────────────────────────────────────────────────────────
describe("POST /api/contact", () => {
  let POST: (req: NextRequest) => Promise<Response>;

  beforeEach(async () => {
    vi.clearAllMocks();

    // Re-apply default implementations after clearAllMocks resets call counts.
    // clearAllMocks does NOT reset mockReturnValue, so we must do it explicitly
    // to prevent implementation bleed-through between tests.
    const { rateLimit } = await import("@/lib/rate-limit");
    vi.mocked(rateLimit).mockReturnValue({ success: true, remaining: 4, resetAt: Date.now() + 60000 });

    const { sendContactConfirmation, sendAdminNotification } = await import("@/lib/email");
    vi.mocked(sendContactConfirmation).mockResolvedValue(null);
    vi.mocked(sendAdminNotification).mockResolvedValue(null);

    const { triggerCRMWebhook } = await import("@/lib/webhook");
    vi.mocked(triggerCRMWebhook).mockResolvedValue(null);

    const { insertContact } = await import("@/lib/db");
    vi.mocked(insertContact).mockResolvedValue({ id: "mock-id" });

    const mod = await import("@/app/api/contact/route");
    POST = mod.POST;
  });

  // ── Success path ────────────────────────────────────────────────────────────
  it("returns 200 with success message for valid payload", async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.message).toMatch(/business day/i);
  });

  it("returns 200 with optional fields included", async () => {
    const res = await POST(makeRequest({ ...validBody, phone: "+14155552671", budget: "5k-15k" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  // ── Validation errors ───────────────────────────────────────────────────────
  it("returns 422 for missing required fields", async () => {
    const res = await POST(makeRequest({ name: "Alice" }));
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.errors).toBeDefined();
  });

  it("returns 422 for invalid email format", async () => {
    const res = await POST(makeRequest({ ...validBody, email: "not-an-email" }));
    expect(res.status).toBe(422);
  });

  it("returns 422 for unknown service value", async () => {
    const res = await POST(makeRequest({ ...validBody, service: "fake-service" }));
    expect(res.status).toBe(422);
  });

  it("returns 422 for message shorter than 20 chars", async () => {
    const res = await POST(makeRequest({ ...validBody, message: "Too short." }));
    expect(res.status).toBe(422);
  });

  it("returns 422 for invalid phone number", async () => {
    const res = await POST(makeRequest({ ...validBody, phone: "not-a-phone" }));
    expect(res.status).toBe(422);
  });

  // ── Honeypot anti-spam ──────────────────────────────────────────────────────
  it("returns 200 silently for honeypot-filled submission (bot trap)", async () => {
    const res = await POST(makeRequest({ ...validBody, honeypot: "spam-bot-filled-this" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  // ── Rate limiting ───────────────────────────────────────────────────────────
  it("returns 429 when rate limit is exceeded", async () => {
    const { rateLimit } = await import("@/lib/rate-limit");
    vi.mocked(rateLimit).mockReturnValue({ success: false, remaining: 0, resetAt: Date.now() + 60000 });
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.message).toMatch(/too many requests/i);
  });

  it("includes rate limit headers in 429 response", async () => {
    const { rateLimit } = await import("@/lib/rate-limit");
    vi.mocked(rateLimit).mockReturnValue({ success: false, remaining: 0, resetAt: 9999999999 });
    const res = await POST(makeRequest(validBody));
    expect(res.headers.get("X-RateLimit-Limit")).toBe("5");
    expect(res.headers.get("X-RateLimit-Remaining")).toBe("0");
    expect(res.headers.get("X-RateLimit-Reset")).toBeTruthy();
  });

  // ── Bad request body ────────────────────────────────────────────────────────
  it("returns 400 for malformed JSON body", async () => {
    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "1.2.3.4" },
      body: "this is not json {{{",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
  });

  // ── Partial failure resilience ──────────────────────────────────────────────
  it("still returns 200 if email sending fails (non-critical failure)", async () => {
    const { sendContactConfirmation } = await import("@/lib/email");
    vi.mocked(sendContactConfirmation).mockRejectedValue(new Error("SMTP error"));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it("still returns 200 if CRM webhook fails (non-critical failure)", async () => {
    const { triggerCRMWebhook } = await import("@/lib/webhook");
    vi.mocked(triggerCRMWebhook).mockRejectedValue(new Error("CRM timeout"));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });
});

// ─── GET /api/contact ─────────────────────────────────────────────────────────
describe("GET /api/contact", () => {
  it("returns 405 Method Not Allowed", async () => {
    const { GET } = await import("@/app/api/contact/route");
    const req = new NextRequest("http://localhost/api/contact", { method: "GET" });
    const res = await GET();
    expect(res.status).toBe(405);
  });
});
