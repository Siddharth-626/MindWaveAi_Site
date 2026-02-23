import type { Metadata } from "next";
import { FadeIn } from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "MindWaveAI's terms of service — the terms and conditions governing use of our website and services.",
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  const lastUpdated = "January 15, 2025";

  return (
    <section className="pt-28 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#0F172A] mb-3">Terms of Service</h1>
            <p className="text-sm text-[#94A3B8]">Last updated: {lastUpdated}</p>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "1. Acceptance of Terms",
                content: `By accessing or using MindWaveAI's website at mindwaveai.co and engaging with our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. These terms apply to all visitors, users, and clients of MindWaveAI.`,
              },
              {
                title: "2. Services",
                content: `MindWaveAI provides AI automation consulting, design, and implementation services to businesses. Specific services, deliverables, timelines, and fees are defined in individual client agreements or statements of work (SOWs). These Terms of Service govern general use of our website and form a baseline framework for our client relationships.`,
              },
              {
                title: "3. Client Agreements",
                content: `All service engagements are governed by a separate client agreement or SOW that specifies scope, deliverables, payment terms, and project timelines. In the event of any conflict between these Terms and a specific client agreement, the client agreement shall take precedence for matters specifically addressed therein.`,
              },
              {
                title: "4. Intellectual Property",
                content: `All custom automation systems, code, workflows, and implementations created for clients under a paid engagement become the intellectual property of the client upon full payment, unless otherwise specified in the project agreement. MindWaveAI retains the right to reference engagements as portfolio work (with client approval) and to reuse general methodologies and non-proprietary code patterns.`,
              },
              {
                title: "5. Confidentiality",
                content: `MindWaveAI treats all client business information, processes, data, and systems as confidential. We will not disclose proprietary client information to third parties without explicit written consent, except as required by law. We expect clients to likewise maintain confidentiality regarding our proprietary methodologies and tools.`,
              },
              {
                title: "6. Payment Terms",
                content: `Payment terms are specified in individual project agreements. Unless otherwise agreed, projects require a 50% deposit prior to commencement and 50% upon project completion. Late payments may incur interest at 1.5% per month. We reserve the right to pause work on projects with outstanding invoices over 14 days past due.`,
              },
              {
                title: "7. Limitation of Liability",
                content: `To the maximum extent permitted by law, MindWaveAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of our services. Our total liability for any claim arising from a specific engagement shall not exceed the total fees paid for that engagement.`,
              },
              {
                title: "8. Service Availability",
                content: `We build and maintain automation systems with high-reliability architecture, but we do not guarantee 100% uptime for third-party platforms and integrations used in client systems. We will make commercially reasonable efforts to maintain system availability and will communicate planned maintenance windows in advance.`,
              },
              {
                title: "9. Website Use",
                content: `You agree not to use our website for any unlawful purpose or in violation of these terms. You may not use automated systems to scrape content from our website, attempt to gain unauthorized access to any systems, or engage in any activity that could damage, disable, or impair the website.`,
              },
              {
                title: "10. Termination",
                content: `Either party may terminate an engagement with 30 days written notice. Clients are responsible for fees incurred through the termination date. Upon termination, we will deliver all work completed to date and transfer access to any systems built. MindWaveAI reserves the right to terminate access to our website for violations of these terms.`,
              },
              {
                title: "11. Governing Law",
                content: `These Terms of Service shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Delaware.`,
              },
              {
                title: "12. Changes to Terms",
                content: `We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated date. Continued use of our website or services after changes are posted constitutes acceptance of the updated terms. For material changes, we will make reasonable efforts to notify active clients directly.`,
              },
              {
                title: "13. Contact",
                content: `For questions about these Terms of Service, please contact us at legal@mindwaveai.co.`,
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-[#0F172A] mb-3">{section.title}</h2>
                <p className="text-[#475569] leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
