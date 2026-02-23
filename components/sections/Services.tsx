"use client";

import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    id: "workflow",
    icon: "⚡",
    title: "Workflow Automation",
    description:
      "Map, optimize, and automate your most critical business processes. From approvals to data sync — if it's repetitive, we eliminate it.",
    features: ["Multi-step automation builders", "Cross-platform triggers", "Conditional logic & branching", "Error monitoring & alerts"],
    href: "/services#workflow",
    featured: false,
  },
  {
    id: "chatbots",
    icon: "🤖",
    title: "AI Chatbots & Assistants",
    description:
      "Deploy intelligent AI agents that handle customer inquiries, qualify leads, book meetings, and escalate to humans — all on autopilot.",
    features: ["GPT-4 powered conversations", "CRM-connected context", "Multi-channel deployment", "Live handoff protocols"],
    href: "/services#chatbots",
    featured: true,
  },
  {
    id: "data",
    icon: "📊",
    title: "Data Pipeline Automation",
    description:
      "Unify your data sources into clean, structured pipelines. Get real-time dashboards and automated reports without the manual work.",
    features: ["ETL pipeline design", "Real-time data sync", "Automated reporting", "Custom dashboards"],
    href: "/services#data",
    featured: false,
  },
  {
    id: "crm",
    icon: "🎯",
    title: "CRM & Sales Automation",
    description:
      "Turn your CRM into a revenue engine. Auto-qualify leads, trigger personalized outreach, and notify reps exactly when to act.",
    features: ["Lead scoring & routing", "Sequence automation", "Pipeline stage triggers", "Activity tracking"],
    href: "/services#crm",
    featured: false,
  },
  {
    id: "marketing",
    icon: "📈",
    title: "Marketing Automation",
    description:
      "Build intelligent nurture sequences, dynamic audience segments, and cross-channel campaigns that adapt to prospect behavior in real time.",
    features: ["Behavioral triggers", "Email & SMS sequences", "Segment personalization", "Attribution tracking"],
    href: "/services#marketing",
    featured: false,
  },
  {
    id: "custom",
    icon: "🔧",
    title: "Custom AI Development",
    description:
      "Need something that doesn't exist off the shelf? We architect and build fully custom AI systems tailored to your unique business logic.",
    features: ["Custom LLM integrations", "Fine-tuning & RAG", "API development", "End-to-end deployment"],
    href: "/services#custom",
    featured: false,
  },
];

export function Services() {
  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <SectionLabel className="justify-center mb-5">What We Build</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F172A] mb-5 tracking-tight">
            AI-powered solutions for every
            <br />
            <span className="text-gradient">operational challenge</span>
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto leading-relaxed">
            From your first automation to a fully connected AI-powered operation — we build the systems that make it possible.
          </p>
        </FadeIn>

        <StaggerChildren
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          staggerDelay={0.08}
        >
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <Link href={service.href} className="block h-full group">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`relative h-full bg-white border rounded-2xl p-6 transition-all duration-300 ${
                    service.featured
                      ? "border-[#2563eb] shadow-blue"
                      : "border-[#E2E8F0] hover:border-[#2563eb]/30 hover:shadow-card-hover"
                  }`}
                >
                  {service.featured && (
                    <div className="absolute -top-3 left-6 bg-[#2563eb] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="text-[18px] font-bold text-[#0F172A] mb-2.5 group-hover:text-[#2563eb] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#64748b] text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[#475569]">
                        <div className="w-4 h-4 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center flex-shrink-0">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-1.5 text-[#2563eb] text-sm font-semibold mt-auto">
                    Learn more
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn className="text-center mt-12" delay={0.2}>
          <Button href="/services" variant="secondary" size="lg" icon={<ArrowRight size={18} />}>
            View All Services
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
