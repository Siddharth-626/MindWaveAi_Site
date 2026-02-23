"use client";

import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const caseStudies = [
  {
    slug: "reachpoint-crm-automation",
    client: "ReachPoint Agency",
    industry: "Marketing Agency",
    title: "How a 12-person agency eliminated 32 hours of weekly admin work",
    challenge:
      "Their team was manually moving leads between tools, sending follow-ups, and updating project stages — consuming nearly a full FTE every week.",
    results: [
      { metric: "32 hrs", description: "saved per week" },
      { metric: "4×", description: "faster lead response" },
      { metric: "$84K", description: "saved in annual labor costs" },
    ],
    services: ["Workflow Automation", "CRM Integration"],
    color: "#EFF6FF",
    accent: "#2563eb",
  },
  {
    slug: "nexus-ecommerce-pipeline",
    client: "Nexus Commerce",
    industry: "E-Commerce · $2M ARR",
    title: "Fully automated order processing that cut fulfillment errors by 94%",
    challenge:
      "Manual order routing across 3 platforms caused fulfillment errors, customer complaints, and refund costs that were quietly destroying their margins.",
    results: [
      { metric: "94%", description: "fewer fulfillment errors" },
      { metric: "18 hrs", description: "saved weekly on operations" },
      { metric: "ROI in 22 days", description: "from go-live" },
    ],
    services: ["Data Pipeline", "Workflow Automation"],
    color: "#F0FDF4",
    accent: "#16A34A",
  },
  {
    slug: "clearpath-ai-chatbot",
    client: "ClearPath Financial",
    industry: "Financial Services",
    title: "AI chatbot that handles 78% of inbound inquiries without human input",
    challenge:
      "Support team was overwhelmed with repetitive FAQs and intake forms, spending 5+ hours daily on work that never required a human touch.",
    results: [
      { metric: "78%", description: "of inquiries automated" },
      { metric: "2.4 min", description: "avg response time (from 4hrs)" },
      { metric: "3.2×", description: "team capacity increase" },
    ],
    services: ["AI Chatbots", "CRM Integration"],
    color: "#FFF7ED",
    accent: "#EA580C",
  },
];

export function CaseStudies() {
  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel className="mb-5">Real Results</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F172A] tracking-tight">
              Automation that pays
              <br />
              <span className="text-gradient">for itself fast</span>
            </h2>
          </div>
          <Button href="/case-studies" variant="outline" size="md" icon={<ArrowRight size={16} />}>
            All Case Studies
          </Button>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 lg:grid-cols-3 gap-5" staggerDelay={0.12}>
          {caseStudies.map((study) => (
            <StaggerItem key={study.slug}>
              <Link href={`/case-studies/${study.slug}`} className="block h-full group">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden h-full hover:border-[#2563eb]/30 hover:shadow-card-hover transition-all duration-300"
                >
                  {/* Top color band */}
                  <div
                    className="h-1.5 w-full"
                    style={{ background: study.accent }}
                  />

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline" size="sm">{study.industry}</Badge>
                    </div>

                    <h3 className="text-[17px] font-bold text-[#0F172A] mb-3 leading-snug group-hover:text-[#2563eb] transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-sm text-[#64748b] leading-relaxed mb-5">
                      {study.challenge}
                    </p>

                    {/* Results */}
                    <div className="grid grid-cols-3 gap-3 p-4 rounded-xl mb-5" style={{ background: study.color }}>
                      {study.results.map((result) => (
                        <div key={result.metric} className="text-center">
                          <div
                            className="text-lg font-bold mb-0.5"
                            style={{ color: study.accent }}
                          >
                            {result.metric}
                          </div>
                          <div className="text-[10px] text-[#64748b] leading-tight font-medium">
                            {result.description}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {study.services.map((service) => (
                        <Badge key={service} variant="subtle" size="sm">
                          {service}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-[#2563eb] text-sm font-semibold">
                      Read case study
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
