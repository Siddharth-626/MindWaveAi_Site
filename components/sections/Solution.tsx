"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Zap, RefreshCw, Shield, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Zap,
    title: "Instant task execution",
    description: "Workflows trigger automatically — no human needed to push the button.",
  },
  {
    icon: RefreshCw,
    title: "Seamless tool connectivity",
    description: "Every platform you use talks to every other. No more manual syncing.",
  },
  {
    icon: Shield,
    title: "Built-in error handling",
    description: "When something breaks, the system self-corrects and alerts the right person.",
  },
  {
    icon: TrendingUp,
    title: "Scales with your business",
    description: "Handle 10x the volume without 10x the headcount.",
  },
];

const metrics = [
  { value: "10+", label: "Hours saved per week" },
  { value: "30d", label: "Average time to positive ROI" },
  { value: "99.9%", label: "Workflow uptime" },
  { value: "40+", label: "Businesses transformed" },
];

export function Solution() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EFF6FF] rounded-full blur-3xl opacity-50 translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left */}
          <FadeIn direction="left">
            <SectionLabel className="mb-5">The Solution</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F172A] mb-6 tracking-tight leading-tight">
              AI systems that work for you{" "}
              <span className="text-gradient">24 hours a day</span>
            </h2>
            <p className="text-[#475569] text-lg leading-relaxed mb-8">
              We design, build, and deploy custom automation workflows that connect your tools, eliminate manual steps, and create a business that runs with precision — whether you&apos;re online or not.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="flex gap-3.5">
                    <div className="w-10 h-10 bg-[#EFF6FF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-[#2563eb]" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-[#0F172A] mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-[#64748b] leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button href="/services" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
              Explore Our Services
            </Button>
          </FadeIn>

          {/* Right — Metrics + Visual */}
          <FadeIn direction="right" delay={0.15}>
            <div className="relative">
              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                {metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 hover:border-[#2563eb]/30 hover:bg-white transition-all duration-300"
                  >
                    <div className="text-3xl font-bold text-[#2563eb] mb-1.5">
                      {metric.value}
                    </div>
                    <div className="text-sm text-[#64748b] font-medium">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Automation flow illustration */}
              <div className="bg-[#0F172A] rounded-2xl p-5 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-xs text-[#64748b] font-medium">
                    Automation Running · Last triggered 2m ago
                  </span>
                </div>
                {[
                  { step: "01", label: "New form submission detected", status: "done", color: "#22C55E" },
                  { step: "02", label: "Contact created in CRM", status: "done", color: "#22C55E" },
                  { step: "03", label: "Welcome email sequence started", status: "active", color: "#2563eb" },
                  { step: "04", label: "Slack notification sent to sales team", status: "pending", color: "#475569" },
                  { step: "05", label: "Deal stage set to Qualified", status: "pending", color: "#475569" },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 py-2.5 border-b border-[#1e293b] last:border-0"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: item.status === "pending" ? "transparent" : item.color + "20", border: `2px solid ${item.color}` }}
                    >
                      {item.status === "done" && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill={item.color}>
                          <path d="M20 6L9 17l-5-5" stroke={item.color} strokeWidth="3" strokeLinecap="round" fill="none" />
                        </svg>
                      )}
                      {item.status === "active" && (
                        <div className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        item.status === "pending" ? "text-[#475569]" : "text-white"
                      }`}
                    >
                      {item.step}. {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
