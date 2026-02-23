type RateLimitStore = Map<string, { count: number; resetAt: number }>;

const store: RateLimitStore = new Map();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

export function rateLimit(identifier: string): {
  success: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const record = store.get(identifier);

  if (!record || now > record.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { success: true, remaining: MAX_REQUESTS - 1, resetAt: now + WINDOW_MS };
  }

  if (record.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count++;
  store.set(identifier, record);

  return {
    success: true,
    remaining: MAX_REQUESTS - record.count,
    resetAt: record.resetAt,
  };
}

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of store.entries()) {
    if (now > value.resetAt) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);
