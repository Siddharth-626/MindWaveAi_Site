import type { Metadata } from "next";
import { FadeIn } from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "MindWaveAI's privacy policy — how we collect, use, and protect your personal information.",
  robots: { index: true, follow: false },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2025";

  return (
    <section className="pt-28 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#0F172A] mb-3">Privacy Policy</h1>
            <p className="text-sm text-[#94A3B8]">Last updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            {[
              {
                title: "1. Introduction",
                content: `MindWaveAI ("we," "our," or "us") operates the website mindwaveai.co and provides AI automation services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.`,
              },
              {
                title: "2. Information We Collect",
                content: `We collect information you provide directly to us, including: name, email address, phone number, company name, and any message content submitted through our contact forms. We also automatically collect certain technical information when you visit our website, including IP addresses, browser type, pages visited, and referral URLs. This is collected via cookies and standard web analytics tools.`,
              },
              {
                title: "3. How We Use Your Information",
                content: `We use collected information to: respond to your inquiries and service requests; send confirmation and follow-up communications; improve our website and services; analyze usage patterns and optimize user experience; comply with legal obligations. We do not sell, trade, or rent your personal information to third parties for their marketing purposes.`,
              },
              {
                title: "4. Data Storage and Security",
                content: `Your data is stored in secure, encrypted databases hosted on Supabase (PostgreSQL), which complies with SOC 2 Type II standards. We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.`,
              },
              {
                title: "5. Third-Party Services",
                content: `We use the following third-party services that may process your data: Resend (email delivery), Supabase (database), Vercel (hosting), and Calendly (appointment scheduling). Each of these services has its own privacy policy governing how they handle data. We use these services solely for legitimate business operations.`,
              },
              {
                title: "6. Cookies",
                content: `We use essential cookies to ensure proper website functionality, and analytics cookies (via privacy-respecting tools) to understand how visitors interact with our site. You may disable cookies through your browser settings, though this may affect site functionality. We do not use tracking cookies for advertising purposes.`,
              },
              {
                title: "7. Your Rights",
                content: `Depending on your location, you may have the right to: access the personal information we hold about you; request correction of inaccurate information; request deletion of your personal data; object to processing of your personal data; request restriction of processing; data portability. To exercise any of these rights, contact us at privacy@mindwaveai.co.`,
              },
              {
                title: "8. Data Retention",
                content: `We retain contact form submissions and lead data for up to 3 years for business relationship management purposes, unless you request earlier deletion. Analytics data is retained in aggregated, anonymized form. You may request deletion of your personal data at any time by emailing privacy@mindwaveai.co.`,
              },
              {
                title: "9. Children's Privacy",
                content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately and we will take steps to delete such information.`,
              },
              {
                title: "10. Changes to This Policy",
                content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date. Your continued use of our website after changes are posted constitutes your acceptance of the updated policy.`,
              },
              {
                title: "11. Contact Us",
                content: `If you have questions about this Privacy Policy or our data practices, please contact us at: privacy@mindwaveai.co or by mail at MindWaveAI, [Address on file]. We will respond to privacy inquiries within 30 days.`,
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
