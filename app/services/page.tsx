import type { Metadata } from "next";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CTA } from "@/components/sections/CTA";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Services — AI Automation Solutions",
  description:
    "Explore MindWaveAI's full range of AI automation services: workflow automation, AI chatbots, data pipelines, CRM integration, and custom AI development.",
};

const services = [
  {
    id: "workflow",
    icon: "⚡",
    title: "Workflow Automation",
    tagline: "Eliminate manual work at every stage of your operation",
    description:
      "We design and implement end-to-end automation workflows that connect your tools, trigger actions based on business events, and execute tasks without human intervention. Whether it's approvals, data sync, notifications, or multi-step processes — we replace manual work with precision systems.",
    features: [
      "Process mapping and automation opportunity audit",
      "Multi-step workflow design with conditional logic",
      "Cross-platform triggers and webhooks",
      "Zapier, Make, and custom API integrations",
      "Real-time monitoring and error alerting",
      "Performance analytics and reporting",
    ],
    useCases: ["Invoice and contract approval flows", "Onboarding and offboarding automation", "Cross-tool data synchronization", "Scheduled task execution"],
    pricing: "From $3,500",
  },
  {
    id: "chatbots",
    icon: "🤖",
    title: "AI Chatbots & Assistants",
    tagline: "Handle customer conversations 24/7 without a support team",
    description:
      "We build intelligent AI agents powered by GPT-4 that understand your business context, connect to your CRM, and handle conversations with precision. From lead qualification to customer support, your AI assistant works around the clock — escalating to humans only when genuinely necessary.",
    features: [
      "GPT-4 powered natural language processing",
      "CRM-connected context and memory",
      "Multi-channel deployment (web, WhatsApp, SMS, Slack)",
      "Lead qualification and meeting booking",
      "Human handoff protocols",
      "Conversation analytics and optimization",
    ],
    useCases: ["24/7 customer support automation", "Lead capture and qualification", "Internal team assistant", "FAQ and knowledge base queries"],
    pricing: "From $4,500",
  },
  {
    id: "data",
    icon: "📊",
    title: "Data Pipeline Automation",
    tagline: "Clean, connected data across every system you use",
    description:
      "We build automated data pipelines that extract data from your sources, transform it into structured formats, and load it into your destination systems. The result: real-time dashboards, automated reports, and a single source of truth — without manual spreadsheet work.",
    features: [
      "ETL pipeline design and implementation",
      "Real-time and scheduled data sync",
      "Data cleaning and transformation rules",
      "Custom dashboard development",
      "Automated PDF/Excel report generation",
      "Database schema optimization",
    ],
    useCases: ["Sales and revenue reporting", "Marketing attribution data", "Operational KPI dashboards", "Client reporting automation"],
    pricing: "From $5,000",
  },
  {
    id: "crm",
    icon: "🎯",
    title: "CRM & Sales Automation",
    tagline: "Turn your CRM into a revenue-generating machine",
    description:
      "We connect your CRM to every touchpoint in your sales process — from lead capture to closed-won. Leads are automatically scored, routed, and nurtured. Sales reps get real-time signals. Nothing falls through the cracks.",
    features: [
      "Lead scoring and automatic routing",
      "Multi-touch email and SMS sequences",
      "Deal stage automation and pipeline management",
      "Activity logging and task creation",
      "Sales rep notification and alerting",
      "Integration with HubSpot, Salesforce, Pipedrive, and more",
    ],
    useCases: ["Inbound lead follow-up automation", "Sales pipeline management", "Customer lifecycle tracking", "Revenue forecasting feeds"],
    pricing: "From $3,000",
  },
  {
    id: "marketing",
    icon: "📈",
    title: "Marketing Automation",
    tagline: "Intelligent nurture sequences that close deals while you sleep",
    description:
      "We build behavioral-triggered marketing systems that send the right message at the right time — based on what your prospects actually do. Segment dynamically, personalize deeply, and track attribution across every channel.",
    features: [
      "Behavioral trigger-based sequences",
      "Dynamic audience segmentation",
      "Email, SMS, and ad automation",
      "A/B testing infrastructure",
      "Multi-touch attribution tracking",
      "Integration with all major marketing platforms",
    ],
    useCases: ["Lead nurture email sequences", "Abandoned cart recovery", "Re-engagement campaigns", "Webinar and event automation"],
    pricing: "From $2,500",
  },
  {
    id: "custom",
    icon: "🔧",
    title: "Custom AI Development",
    tagline: "Fully bespoke AI systems built around your business logic",
    description:
      "For complex requirements that off-the-shelf tools can't solve, we architect and build fully custom AI systems. From RAG-powered internal knowledge bases to fine-tuned models trained on your data — we engineer the solution from the ground up.",
    features: [
      "Custom LLM application development",
      "Retrieval Augmented Generation (RAG) systems",
      "Model fine-tuning on proprietary data",
      "Custom API and backend development",
      "AI system architecture consulting",
      "Ongoing maintenance and model updates",
    ],
    useCases: ["Internal AI knowledge assistants", "Document intelligence systems", "Predictive analytics tools", "Custom recommendation engines"],
    pricing: "From $8,000",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#F8FAFC] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <SectionLabel className="justify-center mb-5">What We Build</SectionLabel>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#0F172A] mb-6 tracking-tight">
              AI automation for every
              <br />
              <span className="text-gradient">business challenge</span>
            </h1>
            <p className="text-lg text-[#475569] max-w-2xl mx-auto mb-10 leading-relaxed">
              From replacing manual workflows to building fully custom AI systems — we deliver production-ready automation that works from day one.
            </p>
            <Button href="/book-call" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
              Get a Free Automation Audit
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Services detail */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={service.id} id={service.id}>
              <FadeIn>
                <div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <SectionLabel className="mb-3">Service 0{index + 1}</SectionLabel>
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-[#2563eb] font-medium text-lg mb-5">
                      {service.tagline}
                    </p>
                    <p className="text-[#475569] leading-relaxed mb-8">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between mb-5">
                      <span className="text-sm font-semibold text-[#475569] uppercase tracking-wider">
                        Starting Price
                      </span>
                      <span className="text-xl font-bold text-[#0F172A]">{service.pricing}</span>
                    </div>

                    <Button href="/book-call" variant="primary" size="md" icon={<ArrowRight size={16} />}>
                      Discuss This Service
                    </Button>
                  </div>

                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-7">
                      <h3 className="font-semibold text-[#0F172A] mb-4 text-[15px]">
                        What&apos;s included
                      </h3>
                      <ul className="space-y-3 mb-7">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <CheckCircle2 size={17} className="text-[#2563eb] flex-shrink-0 mt-0.5" />
                            <span className="text-[#475569] text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="border-t border-[#E2E8F0] pt-5">
                        <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">
                          Common Use Cases
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.useCases.map((useCase) => (
                            <Badge key={useCase} variant="subtle" size="sm">
                              {useCase}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
