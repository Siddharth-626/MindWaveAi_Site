import { Button } from "@/components/ui/Button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="text-center px-4 max-w-md">
        <div className="w-16 h-16 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold text-[#2563eb]">404</span>
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A] mb-3">Page not found</h1>
        <p className="text-[#475569] mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/" variant="primary" size="md" icon={<Home size={16} />} iconPosition="left">
            Back to Home
          </Button>
          <Button href="/contact" variant="outline" size="md" icon={<ArrowLeft size={16} />} iconPosition="left">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
