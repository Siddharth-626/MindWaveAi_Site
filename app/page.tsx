import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "MindWaveAI — AI Automation Agency | Save 10+ Hours/Week",
  description:
    "MindWaveAI builds custom AI automation systems that eliminate manual work, connect your tools, and generate measurable ROI in 30 days. Book your free AI Workflow Audit today.",
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MindWaveAI",
  description:
    "AI automation agency that builds custom workflow automation, AI chatbots, and intelligent systems for growing businesses.",
  url: "https://mindwaveai.co",
  sameAs: [
    "https://twitter.com/mindwaveai",
    "https://linkedin.com/company/mindwaveai",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  priceRange: "$$",
  serviceType: "AI Automation",
  areaServed: "Worldwide",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "42",
    bestRating: "5",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Hero />
      <Problem />
      <CTA
        variant="minimal"
        title="Ready to see what automation can do for your business?"
        subtitle="Book a free 30-minute AI Workflow Audit — no commitment, just clarity."
      />
      <Solution />
      <Services />
      <Process />
      <CaseStudies />
      <CTA
        variant="minimal"
        title="Join 40+ businesses that run smarter with MindWaveAI"
        subtitle="Your free audit takes 30 minutes and comes with a custom automation roadmap."
      />
      <Testimonials />
      <CTA />
    </>
  );
}
