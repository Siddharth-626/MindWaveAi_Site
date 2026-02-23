"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CalendarDays } from "lucide-react";

interface CTAProps {
  variant?: "primary" | "minimal";
  title?: string;
  subtitle?: string;
}

export function CTA({
  variant = "primary",
  title = "Ready to reclaim your team's time?",
  subtitle = "Book a free 30-minute AI Workflow Audit. We'll map your biggest automation opportunities and show you exactly what's possible — no commitment required.",
}: CTAProps) {
  if (variant === "minimal") {
    return (
      <section className="py-14 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-1">{title}</h3>
              <p className="text-[#475569] text-sm">{subtitle}</p>
            </div>
            <Button href="/book-call" variant="primary" size="md" icon={<ArrowRight size={16} />} className="flex-shrink-0">
              Book Free Audit
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0F172A]" />
      <div className="absolute inset-0 dot-pattern opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563eb] opacity-10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#2563eb]/10 border border-[#2563eb]/20 rounded-full px-4 py-2 mb-8">
            <CalendarDays size={15} className="text-[#60a5fa]" />
            <span className="text-sm font-medium text-[#60a5fa]">Free · No commitment · 30 minutes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white mb-6 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-lg text-[#94A3B8] leading-relaxed mb-10 max-w-xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                href="/book-call"
                variant="primary"
                size="lg"
                icon={<ArrowRight size={18} />}
                className="shadow-blue-lg"
              >
                Book Your Free AI Audit
              </Button>
            </motion.div>
            <Button href="/contact" variant="outline" size="lg" className="border-white/20 text-white hover:border-white/40 hover:bg-white/5">
              Talk to Our Team
            </Button>
          </div>

          {/* Trust signals */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 pt-10 border-t border-[#1e293b]">
            {[
              { icon: "🔒", text: "No long-term contracts" },
              { icon: "⚡", text: "Results in 30 days" },
              { icon: "🎯", text: "100% custom to your business" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-[#64748b]">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
