import type { Metadata } from "next";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, Clock, Video, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Free AI Workflow Audit",
  description:
    "Book your free 30-minute AI Workflow Audit with MindWaveAI. We'll map your automation opportunities and deliver a custom roadmap — no commitment required.",
};

const auditIncludes = [
  { icon: Clock, label: "30-minute focused session", sub: "No time wasted on sales pitches" },
  { icon: Video, label: "Live workflow mapping", sub: "We diagram your process in real time" },
  { icon: FileText, label: "Custom automation roadmap", sub: "Delivered within 24 hours of the call" },
];

const whatToExpect = [
  "We review your current tools and workflows",
  "Identify the top 3–5 automation opportunities",
  "Calculate your potential time and cost savings",
  "Recommend the right approach and tools",
  "Deliver a written automation roadmap after the call",
];

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/mindwaveai/ai-workflow-audit";

export default function BookCallPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#F8FAFC] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <Badge variant="success" dot className="mb-6">
                Free · No commitment
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-5 tracking-tight">
                Book Your Free
                <br />
                <span className="text-gradient">AI Workflow Audit</span>
              </h1>
              <p className="text-lg text-[#475569] leading-relaxed mb-8">
                In 30 minutes, we&apos;ll map your biggest automation opportunities and show you exactly what&apos;s possible — no commitment, no pressure, just clarity.
              </p>

              <div className="space-y-4 mb-8">
                {auditIncludes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-4 p-4 bg-white border border-[#E2E8F0] rounded-xl">
                      <div className="w-10 h-10 bg-[#EFF6FF] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-[#2563eb]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F172A] text-sm">{item.label}</p>
                        <p className="text-xs text-[#64748b]">{item.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#0F172A] rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4">What happens on the call</h3>
                <ul className="space-y-2.5">
                  {whatToExpect.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#22C55E] flex-shrink-0 mt-0.5" />
                      <span className="text-[#94A3B8] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Calendly embed */}
            <FadeIn direction="right" delay={0.15}>
              <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-card">
                <div className="bg-[#0F172A] px-6 py-5">
                  <h2 className="text-white font-bold text-lg">Choose Your Time Slot</h2>
                  <p className="text-[#64748b] text-sm mt-1">All times shown in your local timezone</p>
                </div>
                <div className="p-4">
                  <iframe
                    src={`${CALENDLY_URL}?embed_domain=mindwaveai.co&embed_type=Inline&hide_event_type_details=1&hide_gdpr_banner=1&primary_color=2563eb`}
                    width="100%"
                    height="700"
                    frameBorder="0"
                    title="Book a free AI Workflow Audit with MindWaveAI"
                    style={{ border: "none", borderRadius: "12px" }}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10">
            <SectionLabel className="justify-center mb-4">FAQ</SectionLabel>
            <h2 className="text-2xl font-bold text-[#0F172A]">Common questions about the audit</h2>
          </FadeIn>
          <div className="space-y-4">
            {[
              {
                q: "Is the audit really free?",
                a: "100%. The AI Workflow Audit is a free, no-obligation session. We offer it because we believe the best way to earn a client's trust is to show value before asking for anything.",
              },
              {
                q: "Who should attend the call?",
                a: "Ideally the business owner, operations lead, or whoever manages day-to-day processes. The more context we have about your workflows, the more valuable the session will be.",
              },
              {
                q: "What do I need to prepare?",
                a: "Nothing formal is required. It helps to have a rough idea of your most time-consuming manual tasks, the tools you use daily, and any pain points you've been wanting to solve.",
              },
              {
                q: "What happens after the call?",
                a: "Within 24 hours, we'll send you a written automation roadmap with our top recommendations, tool suggestions, estimated time savings, and a proposed project scope — at no cost.",
              },
            ].map((faq) => (
              <div key={faq.q} className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
                <h3 className="font-semibold text-[#0F172A] mb-2">{faq.q}</h3>
                <p className="text-[#475569] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
