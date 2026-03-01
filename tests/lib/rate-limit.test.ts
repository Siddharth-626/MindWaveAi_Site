import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

// We need to reload the module for each test to get a fresh store
// Use dynamic imports with cache busting
describe("rateLimit", () => {
  let rateLimit: (id: string) => { success: boolean; remaining: number; resetAt: number };

  beforeEach(async () => {
    vi.resetModules();
    const mod = await import("@/lib/rate-limit");
    rateLimit = mod.rateLimit;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows the first request", () => {
    const result = rateLimit("test-ip-1");
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it("counts remaining correctly across multiple requests", () => {
    const id = "test-ip-counter";
    for (let i = 4; i >= 1; i--) {
      const r = rateLimit(id);
      expect(r.success).toBe(true);
      expect(r.remaining).toBe(i);
    }
  });

  it("blocks the 6th request (exceeds max of 5)", () => {
    const id = "test-ip-block";
    for (let i = 0; i < 5; i++) rateLimit(id);
    const result = rateLimit(id);
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("continues blocking on 7th and 8th request", () => {
    const id = "test-ip-block-persist";
    for (let i = 0; i < 5; i++) rateLimit(id);
    expect(rateLimit(id).success).toBe(false);
    expect(rateLimit(id).success).toBe(false);
  });

  it("returns a resetAt timestamp in the future", () => {
    const before = Date.now();
    const result = rateLimit("test-ip-reset");
    expect(result.resetAt).toBeGreaterThan(before);
  });

  it("different identifiers are rate limited independently", () => {
    const id1 = "ip-independent-1";
    const id2 = "ip-independent-2";
    for (let i = 0; i < 5; i++) rateLimit(id1);
    expect(rateLimit(id1).success).toBe(false);
    // id2 is fresh — should still be allowed
    expect(rateLimit(id2).success).toBe(true);
  });

  it("resets after the window expires", async () => {
    vi.useFakeTimers();
    const id = "test-ip-expire";
    // Exhaust the limit
    for (let i = 0; i < 5; i++) rateLimit(id);
    expect(rateLimit(id).success).toBe(false);
    // Advance time past the 15-minute window
    vi.advanceTimersByTime(15 * 60 * 1000 + 1);
    const afterReset = rateLimit(id);
    expect(afterReset.success).toBe(true);
    expect(afterReset.remaining).toBe(4);
  });

  it("blocked response includes correct resetAt", () => {
    const id = "test-ip-reset-ts";
    // Get the resetAt from the first request
    const firstResult = rateLimit(id);
    const expectedResetAt = firstResult.resetAt;
    // Exhaust remaining
    for (let i = 0; i < 4; i++) rateLimit(id);
    const blocked = rateLimit(id);
    expect(blocked.success).toBe(false);
    expect(blocked.resetAt).toBe(expectedResetAt);
  });
});
