"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";

const proofPoints = [
  "10+ hours saved per week",
  "ROI in 30 days guaranteed",
  "No long-term contracts",
];

const automationNodes = [
  { label: "Lead Capture", x: "8%", y: "20%", delay: 0 },
  { label: "CRM Sync", x: "72%", y: "12%", delay: 0.15 },
  { label: "Email Sequence", x: "82%", y: "58%", delay: 0.3 },
  { label: "Slack Alert", x: "5%", y: "70%", delay: 0.45 },
  { label: "Report Gen.", x: "42%", y: "82%", delay: 0.6 },
];

function AutomationMockup() {
  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[500px]">
      {/* Main workflow card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="absolute inset-0 bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden"
      >
        {/* Card header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-xs text-[#475569] font-medium">Workflow Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-[#2563eb] rounded-sm" />
            </div>
          </div>
        </div>

        {/* Workflow canvas */}
        <div className="relative p-6 h-[calc(100%-60px)]">
          {/* Connection lines SVG */}
          <svg
            className="absolute inset-6 w-[calc(100%-48px)] h-[calc(100%-48px)]"
            viewBox="0 0 400 300"
            fill="none"
          >
            <motion.path
              d="M 60 60 Q 140 60 200 90"
              stroke="#BFDBFE"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M 200 90 Q 280 90 320 60"
              stroke="#BFDBFE"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.0, ease: "easeInOut" }}
            />
            <motion.path
              d="M 200 90 L 200 180"
              stroke="#BFDBFE"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M 200 180 Q 100 180 60 210"
              stroke="#BFDBFE"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.4, ease: "easeInOut" }}
            />
            <motion.path
              d="M 200 180 Q 300 180 320 210"
              stroke="#BFDBFE"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.4, ease: "easeInOut" }}
            />
          </svg>

          {/* Workflow nodes */}
          {automationNodes.map((node) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + node.delay }}
              className="absolute flex flex-col items-center gap-1.5"
              style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
            >
              <div className="w-12 h-12 bg-white border-2 border-[#BFDBFE] rounded-2xl flex items-center justify-center shadow-card hover:border-[#2563eb] hover:shadow-blue transition-all duration-200 cursor-default">
                <div className="w-5 h-5 bg-[#EFF6FF] rounded-lg" />
              </div>
              <span className="text-[10px] font-semibold text-[#475569] whitespace-nowrap bg-white px-2 py-0.5 rounded-md border border-[#E2E8F0]">
                {node.label}
              </span>
            </motion.div>
          ))}

          {/* Center trigger node */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 0.7, stiffness: 200 }}
            className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
          >
            <div className="w-16 h-16 bg-[#2563eb] rounded-2xl flex items-center justify-center shadow-blue animate-pulse-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" />
              </svg>
            </div>
            <span className="text-xs font-bold text-[#0F172A] bg-white px-3 py-1 rounded-full border border-[#E2E8F0] shadow-subtle">
              MindWave Trigger
            </span>
          </motion.div>

          {/* Live metric pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-4 right-4 bg-[#0F172A] text-white px-3 py-2 rounded-xl flex items-center gap-2 shadow-lg"
          >
            <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-xs font-medium">47 tasks automated today</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#F8FAFC]" />
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2563eb] opacity-[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2563eb] opacity-[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column */}
          <div>
            {/* Top badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Badge variant="blue" dot>
                AI Automation Agency · Trusted by 40+ businesses
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] tracking-tight text-[#0F172A] mb-6"
            >
              Replace Manual Work{" "}
              <span className="text-gradient">With Intelligent</span>{" "}
              Automation
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[#475569] leading-relaxed mb-8 max-w-xl"
            >
              MindWaveAI builds custom AI systems that eliminate repetitive tasks, connect your tools, and generate measurable ROI — all without disrupting how your team works.
            </motion.p>

            {/* Proof points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              {proofPoints.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#2563eb] flex-shrink-0" />
                  <span className="text-sm font-medium text-[#475569]">{point}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                href="/book-call"
                variant="primary"
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                Book Free AI Audit
              </Button>
              <Button
                href="/case-studies"
                variant="outline"
                size="lg"
                icon={<Play size={16} />}
                iconPosition="left"
              >
                See Our Results
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center gap-4 mt-10 pt-10 border-t border-[#E2E8F0]"
            >
              <div className="flex -space-x-2.5">
                {["A", "B", "C", "D"].map((letter, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm"
                    style={{
                      background: ["#2563eb", "#0F172A", "#1d4ed8", "#334155"][i],
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[#475569]">
                  <strong className="text-[#0F172A]">4.9/5</strong> from 40+ clients
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right column — Automation Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[420px] lg:h-[520px]"
          >
            <AutomationMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
