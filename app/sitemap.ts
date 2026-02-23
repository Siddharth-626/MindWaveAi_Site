import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mindwaveai.co";

const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/case-studies", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/book-call", priority: 0.95, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
] as const;

const blogPosts = [
  { slug: "workflow-automation-roi-calculator", date: "2025-01-15" },
  { slug: "ai-chatbot-lead-qualification", date: "2025-01-08" },
  { slug: "zapier-vs-make-vs-n8n", date: "2024-12-22" },
  { slug: "crm-automation-guide", date: "2024-12-10" },
  { slug: "ai-systems-ecommerce", date: "2024-11-28" },
  { slug: "llm-integration-production", date: "2024-11-14" },
];

const caseStudies = [
  { slug: "reachpoint-crm-automation" },
  { slug: "nexus-ecommerce-pipeline" },
  { slug: "clearpath-ai-chatbot" },
  { slug: "meridian-consulting-ops" },
  { slug: "bloom-marketing-automation" },
  { slug: "vantage-hr-automation" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyEntries = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries, ...caseStudyEntries];
}
