import { describe, it, expect } from "vitest";
import { contactSchema, newsletterSchema } from "@/lib/validations";

// ─── Valid base payload ───────────────────────────────────────────────────────
const validPayload = {
  name: "Jane Smith",
  email: "jane@example.com",
  company: "Acme Corp",
  service: "workflow-automation" as const,
  message: "We need help automating our invoice workflow end to end.",
};

describe("contactSchema", () => {
  // ── Happy path ────────────────────────────────────────────────────────────
  it("accepts a fully valid submission", () => {
    const result = contactSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("accepts optional phone and budget when provided", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      phone: "+1 (555) 123-4567",
      budget: "5k-15k",
    });
    expect(result.success).toBe(true);
  });

  it("accepts all valid service values", () => {
    const services = [
      "workflow-automation",
      "ai-chatbots",
      "data-pipeline",
      "crm-integration",
      "marketing-automation",
      "custom-ai",
      "other",
    ] as const;
    for (const service of services) {
      const result = contactSchema.safeParse({ ...validPayload, service });
      expect(result.success, `service '${service}' should be valid`).toBe(true);
    }
  });

  it("accepts all valid budget values", () => {
    const budgets = ["under-5k", "5k-15k", "15k-50k", "50k-plus", "not-sure"] as const;
    for (const budget of budgets) {
      const result = contactSchema.safeParse({ ...validPayload, budget });
      expect(result.success, `budget '${budget}' should be valid`).toBe(true);
    }
  });

  it("accepts empty honeypot (correct bot-free case)", () => {
    const result = contactSchema.safeParse({ ...validPayload, honeypot: "" });
    expect(result.success).toBe(true);
  });

  // ── Name validation ───────────────────────────────────────────────────────
  it("rejects name shorter than 2 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "J" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toBeDefined();
    }
  });

  it("rejects name longer than 100 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "A".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("rejects name with digits or special characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "Jane123!" });
    expect(result.success).toBe(false);
  });

  it("accepts hyphenated and apostrophe names", () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "Mary-Jane O'Brien" });
    expect(result.success).toBe(true);
  });

  // ── Email validation ──────────────────────────────────────────────────────
  it("rejects malformed email", () => {
    const result = contactSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it("rejects email exceeding 254 characters", () => {
    const longEmail = "a".repeat(245) + "@example.com";
    const result = contactSchema.safeParse({ ...validPayload, email: longEmail });
    expect(result.success).toBe(false);
  });

  it("accepts subdomains in email", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      email: "user@mail.company.co.uk",
    });
    expect(result.success).toBe(true);
  });

  // ── Company validation ────────────────────────────────────────────────────
  it("rejects company shorter than 2 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, company: "A" });
    expect(result.success).toBe(false);
  });

  it("rejects company longer than 150 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, company: "X".repeat(151) });
    expect(result.success).toBe(false);
  });

  // ── Phone validation ──────────────────────────────────────────────────────
  it("rejects invalid phone format", () => {
    const result = contactSchema.safeParse({ ...validPayload, phone: "not-a-phone" });
    expect(result.success).toBe(false);
  });

  it("accepts phone omitted entirely (optional)", () => {
    const { phone: _omit, ...payload } = { ...validPayload, phone: undefined };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("accepts international phone format", () => {
    const result = contactSchema.safeParse({ ...validPayload, phone: "+14155552671" });
    expect(result.success).toBe(true);
  });

  // ── Service validation ────────────────────────────────────────────────────
  it("rejects unknown service value", () => {
    const result = contactSchema.safeParse({ ...validPayload, service: "nonexistent-service" });
    expect(result.success).toBe(false);
  });

  it("rejects missing service", () => {
    const { service: _omit, ...payload } = validPayload as Partial<typeof validPayload>;
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  // ── Message validation ────────────────────────────────────────────────────
  it("rejects message shorter than 20 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, message: "Too short." });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.message).toBeDefined();
    }
  });

  it("rejects message longer than 2000 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, message: "A".repeat(2001) });
    expect(result.success).toBe(false);
  });

  it("accepts message exactly at boundaries (20 and 2000 chars)", () => {
    const min = contactSchema.safeParse({ ...validPayload, message: "A".repeat(20) });
    const max = contactSchema.safeParse({ ...validPayload, message: "A".repeat(2000) });
    expect(min.success).toBe(true);
    expect(max.success).toBe(true);
  });

  // ── Honeypot anti-spam ────────────────────────────────────────────────────
  it("accepts when honeypot field is filled (bot detection handled at route level)", () => {
    // Schema allows any string — the route silently returns 200 for filled honeypot
    const result = contactSchema.safeParse({ ...validPayload, honeypot: "spam" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.honeypot).toBe("spam");
    }
  });

  // ── Missing required fields ───────────────────────────────────────────────
  it("rejects completely empty payload", () => {
    const result = contactSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("rejects payload missing message field", () => {
    const { message: _omit, ...payload } = validPayload as Partial<typeof validPayload>;
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});

// ─── Newsletter schema ────────────────────────────────────────────────────────
describe("newsletterSchema", () => {
  it("accepts valid email", () => {
    const result = newsletterSchema.safeParse({ email: "user@example.com" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = newsletterSchema.safeParse({ email: "bad-email" });
    expect(result.success).toBe(false);
  });

  it("rejects missing email", () => {
    const result = newsletterSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("rejects empty string email", () => {
    const result = newsletterSchema.safeParse({ email: "" });
    expect(result.success).toBe(false);
  });
});
