import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "blue" | "dark" | "outline" | "success" | "subtle";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

const variants = {
  blue: "bg-[#EFF6FF] text-[#2563eb] border border-[#BFDBFE]",
  dark: "bg-[#0F172A] text-white border border-[#1e293b]",
  outline: "bg-transparent text-[#475569] border border-[#E2E8F0]",
  success: "bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]",
  subtle: "bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]",
};

const sizes = {
  sm: "text-xs px-2.5 py-1 rounded-full",
  md: "text-sm px-3 py-1.5 rounded-full",
};

export function Badge({
  children,
  variant = "blue",
  size = "sm",
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full flex-shrink-0",
            variant === "blue" && "bg-[#2563eb]",
            variant === "dark" && "bg-white",
            variant === "success" && "bg-[#16A34A]",
            (variant === "outline" || variant === "subtle") && "bg-[#94A3B8]"
          )}
        />
      )}
      {children}
    </span>
  );
}
