import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://mindwaveai.co"
  ),
  title: {
    default: "MindWaveAI — AI Automation Agency",
    template: "%s | MindWaveAI",
  },
  description:
    "MindWaveAI builds custom AI automation systems that save businesses 10+ hours per week and generate ROI in 30 days. Workflow automation, AI chatbots, CRM integration, and more.",
  keywords: [
    "AI automation agency",
    "workflow automation",
    "AI chatbots",
    "business automation",
    "CRM automation",
    "marketing automation",
    "AI systems",
    "process automation",
  ],
  authors: [{ name: "MindWaveAI", url: "https://mindwaveai.co" }],
  creator: "MindWaveAI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mindwaveai.co",
    siteName: "MindWaveAI",
    title: "MindWaveAI — AI Automation Agency",
    description:
      "We build AI systems that save businesses 10+ hours per week and generate ROI in 30 days.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MindWaveAI — AI Automation Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MindWaveAI — AI Automation Agency",
    description:
      "We build AI systems that save businesses 10+ hours per week and generate ROI in 30 days.",
    images: ["/og-image.png"],
    creator: "@mindwaveai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased bg-white text-[#0F172A]"
        style={{ fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif" }}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
