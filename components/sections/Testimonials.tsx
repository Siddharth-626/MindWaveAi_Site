"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "MindWaveAI didn't just automate tasks — they redesigned how our entire agency operates. We recovered 32 hours per week and reinvested that time into client work. Our margins went from 28% to 41% in three months.",
    name: "Sarah Chen",
    role: "CEO",
    company: "ReachPoint Agency",
    industry: "Marketing",
    initials: "SC",
    color: "#2563eb",
    results: ["32 hrs/week saved", "41% profit margin"],
  },
  {
    id: 2,
    quote:
      "I was skeptical about AI automation. But within 22 days of working with MindWaveAI, our fulfillment process ran itself. Errors dropped by 94%. I couldn't believe how fast it paid for itself.",
    name: "Marcus Rivera",
    role: "Head of Operations",
    company: "Nexus Commerce",
    industry: "E-Commerce",
    initials: "MR",
    color: "#0F172A",
    results: ["ROI in 22 days", "94% fewer errors"],
  },
  {
    id: 3,
    quote:
      "Our support team was burnt out. MindWaveAI built an AI assistant that handles 78% of our inbound questions with zero human input. The team now focuses on complex advisory work — which is what we hired them for.",
    name: "David Okafor",
    role: "Director of Client Success",
    company: "ClearPath Financial",
    industry: "Financial Services",
    initials: "DO",
    color: "#1d4ed8",
    results: ["78% inquiries automated", "3.2× capacity increase"],
  },
  {
    id: 4,
    quote:
      "From our first audit call, the MindWaveAI team understood our business better than any agency we'd ever worked with. They mapped our ops in a day and had automations running in under three weeks. Truly impressive.",
    name: "Aisha Patel",
    role: "COO",
    company: "Meridian Consulting",
    industry: "Consulting",
    initials: "AP",
    color: "#334155",
    results: ["Deployed in 18 days", "11 automations running"],
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () =>
    setCurrentIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setCurrentIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#EFF6FF] rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <SectionLabel className="justify-center mb-5">Client Stories</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F172A] tracking-tight">
            Don&apos;t take our word for it
          </h2>
        </FadeIn>

        {/* Featured testimonial carousel */}
        <div className="max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-8 lg:p-12"
            >
              <Quote size={36} className="text-[#BFDBFE] mb-6" />

              <blockquote className="text-xl lg:text-2xl text-[#0F172A] font-medium leading-relaxed mb-8 tracking-tight">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                    style={{ background: current.color }}
                  >
                    {current.initials}
                  </div>
                  <div>
                    <div className="font-bold text-[#0F172A]">{current.name}</div>
                    <div className="text-sm text-[#64748b]">
                      {current.role} · {current.company}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {current.results.map((result) => (
                    <span
                      key={result}
                      className="text-xs font-semibold text-[#2563eb] bg-[#EFF6FF] border border-[#BFDBFE] px-3 py-1.5 rounded-full"
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:bg-[#F8FAFC] hover:text-[#0F172A] hover:border-[#2563eb]/30 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIndex ? "24px" : "8px",
                    height: "8px",
                    background: i === currentIndex ? "#2563eb" : "#E2E8F0",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:bg-[#F8FAFC] hover:text-[#0F172A] hover:border-[#2563eb]/30 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Stats row */}
        <FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-[#0F172A] rounded-2xl p-6 lg:p-8">
            {[
              { value: "4.9/5", label: "Average client rating", sub: "across 40+ engagements" },
              { value: "97%", label: "Client retention rate", sub: "year over year" },
              { value: "$2.4M+", label: "Labor costs automated", sub: "saved for our clients" },
              { value: "30 days", label: "Average time to ROI", sub: "from project kickoff" },
            ].map((stat) => (
              <div key={stat.value} className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-[#94A3B8] mb-0.5">{stat.label}</div>
                <div className="text-xs text-[#475569]">{stat.sub}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
