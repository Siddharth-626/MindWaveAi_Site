"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { contactSchema, type ContactFormValues } from "@/lib/validations";
import { CheckCircle2, Mail, Phone, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const serviceOptions = [
  { value: "workflow-automation", label: "Workflow Automation" },
  { value: "ai-chatbots", label: "AI Chatbots & Assistants" },
  { value: "data-pipeline", label: "Data Pipeline Automation" },
  { value: "crm-integration", label: "CRM & Sales Automation" },
  { value: "marketing-automation", label: "Marketing Automation" },
  { value: "custom-ai", label: "Custom AI Development" },
  { value: "other", label: "General Inquiry / Not Sure" },
];

const budgetOptions = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-50k", label: "$15,000 – $50,000" },
  { value: "50k-plus", label: "$50,000+" },
  { value: "not-sure", label: "Not Sure Yet" },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@mindwaveai.co", href: "mailto:hello@mindwaveai.co" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: Clock, label: "Response Time", value: "Within 1 business day", href: null },
  { icon: MapPin, label: "Location", value: "Remote-first · US-based", href: null },
];

function InputField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
        {label}{required && <span className="text-[#EF4444] ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-[#EF4444] mt-1.5 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError: boolean) =>
  cn(
    "w-full px-4 py-3 rounded-xl border text-[#0F172A] text-[15px] bg-white transition-all duration-200 outline-none",
    "placeholder:text-[#94A3B8]",
    hasError
      ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/10"
      : "border-[#E2E8F0] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10"
  );

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Submission failed");
      }

      setSubmitStatus("success");
      reset();
    } catch (err) {
      console.error("Contact form error:", err);
      setSubmitStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#F8FAFC] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <SectionLabel className="justify-center mb-5">Get In Touch</SectionLabel>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">
              Let&apos;s talk about{" "}
              <span className="text-gradient">your automation</span>
            </h1>
            <p className="text-[#475569] text-lg max-w-xl mx-auto">
              Tell us about your business and what you&apos;d like to automate. We&apos;ll be in touch within one business day.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info sidebar */}
            <FadeIn direction="left" className="lg:col-span-1">
              <div className="space-y-5">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-center gap-4 p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
                      <div className="w-10 h-10 bg-[#EFF6FF] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-[#2563eb]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-[#0F172A] font-medium text-sm">{item.value}</p>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a key={item.label} href={item.href} className="block hover:scale-[1.01] transition-transform">
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}

                <div className="p-5 bg-[#0F172A] rounded-2xl">
                  <h3 className="text-white font-bold mb-2">Prefer a quick call?</h3>
                  <p className="text-[#94A3B8] text-sm mb-4 leading-relaxed">
                    Book a free 30-minute AI Workflow Audit directly on our calendar.
                  </p>
                  <Button href="/book-call" variant="primary" size="sm" className="w-full justify-center">
                    Book Free Audit
                  </Button>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn direction="right" delay={0.1} className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {submitStatus === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center p-12 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl h-full min-h-[400px]"
                  >
                    <div className="w-16 h-16 bg-[#22C55E] rounded-2xl flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Message received!</h3>
                    <p className="text-[#475569] mb-6 max-w-sm">
                      Thank you for reaching out. We&apos;ll review your message and get back to you within 1 business day.
                    </p>
                    <Button href="/book-call" variant="primary" size="md">
                      Book Your Free Audit
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    {/* Honeypot — hidden from real users */}
                    <input
                      type="text"
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("honeypot")}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField label="Full Name" required error={errors.name?.message}>
                        <input
                          {...register("name")}
                          placeholder="John Smith"
                          className={inputClass(!!errors.name)}
                        />
                      </InputField>
                      <InputField label="Work Email" required error={errors.email?.message}>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="john@company.com"
                          className={inputClass(!!errors.email)}
                        />
                      </InputField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField label="Company Name" required error={errors.company?.message}>
                        <input
                          {...register("company")}
                          placeholder="Acme Inc."
                          className={inputClass(!!errors.company)}
                        />
                      </InputField>
                      <InputField label="Phone Number" error={errors.phone?.message}>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className={inputClass(!!errors.phone)}
                        />
                      </InputField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField label="Service Interest" required error={errors.service?.message}>
                        <select
                          {...register("service")}
                          className={cn(inputClass(!!errors.service), "cursor-pointer")}
                        >
                          <option value="">Select a service...</option>
                          {serviceOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </InputField>
                      <InputField label="Budget Range" error={errors.budget?.message}>
                        <select
                          {...register("budget")}
                          className={cn(inputClass(!!errors.budget), "cursor-pointer")}
                        >
                          <option value="">Select a range...</option>
                          {budgetOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </InputField>
                    </div>

                    <InputField label="Tell us about your project" required error={errors.message?.message}>
                      <textarea
                        {...register("message")}
                        rows={5}
                        placeholder="Describe what you'd like to automate, the tools you currently use, and any specific pain points..."
                        className={cn(inputClass(!!errors.message), "resize-none")}
                      />
                    </InputField>

                    {submitStatus === "error" && (
                      <div className="p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-xl text-sm text-[#EF4444]">
                        Something went wrong. Please try again or email us directly at hello@mindwaveai.co
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={submitStatus === "loading"}
                      disabled={submitStatus === "loading"}
                      className="w-full justify-center"
                    >
                      {submitStatus === "loading" ? "Sending..." : "Send Message"}
                    </Button>

                    <p className="text-xs text-[#94A3B8] text-center">
                      By submitting this form, you agree to our{" "}
                      <a href="/privacy-policy" className="text-[#2563eb] hover:underline">Privacy Policy</a>.
                      We never share your information.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
