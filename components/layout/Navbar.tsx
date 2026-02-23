"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-subtle border-b border-[#E2E8F0]"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center shadow-blue transition-all duration-200 group-hover:shadow-blue-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    fill="white"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-[#0F172A] font-bold text-lg tracking-tight">
                MindWave<span className="text-[#2563eb]">AI</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-[15px] font-medium rounded-lg transition-all duration-200",
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "text-[#2563eb] bg-[#EFF6FF]"
                      : "text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="text-[15px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors"
              >
                Get in Touch
              </Link>
              <Button href="/book-call" size="sm" variant="primary">
                Book Free Audit
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-[#475569] hover:bg-[#F8FAFC] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ top: "64px" }}
          >
            <div
              className="absolute inset-0 bg-white"
              onClick={() => setIsMobileOpen(false)}
            />
            <div className="relative bg-white border-b border-[#E2E8F0] px-4 pt-4 pb-8 shadow-lg">
              <nav className="flex flex-col gap-1 mb-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-3 text-base font-medium rounded-xl transition-all",
                      pathname === link.href
                        ? "text-[#2563eb] bg-[#EFF6FF]"
                        : "text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <Button href="/contact" variant="outline" size="md" className="w-full justify-center">
                  Get in Touch
                </Button>
                <Button href="/book-call" variant="primary" size="md" className="w-full justify-center">
                  Book Free Audit
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
