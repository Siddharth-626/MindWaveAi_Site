import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        dark: {
          DEFAULT: "#0F172A",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        surface: "#F8FAFC",
      },
      fontFamily: {
        sans: ["Inter", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      spacing: {
        section: "5rem",
        "section-lg": "7.5rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.04)",
        card: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)",
        "card-hover": "0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.08)",
        blue: "0 4px 14px 0 rgba(37,99,235,0.25)",
        "blue-lg": "0 8px 25px 0 rgba(37,99,235,0.3)",
      },
      backgroundImage: {
        "gradient-blue": "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
        "gradient-subtle": "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        "gradient-hero": "radial-gradient(ellipse at 60% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)",
        "gradient-cta": "linear-gradient(135deg, #0F172A 0%, #1e293b 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-blue": "pulseBlue 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseBlue: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(37,99,235,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(37,99,235,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
