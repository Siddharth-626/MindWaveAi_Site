import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { CTA } from "@/components/sections/CTA";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies — Real Results from Real Clients",
  description:
    "See how MindWaveAI has helped businesses save thousands of hours, reduce costs, and generate measurable ROI through custom AI automation systems.",
};

const caseStudies = [
  {
    slug: "reachpoint-crm-automation",
    client: "ReachPoint Agency",
    industry: "Marketing Agency",
    title: "32 hours saved per week with end-to-end CRM and project management automation",
    excerpt:
      "A 12-person marketing agency was drowning in manual admin work. We automated their entire client onboarding, project staging, and billing workflow.",
    results: [
      { metric: "32 hrs", description: "saved per week" },
      { metric: "4×", description: "faster lead response" },
      { metric: "$84K", description: "annual savings" },
    ],
    services: ["Workflow Automation", "CRM Integration"],
    accentColor: "#2563eb",
    bgColor: "#EFF6FF",
    featured: true,
  },
  {
    slug: "nexus-ecommerce-pipeline",
    client: "Nexus Commerce",
    industry: "E-Commerce · $2M ARR",
    title: "Automated order fulfillment that cut errors by 94% and scaled to 5x volume",
    excerpt:
      "Manual order routing across three platforms was causing costly errors and customer churn. We built a fully automated fulfillment pipeline.",
    results: [
      { metric: "94%", description: "fewer errors" },
      { metric: "5×", description: "volume capacity" },
      { metric: "ROI in 22d", description: "from go-live" },
    ],
    services: ["Data Pipeline", "Workflow Automation"],
    accentColor: "#16A34A",
    bgColor: "#F0FDF4",
    featured: false,
  },
  {
    slug: "clearpath-ai-chatbot",
    client: "ClearPath Financial",
    industry: "Financial Services",
    title: "AI chatbot handling 78% of all inbound inquiries without human involvement",
    excerpt:
      "Support team was spending 5+ hours daily on repetitive FAQs. We deployed an AI assistant that handles routine queries automatically.",
    results: [
      { metric: "78%", description: "automated resolution" },
      { metric: "2.4 min", description: "avg response time" },
      { metric: "3.2×", description: "team capacity" },
    ],
    services: ["AI Chatbots", "CRM Integration"],
    accentColor: "#EA580C",
    bgColor: "#FFF7ED",
    featured: false,
  },
  {
    slug: "meridian-consulting-ops",
    client: "Meridian Consulting",
    industry: "Management Consulting",
    title: "Complete operations automation: from proposal to invoicing without manual steps",
    excerpt:
      "A 25-person consulting firm's ops team was spending more time on admin than billable work. We rebuilt their entire back-office from scratch.",
    results: [
      { metric: "18 hrs", description: "saved weekly" },
      { metric: "11", description: "workflows automated" },
      { metric: "31 days", description: "to full deployment" },
    ],
    services: ["Workflow Automation", "Data Pipeline"],
    accentColor: "#7C3AED",
    bgColor: "#F5F3FF",
    featured: false,
  },
  {
    slug: "bloom-marketing-automation",
    client: "Bloom Media Group",
    industry: "Digital Marketing",
    title: "Behavioral email system that increased qualified pipeline by 340% in 60 days",
    excerpt:
      "Their email marketing was batch-and-blast with no personalization. We rebuilt their nurture system on behavioral triggers and dynamic segmentation.",
    results: [
      { metric: "340%", description: "more qualified pipeline" },
      { metric: "68%", description: "email open rate increase" },
      { metric: "$280K", description: "attributed new ARR" },
    ],
    services: ["Marketing Automation", "CRM Integration"],
    accentColor: "#0891B2",
    bgColor: "#ECFEFF",
    featured: false,
  },
  {
    slug: "vantage-hr-automation",
    client: "Vantage HR Solutions",
    industry: "HR Technology",
    title: "Automated employee onboarding that reduced time-to-productivity by 60%",
    excerpt:
      "New hire onboarding took 3 days of manual setup per person. We automated the entire process — from contract signing to equipment provisioning.",
    results: [
      { metric: "60%", description: "faster onboarding" },
      { metric: "8 hrs", description: "saved per hire" },
      { metric: "Zero", description: "onboarding errors" },
    ],
    services: ["Workflow Automation", "Custom AI"],
    accentColor: "#BE185D",
    bgColor: "#FDF2F8",
    featured: false,
  },
];

export default function CaseStudiesPage() {
  const featuredStudy = caseStudies.find((s) => s.featured);
  const regularStudies = caseStudies.filter((s) => !s.featured);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#F8FAFC] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <SectionLabel className="justify-center mb-5">Proven Results</SectionLabel>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#0F172A] mb-6 tracking-tight">
              Real businesses.
              <br />
              <span className="text-gradient">Measurable outcomes.</span>
            </h1>
            <p className="text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
              Every engagement we take on is results-driven. Here&apos;s what happens when businesses stop managing manual work and start running intelligent systems.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured study */}
      {featuredStudy && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <Link href={`/case-studies/${featuredStudy.slug}`} className="block group">
                <div className="bg-[#0F172A] rounded-3xl p-8 lg:p-12 relative overflow-hidden hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-shadow duration-300">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2563eb] opacity-10 rounded-full blur-3xl" />
                  <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                      <Badge variant="dark" className="mb-5 border border-[#334155]">
                        Featured Case Study
                      </Badge>
                      <div className="text-sm text-[#64748b] mb-3 font-medium">
                        {featuredStudy.client} · {featuredStudy.industry}
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-snug group-hover:text-[#60a5fa] transition-colors">
                        {featuredStudy.title}
                      </h2>
                      <p className="text-[#94A3B8] leading-relaxed mb-6">{featuredStudy.excerpt}</p>
                      <div className="flex items-center gap-2 text-[#60a5fa] font-semibold">
                        Read full case study <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {featuredStudy.results.map((result) => (
                        <div
                          key={result.metric}
                          className="bg-[#1e293b] border border-[#334155] rounded-2xl p-5 text-center"
                        >
                          <div className="text-3xl font-bold text-[#2563eb] mb-1">{result.metric}</div>
                          <div className="text-xs text-[#64748b] leading-snug">{result.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Regular studies grid */}
      <section className="py-12 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.1}>
            {regularStudies.map((study) => (
              <StaggerItem key={study.slug}>
                <Link href={`/case-studies/${study.slug}`} className="block h-full group">
                  <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden h-full hover:border-[#2563eb]/30 hover:shadow-card-hover transition-all duration-300">
                    <div className="h-1.5" style={{ background: study.accentColor }} />
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="outline" size="sm">{study.industry}</Badge>
                      </div>
                      <h3 className="text-[16px] font-bold text-[#0F172A] mb-3 leading-snug group-hover:text-[#2563eb] transition-colors">
                        {study.title}
                      </h3>
                      <p className="text-sm text-[#64748b] leading-relaxed mb-5">{study.excerpt}</p>

                      <div className="grid grid-cols-3 gap-2 p-3 rounded-xl mb-4" style={{ background: study.bgColor }}>
                        {study.results.map((result) => (
                          <div key={result.metric} className="text-center">
                            <div className="text-sm font-bold mb-0.5" style={{ color: study.accentColor }}>
                              {result.metric}
                            </div>
                            <div className="text-[10px] text-[#64748b] leading-tight">{result.description}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {study.services.map((s) => (
                          <Badge key={s} variant="subtle" size="sm">{s}</Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 text-[#2563eb] text-sm font-semibold">
                        Read case study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <CTA />
    </>
  );
}
