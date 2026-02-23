"use client";

import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Clock, AlertTriangle, TrendingDown, Users } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "You're paying humans to do robot work",
    description:
      "Your team spends hours every week on data entry, copy-paste tasks, and chasing down approvals — work that should take zero human hours.",
    stat: "23 hrs",
    statLabel: "wasted per employee/week on manual tasks",
  },
  {
    icon: AlertTriangle,
    title: "Disconnected tools create costly blind spots",
    description:
      "Your CRM doesn't talk to your email. Your invoicing doesn't connect to your project management. Every gap is a place where revenue leaks.",
    stat: "$50K+",
    statLabel: "average annual cost of tool fragmentation",
  },
  {
    icon: TrendingDown,
    title: "Slow follow-up means lost deals",
    description:
      "Leads come in from five different channels. Someone manually checks them — eventually. By then, your competitor already closed the deal.",
    stat: "78%",
    statLabel: "of leads go cold from slow response times",
  },
  {
    icon: Users,
    title: "Scaling means hiring, not smarter systems",
    description:
      "Every time the business grows, you hire more people to handle more volume. You're building a headcount problem instead of a scalable system.",
    stat: "3x",
    statLabel: "more expensive than automating the same work",
  },
];

export function Problem() {
  return (
    <section className="py-20 lg:py-28 bg-[#0F172A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-10" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563eb] opacity-[0.05] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <SectionLabel className="justify-center mb-5">
            <span style={{ color: "#60a5fa" }}>The Problem</span>
          </SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white mb-5 tracking-tight">
            Your team is working harder than they should.
            <br />
            <span className="text-[#60a5fa]">Your systems are to blame.</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto leading-relaxed">
            Most growing businesses hit the same wall: their operations are held together by manual work, spreadsheets, and hope. That ceiling is costing you real money.
          </p>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.12}>
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <StaggerItem key={problem.title}>
                <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 h-full hover:border-[#2563eb]/40 hover:bg-[#1e293b]/80 transition-all duration-300 group">
                  <div className="w-11 h-11 bg-[#2563eb]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#2563eb]/20 transition-colors">
                    <Icon size={22} className="text-[#60a5fa]" />
                  </div>
                  <h3 className="text-white font-semibold text-[17px] mb-3 leading-snug">
                    {problem.title}
                  </h3>
                  <p className="text-[#64748b] text-sm leading-relaxed mb-5">
                    {problem.description}
                  </p>
                  <div className="pt-4 border-t border-[#334155]">
                    <div className="text-2xl font-bold text-[#2563eb] mb-0.5">
                      {problem.stat}
                    </div>
                    <div className="text-xs text-[#64748b] leading-snug">
                      {problem.statLabel}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
