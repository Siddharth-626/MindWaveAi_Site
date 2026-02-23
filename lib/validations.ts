import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email is too long"),
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(150, "Company name is too long"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(val),
      "Please enter a valid phone number"
    ),
  service: z.enum(
    [
      "workflow-automation",
      "ai-chatbots",
      "data-pipeline",
      "crm-integration",
      "marketing-automation",
      "custom-ai",
      "other",
    ] as const,
    { message: "Please select a service" }
  ),
  budget: z
    .enum(["under-5k", "5k-15k", "15k-50k", "50k-plus", "not-sure"] as const)
    .optional(),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message is too long"),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
