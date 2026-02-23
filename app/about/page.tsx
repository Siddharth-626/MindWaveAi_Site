import type { Metadata } from "next";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { ArrowRight, Target, Users, Zap, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About MindWaveAI — The Team Behind the Automation",
  description:
    "Learn about MindWaveAI — who we are, what we stand for, and why we're building AI automation systems that actually move the needle for growing businesses.",
};

const values = [
  {
    icon: Target,
    title: "Results before everything",
    description:
      "We don't measure success by delivery dates or feature counts. We measure it by how much time and money we save our clients. Every decision we make is filtered through that lens.",
  },
  {
    icon: Zap,
    title: "Speed with substance",
    description:
      "We move fast — but not at the cost of quality. Our systems are built to last, documented thoroughly, and maintained long after launch day.",
  },
  {
    icon: Users,
    title: "True partnership",
    description:
      "We don't hand off and disappear. We embed into your team, learn how you operate, and build systems that genuinely fit your business — not a template.",
  },
  {
    icon: Heart,
    title: "Honest by default",
    description:
      "If automation can't solve your problem, we'll tell you. If a simpler approach exists, we'll recommend it. Our reputation is worth more than any single engagement.",
  },
];

const team = [
  {
    name: "Alex Morgan",
    role: "Co-Founder & CEO",
    bio: "Former operations director at a Series B SaaS company. Built and scaled ops teams that processed $50M+ in ARR. Now obsessed with making automation accessible for every business.",
    initials: "AM",
    color: "#2563eb",
  },
  {
    name: "Jordan Kim",
    role: "Co-Founder & CTO",
    bio: "ML engineer with 8 years building production AI systems. Previously at two AI startups and a FAANG company. Believes the best AI is the one you never have to think about.",
    initials: "JK",
    color: "#0F172A",
  },
  {
    name: "Priya Sharma",
    role: "Head of Automation",
    bio: "Certified in Make, Zapier, and N8N. Has architected over 200 automation workflows for clients across 12 industries. The person who turns a messy process into an elegant system.",
    initials: "PS",
    color: "#1d4ed8",
  },
  {
    name: "Carlos Mendes",
    role: "Lead AI Engineer",
    bio: "Specialized in LLM integration and RAG architecture. Built chatbots that handle millions of monthly conversations for enterprise clients. Speaks 4 programming languages and 3 human ones.",
    initials: "CM",
    color: "#334155",
  },
];

const milestones = [
  { year: "2022", event: "MindWaveAI founded by Alex and Jordan after experiencing automation gaps firsthand in enterprise environments" },
  { year: "2023", event: "First 10 clients onboarded. Saved a combined 1,200+ hours in the first year. Team grew to 6 people" },
  { year: "2024", event: "Expanded to AI chatbot and custom development services. Crossed $1M in client savings delivered" },
  { year: "2025", event: "40+ businesses served across 15 industries. $2.4M in documented labor costs eliminated for clients" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563eb] opacity-10 blur-3xl rounded-full" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <SectionLabel className="justify-center mb-5">
              <span style={{ color: "#60a5fa" }}>Who We Are</span>
            </SectionLabel>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white mb-6 tracking-tight">
              We built the agency we{" "}
              <span style={{ color: "#60a5fa" }}>always wanted</span> to work with
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-10">
              MindWaveAI was founded by operators who lived the pain of broken workflows. We build AI systems that actually work — because we know what failing systems cost.
            </p>
            <Button href="/book-call" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
              Work With Us
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <SectionLabel className="mb-5">Our Mission</SectionLabel>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-6 tracking-tight">
                Make AI automation accessible to every serious business — not just enterprises
              </h2>
              <p className="text-[#475569] leading-relaxed mb-6">
                Large companies have had AI and automation for years. The Fortune 500 has entire engineering teams dedicated to building these systems. Meanwhile, the businesses that need them most — the growing SMBs and agencies — have been left with duct-tape solutions and spreadsheets.
              </p>
              <p className="text-[#475569] leading-relaxed">
                We started MindWaveAI to close that gap. We bring enterprise-grade automation thinking to teams of 5 to 500 people — with the speed, transparency, and real-world results that matter to people who are actually running the business.
              </p>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "40+", label: "Clients served", sub: "across 15 industries" },
                  { value: "$2.4M+", label: "Labor costs eliminated", sub: "for our clients" },
                  { value: "97%", label: "Client retention", sub: "year over year" },
                  { value: "30 days", label: "Avg. time to ROI", sub: "from project start" },
                ].map((stat) => (
                  <div key={stat.value} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6">
                    <div className="text-3xl font-bold text-[#2563eb] mb-1">{stat.value}</div>
                    <div className="text-sm font-semibold text-[#0F172A] mb-0.5">{stat.label}</div>
                    <div className="text-xs text-[#94A3B8]">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel className="justify-center mb-5">Our Values</SectionLabel>
            <h2 className="text-3xl lg:text-[40px] font-bold text-[#0F172A] tracking-tight">
              How we operate, every single day
            </h2>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title}>
                  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 h-full">
                    <div className="w-11 h-11 bg-[#EFF6FF] rounded-xl flex items-center justify-center mb-4">
                      <Icon size={22} className="text-[#2563eb]" />
                    </div>
                    <h3 className="font-bold text-[#0F172A] mb-3">{value.title}</h3>
                    <p className="text-sm text-[#64748b] leading-relaxed">{value.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel className="justify-center mb-5">The Team</SectionLabel>
            <h2 className="text-3xl lg:text-[40px] font-bold text-[#0F172A] tracking-tight">
              The people behind your automation
            </h2>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 h-full text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white text-lg mx-auto mb-4"
                    style={{ background: member.color }}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-bold text-[#0F172A] mb-0.5">{member.name}</h3>
                  <p className="text-sm text-[#2563eb] font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-[#64748b] leading-relaxed">{member.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel className="justify-center mb-5">
              <span style={{ color: "#60a5fa" }}>Our Story</span>
            </SectionLabel>
            <h2 className="text-3xl lg:text-[40px] font-bold text-white tracking-tight">
              From idea to 40+ clients served
            </h2>
          </FadeIn>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, i) => (
              <FadeIn key={milestone.year} delay={i * 0.12}>
                <div className="flex gap-6 mb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#2563eb] rounded-xl flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                      {milestone.year}
                    </div>
                    {i < milestones.length - 1 && (
                      <div className="w-[2px] h-full mt-2 bg-[#1e293b]" />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="text-[#94A3B8] leading-relaxed pt-3">{milestone.event}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
