"use client";

import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Free AI Workflow Audit",
    description:
      "We start with a 30-minute deep-dive into your current operations. We map every manual process, identify automation opportunities, and calculate your potential ROI before we write a single line of code.",
    duration: "Week 1",
    deliverable: "Custom automation roadmap",
  },
  {
    number: "02",
    title: "Architecture & Design",
    description:
      "Our engineers design your automation architecture — selecting the right tools, planning integrations, and building a technical spec. You review and approve before any development begins.",
    duration: "Week 1–2",
    deliverable: "Technical specification doc",
  },
  {
    number: "03",
    title: "Build & Integrate",
    description:
      "We build your workflows, connect your existing tools, and implement the AI logic. Every piece is tested in isolation before it touches your live systems.",
    duration: "Week 2–4",
    deliverable: "Staging environment ready",
  },
  {
    number: "04",
    title: "Deploy & Scale",
    description:
      "We launch your automations with full monitoring in place. After go-live, we track performance, optimize based on real data, and help you expand automation to new areas of the business.",
    duration: "Week 4+",
    deliverable: "Live system + monthly reports",
  },
];

export function Process() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-[#EFF6FF] rounded-full blur-3xl opacity-70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <SectionLabel className="justify-center mb-5">How We Work</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F172A] mb-5 tracking-tight">
            From audit to live system
            <br />
            <span className="text-gradient">in under 30 days</span>
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto leading-relaxed">
            A structured, transparent process with clear deliverables at every stage. No black boxes. No scope creep. Just results.
          </p>
        </FadeIn>

        {/* Desktop timeline */}
        <div className="hidden lg:block relative mb-12">
          {/* Connecting line */}
          <div className="absolute top-10 left-[calc(12.5%)] right-[calc(12.5%)] h-[2px] bg-gradient-to-r from-[#E2E8F0] via-[#2563eb] to-[#E2E8F0]" />

          <StaggerChildren className="grid grid-cols-4 gap-6" staggerDelay={0.15}>
            {steps.map((step, index) => (
              <StaggerItem key={step.number}>
                <div className="flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className="relative mb-6 z-10">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-all duration-300"
                      style={{
                        background: index < 2 ? "#2563eb" : "white",
                        borderColor: index < 2 ? "#2563eb" : "#E2E8F0",
                        boxShadow: index < 2 ? "0 4px 14px rgba(37,99,235,0.3)" : "0 2px 8px rgba(0,0,0,0.05)",
                      }}
                    >
                      <span
                        className="text-xl font-bold"
                        style={{ color: index < 2 ? "white" : "#94A3B8" }}
                      >
                        {step.number}
                      </span>
                    </div>
                    <div
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap"
                      style={{
                        background: index < 2 ? "#EFF6FF" : "#F8FAFC",
                        color: index < 2 ? "#2563eb" : "#94A3B8",
                        borderColor: index < 2 ? "#BFDBFE" : "#E2E8F0",
                      }}
                    >
                      {step.duration}
                    </div>
                  </div>

                  <h3 className="text-[17px] font-bold text-[#0F172A] mb-3 mt-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#64748b] leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#475569] bg-[#F8FAFC] border border-[#E2E8F0] rounded-full px-3 py-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    {step.deliverable}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>

        {/* Mobile steps */}
        <div className="lg:hidden space-y-5 mb-12">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.1}>
              <div className="flex gap-5 p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
                  style={{
                    background: index < 2 ? "#2563eb" : "white",
                    color: index < 2 ? "white" : "#94A3B8",
                    border: `2px solid ${index < 2 ? "#2563eb" : "#E2E8F0"}`,
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-[16px] font-bold text-[#0F172A]">{step.title}</h3>
                    <span className="text-xs text-[#2563eb] font-medium">{step.duration}</span>
                  </div>
                  <p className="text-sm text-[#64748b] leading-relaxed mb-2.5">{step.description}</p>
                  <div className="text-xs text-[#475569] font-medium">✓ {step.deliverable}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center">
          <Button href="/book-call" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
            Start With a Free Audit
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
