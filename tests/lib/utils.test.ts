import { describe, it, expect, vi } from "vitest";
import { cn, formatDate, slugify, truncate, getReadTime, absoluteUrl } from "@/lib/utils";

describe("cn (className merger)", () => {
  it("merges simple class strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("deduplicates Tailwind conflicting classes", () => {
    // tailwind-merge should keep the last conflicting class
    expect(cn("px-4", "px-8")).toBe("px-8");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("handles undefined and null gracefully", () => {
    expect(cn("a", undefined, null, "b")).toBe("a b");
  });

  it("handles arrays of classes", () => {
    expect(cn(["text-sm", "font-bold"], "p-4")).toBe("text-sm font-bold p-4");
  });

  it("returns empty string for no arguments", () => {
    expect(cn()).toBe("");
  });
});

describe("formatDate", () => {
  it("formats a date string correctly", () => {
    const result = formatDate("2025-01-15");
    expect(result).toContain("January");
    expect(result).toContain("2025");
    expect(result).toContain("15");
  });

  it("formats a Date object correctly", () => {
    const result = formatDate(new Date("2024-06-20"));
    expect(result).toContain("June");
    expect(result).toContain("2024");
  });

  it("returns a non-empty string", () => {
    expect(formatDate("2023-03-01").length).toBeGreaterThan(0);
  });
});

describe("slugify", () => {
  it("converts to lowercase", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("replaces spaces with hyphens", () => {
    expect(slugify("My Blog Post")).toBe("my-blog-post");
  });

  it("removes special characters", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("collapses multiple spaces and hyphens", () => {
    expect(slugify("hello   world")).toBe("hello-world");
  });

  it("strips leading and trailing hyphens", () => {
    expect(slugify("  -hello-  ")).toBe("hello");
  });

  it("handles already-slugified input", () => {
    expect(slugify("already-slugified")).toBe("already-slugified");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("handles numbers in slug", () => {
    expect(slugify("Top 10 AI Tools 2025")).toBe("top-10-ai-tools-2025");
  });
});

describe("truncate", () => {
  it("returns the original string if it fits within length", () => {
    expect(truncate("Short", 10)).toBe("Short");
  });

  it("truncates and appends ellipsis when string is too long", () => {
    const result = truncate("Hello World", 5);
    expect(result).toContain("...");
    expect(result.length).toBeLessThanOrEqual(8); // 5 chars + "..."
  });

  it("returns exactly the string when length equals string length", () => {
    expect(truncate("Hello", 5)).toBe("Hello");
  });

  it("trims whitespace before appending ellipsis", () => {
    const result = truncate("Hello World ", 6);
    expect(result.endsWith("...")).toBe(true);
    expect(result).not.toMatch(/\s\.\.\./); // no trailing space before ellipsis
  });

  it("handles empty string", () => {
    expect(truncate("", 10)).toBe("");
  });
});

describe("getReadTime", () => {
  it("returns at least 1 minute for very short content", () => {
    expect(getReadTime("Hello World")).toBe(1);
  });

  it("calculates read time based on 200 words per minute", () => {
    const twoHundredWords = Array(200).fill("word").join(" ");
    expect(getReadTime(twoHundredWords)).toBe(1);
  });

  it("rounds up to the next minute", () => {
    const twoHundredOneWords = Array(201).fill("word").join(" ");
    expect(getReadTime(twoHundredOneWords)).toBe(2);
  });

  it("handles empty string", () => {
    // split on whitespace gives [""] for empty — ceil(1/200) = 1
    expect(getReadTime("")).toBeGreaterThanOrEqual(1);
  });

  it("handles a realistic 800-word article", () => {
    const content = Array(800).fill("word").join(" ");
    expect(getReadTime(content)).toBe(4);
  });
});

describe("absoluteUrl", () => {
  it("uses NEXT_PUBLIC_SITE_URL env var when set", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com");
    expect(absoluteUrl("/about")).toBe("https://example.com/about");
    vi.unstubAllEnvs();
  });

  it("falls back to mindwaveai.co when env not set", () => {
    vi.unstubAllEnvs();
    expect(absoluteUrl("/contact")).toBe("https://mindwaveai.co/contact");
  });

  it("handles root path", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://mindwaveai.co");
    expect(absoluteUrl("/")).toBe("https://mindwaveai.co/");
    vi.unstubAllEnvs();
  });
});
