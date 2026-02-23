import Link from "next/link";
import { Twitter, Linkedin, Youtube, Mail } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Workflow Automation", href: "/services#workflow" },
    { label: "AI Chatbots", href: "/services#chatbots" },
    { label: "Data Pipeline", href: "/services#data" },
    { label: "CRM Integration", href: "/services#crm" },
    { label: "Marketing Automation", href: "/services#marketing" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/about#careers" },
  ],
  Resources: [
    { label: "AI Workflow Audit", href: "/book-call" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  {
    label: "Twitter / X",
    href: "https://twitter.com/mindwaveai",
    icon: Twitter,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/mindwaveai",
    icon: Linkedin,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@mindwaveai",
    icon: Youtube,
  },
  {
    label: "Email",
    href: "mailto:hello@mindwaveai.co",
    icon: Mail,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 bg-[#2563eb] rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    fill="white"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                MindWave<span className="text-[#60a5fa]">AI</span>
              </span>
            </Link>
            <p className="text-[#94A3B8] text-[15px] leading-relaxed mb-6 max-w-xs">
              We build AI automation systems that save businesses 10+ hours per week and generate measurable ROI in 30 days.
            </p>
            <div className="flex items-center gap-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-[#64748b] hover:text-white hover:bg-[#1e293b] transition-all duration-200"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#64748b] text-[15px] hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#475569] text-sm">
            © {year} MindWaveAI. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
            <span className="text-[#475569] text-sm ml-1">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
