import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { CTA } from "@/components/sections/CTA";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — AI Automation Insights & Guides",
  description:
    "Practical guides, case studies, and insights on AI automation, workflow optimization, and building scalable business systems.",
};

// Static blog data — in production this would come from Supabase/CMS
const blogPosts = [
  {
    slug: "workflow-automation-roi-calculator",
    title: "How to Calculate the Real ROI of Workflow Automation (With a Free Template)",
    excerpt:
      "Most business owners have no idea how much their manual work is actually costing them. Here's a framework to calculate your automation ROI before you spend a dollar.",
    category: "Strategy",
    author: "Alex Morgan",
    publishedAt: "2025-01-15",
    readTime: 8,
    featured: true,
  },
  {
    slug: "ai-chatbot-lead-qualification",
    title: "How We Built an AI Chatbot That Qualifies Leads Better Than a Human SDR",
    excerpt:
      "A behind-the-scenes look at how we architected a lead qualification AI that handles 78% of inbound conversations without human input.",
    category: "AI Chatbots",
    author: "Jordan Kim",
    publishedAt: "2025-01-08",
    readTime: 11,
    featured: false,
  },
  {
    slug: "zapier-vs-make-vs-n8n",
    title: "Zapier vs. Make vs. N8N: Which Automation Platform Is Right for Your Business?",
    excerpt:
      "We've built hundreds of workflows across all three platforms. Here's an honest comparison to help you choose — without the marketing fluff.",
    category: "Tools & Platforms",
    author: "Priya Sharma",
    publishedAt: "2024-12-22",
    readTime: 14,
    featured: false,
  },
  {
    slug: "crm-automation-guide",
    title: "The Complete CRM Automation Guide for Growing Sales Teams",
    excerpt:
      "A step-by-step playbook for automating lead routing, follow-up sequences, pipeline management, and reporting in your CRM.",
    category: "CRM & Sales",
    author: "Alex Morgan",
    publishedAt: "2024-12-10",
    readTime: 16,
    featured: false,
  },
  {
    slug: "ai-systems-ecommerce",
    title: "5 AI Automation Wins Every E-Commerce Business Should Implement in 2025",
    excerpt:
      "From order processing to customer recovery campaigns — these five automation systems will transform your e-commerce operations.",
    category: "E-Commerce",
    author: "Carlos Mendes",
    publishedAt: "2024-11-28",
    readTime: 9,
    featured: false,
  },
  {
    slug: "llm-integration-production",
    title: "What We Learned Deploying 20+ LLM Systems in Production",
    excerpt:
      "The real lessons from building AI systems that actually work in production: latency, cost, hallucination handling, and error recovery.",
    category: "Engineering",
    author: "Jordan Kim",
    publishedAt: "2024-11-14",
    readTime: 18,
    featured: false,
  },
];

const categories = ["All", "Strategy", "AI Chatbots", "Tools & Platforms", "CRM & Sales", "E-Commerce", "Engineering"];

const categoryColors: Record<string, string> = {
  Strategy: "#EFF6FF",
  "AI Chatbots": "#F0FDF4",
  "Tools & Platforms": "#FFF7ED",
  "CRM & Sales": "#FDF4FF",
  "E-Commerce": "#ECFEFF",
  Engineering: "#F0F9FF",
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(dateString));
}

export default function BlogPage() {
  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = blogPosts.filter((p) => !p.featured);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#F8FAFC] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <SectionLabel className="justify-center mb-5">The MindWaveAI Blog</SectionLabel>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">
              AI automation, without the{" "}
              <span className="text-gradient">hype</span>
            </h1>
            <p className="text-[#475569] text-lg max-w-xl mx-auto">
              Practical guides, engineering deep-dives, and honest insights from a team that builds automation systems every day.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured post */}
      {featuredPost && (
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <Link href={`/blog/${featuredPost.slug}`} className="block group">
                <div className="bg-[#0F172A] rounded-3xl p-8 lg:p-12 relative overflow-hidden hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-shadow">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2563eb] opacity-10 rounded-full blur-3xl" />
                  <div className="relative max-w-3xl">
                    <div className="flex items-center gap-3 mb-5">
                      <Badge variant="blue">Featured Post</Badge>
                      <Badge variant="dark" className="border border-[#334155]">{featuredPost.category}</Badge>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-snug group-hover:text-[#60a5fa] transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-[#94A3B8] mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-[#64748b]">
                      <span>{featuredPost.author}</span>
                      <span>·</span>
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock size={13} /> {featuredPost.readTime} min read</span>
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-8 flex items-center gap-1.5 text-[#60a5fa] font-semibold text-sm">
                    Read article <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Blog grid */}
      <section className="py-12 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
            {regularPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="block h-full group">
                  <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden h-full hover:border-[#2563eb]/30 hover:shadow-card-hover transition-all duration-300">
                    {/* Category color strip */}
                    <div
                      className="h-1.5"
                      style={{ background: categoryColors[post.category] ? Object.values(categoryColors)[0] : "#E2E8F0" }}
                    />
                    <div
                      className="h-28 flex items-center justify-center text-4xl"
                      style={{ background: categoryColors[post.category] || "#F8FAFC" }}
                    >
                      {post.category === "Strategy" && "📊"}
                      {post.category === "AI Chatbots" && "🤖"}
                      {post.category === "Tools & Platforms" && "⚙️"}
                      {post.category === "CRM & Sales" && "🎯"}
                      {post.category === "E-Commerce" && "🛒"}
                      {post.category === "Engineering" && "🔧"}
                    </div>
                    <div className="p-6">
                      <Badge variant="subtle" size="sm" className="mb-3">{post.category}</Badge>
                      <h3 className="font-bold text-[#0F172A] text-[16px] leading-snug mb-3 group-hover:text-[#2563eb] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[#64748b] leading-relaxed mb-5">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-[#94A3B8] border-t border-[#F1F5F9] pt-4">
                        <span>{post.author}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {post.readTime} min
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <CTA
        variant="minimal"
        title="Get AI automation insights delivered to your inbox"
        subtitle="New posts every week. No spam. Unsubscribe anytime."
      />
    </>
  );
}
