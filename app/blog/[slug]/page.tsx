import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

// Static posts map — in production, fetch from Supabase
const posts: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  content: string;
}> = {
  "workflow-automation-roi-calculator": {
    title: "How to Calculate the Real ROI of Workflow Automation (With a Free Template)",
    excerpt: "Most business owners have no idea how much their manual work is actually costing them. Here's a framework to calculate your automation ROI before you spend a dollar.",
    category: "Strategy",
    author: "Alex Morgan",
    publishedAt: "2025-01-15",
    readTime: 8,
    content: `
## The hidden cost of manual work

Every business has a number they've never calculated: the total annual cost of their manual workflows.

It lives in payroll — the hours your team spends on data entry, copy-pasting, chasing approvals, and creating reports that should generate themselves. It lives in mistakes — the ones made when humans do repetitive tasks that machines should handle. And it lives in opportunity cost — the high-value work your team isn't doing because they're buried in admin.

For most SMBs, this number is between **$50,000 and $300,000 per year**. But nobody's ever added it up.

## How to calculate your automation ROI

**Step 1: Identify your highest-volume manual tasks**

List every task your team does more than 5 times per week that follows a repeatable pattern. Common examples:
- Copying data between systems
- Sending follow-up emails or messages
- Creating reports or summaries
- Updating records after events happen
- Routing incoming leads or tickets

**Step 2: Quantify the time cost**

For each task, calculate:
- How many times it's done per week
- How long it takes each time
- The fully-loaded hourly cost of the person doing it

**Example:** Your ops coordinator spends 45 minutes every morning moving new leads from a form into your CRM and Slack. That's 3.75 hours/week × 50 weeks = 187.5 hours/year. At $35/hour fully loaded: **$6,562 per year on one task**.

**Step 3: Calculate automation cost**

A workflow automation to handle that task costs roughly $1,500–$3,500 to build, with $50–$150/month in ongoing platform costs.

**Year 1 ROI:** $6,562 in savings − $3,000 build cost − $1,200 platform = **$2,362 net positive**
**Year 2+ ROI:** $6,562 − $1,200 = **$5,362 net per year**

And that's just one task.

## The multiplier effect

When you stack 5–10 automations together, you don't just save time — you change how the business operates. Teams move faster. Errors drop. Capacity increases without headcount growth.

The businesses we work with typically see:
- 20–40% reduction in operational overhead
- 3–5× faster response times on time-sensitive tasks
- 10–30% improvement in conversion rates (from faster follow-up)

## Ready to calculate your number?

Book a free AI Workflow Audit with our team. In 30 minutes, we'll calculate your exact automation opportunity and show you what's possible.
    `,
  },
  "ai-chatbot-lead-qualification": {
    title: "How We Built an AI Chatbot That Qualifies Leads Better Than a Human SDR",
    excerpt: "A behind-the-scenes look at how we architected a lead qualification AI that handles 78% of inbound conversations without human input.",
    category: "AI Chatbots",
    author: "Jordan Kim",
    publishedAt: "2025-01-08",
    readTime: 11,
    content: `
## Why most AI chatbots fail at qualification

The problem with most AI chatbots isn't the AI — it's the implementation. They're trained to answer FAQs, not to think like a salesperson. They gather data, but don't understand context. They ask questions without knowing what to do with the answers.

When ClearPath Financial came to us, their support team was spending 5+ hours daily on intake conversations that almost always led to the same three outcomes. We knew AI could handle this — but it needed to be designed for qualification, not just conversation.

## The architecture we built

**Layer 1: Intent classification**

Before the chatbot says a single word, it classifies the visitor's intent based on their behavior: which page they came from, how long they've been browsing, and what action triggered the chat. This shapes the entire conversation flow before it begins.

**Layer 2: Context retrieval**

The chatbot queries the CRM via API on every conversation start. If the visitor is already a known contact, it pulls their history, previous interactions, and current stage. The AI greets them with relevant context — not as a stranger.

**Layer 3: Dynamic qualification tree**

Rather than a fixed script, we built a qualification tree that adapts based on responses. The AI is instructed to identify:
- Company size and industry
- Current pain points
- Timeline and urgency
- Decision-making authority
- Budget range (without asking directly)

**Layer 4: Routing logic**

Based on the qualification score, the chatbot routes to one of four outcomes: book a call immediately, send relevant resources and schedule a follow-up, add to a nurture sequence, or politely disqualify.

## Results after 90 days

- 78% of inbound conversations handled without human involvement
- Average response time reduced from 4 hours to 2.4 minutes
- Qualified pipeline increased by 34% (more coverage, better routing)
- Support team redirected to complex advisory work

The key insight: an AI chatbot performs best when it's designed around your specific sales process — not a generic conversation template.
    `,
  },
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(dateString));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "MindWaveAI",
      url: "https://mindwaveai.co",
    },
    datePublished: post.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://mindwaveai.co/blog/${slug}` },
  };

  // Simple markdown to HTML (for demo — in production use remark/rehype)
  const htmlContent = post.content
    .trim()
    .split("\n")
    .map((line) => {
      if (line.startsWith("## ")) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith("**") && line.endsWith("**")) return `<strong>${line.slice(2, -2)}</strong>`;
      if (line.startsWith("- ")) return `<li>${line.slice(2)}</li>`;
      if (line.trim() === "") return "";
      return `<p>${line}</p>`;
    })
    .join("\n");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="pt-28 pb-12 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#0F172A] mb-8 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Blog
            </Link>

            <div className="flex items-center gap-2 mb-4">
              <Badge variant="blue">{post.category}</Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-5 tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748b]">
              <span className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-[#2563eb] flex items-center justify-center text-white text-xs font-bold">
                  {post.author[0]}
                </div>
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.readTime} min read
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div
              className="prose prose-slate prose-lg max-w-none
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#0F172A]
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:text-[#475569] prose-p:leading-relaxed prose-p:mb-5
                prose-li:text-[#475569]
                prose-strong:text-[#0F172A]
                prose-a:text-[#2563eb] prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </FadeIn>

          {/* Author bio */}
          <div className="mt-12 pt-10 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-4 p-6 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-2xl bg-[#2563eb] flex items-center justify-center text-white font-bold flex-shrink-0">
                {post.author[0]}
              </div>
              <div>
                <p className="font-bold text-[#0F172A]">{post.author}</p>
                <p className="text-sm text-[#64748b]">Co-Founder at MindWaveAI</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <CTA
        variant="minimal"
        title="Ready to apply these automation strategies?"
        subtitle="Book a free AI Workflow Audit and we'll show you what's possible for your business."
      />
    </>
  );
}
