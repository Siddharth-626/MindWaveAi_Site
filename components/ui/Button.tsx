"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  external?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const variants = {
  primary:
    "bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-[0_4px_14px_0_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_0_rgba(37,99,235,0.35)]",
  secondary:
    "bg-[#0F172A] text-white hover:bg-[#1e293b] shadow-card hover:shadow-card-hover",
  outline:
    "bg-transparent text-[#0F172A] border-2 border-[#E2E8F0] hover:border-[#2563eb] hover:text-[#2563eb]",
  ghost:
    "bg-transparent text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]",
};

const sizes = {
  sm: "h-9 px-4 text-sm rounded-lg gap-1.5",
  md: "h-11 px-6 text-[15px] rounded-xl gap-2",
  lg: "h-13 px-8 text-base rounded-xl gap-2.5",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className,
  external = false,
  icon,
  iconPosition = "right",
}: ButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && iconPosition === "left" && !loading && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && !loading && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
    >
      {content}
    </motion.button>
  );
}
