import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div className="w-6 h-[2px] bg-[#2563eb] rounded-full" />
      <span className="text-sm font-semibold text-[#2563eb] uppercase tracking-wider">
        {children}
      </span>
    </div>
  );
}
