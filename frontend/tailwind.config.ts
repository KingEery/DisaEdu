import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
      },
      colors: {
        brand: { DEFAULT: "#0071ff", hover: "#005bb5", light: "#e6f0ff", dark: "#003d82" },
        ai: { DEFAULT: "#67c1e9", light: "#f0f8fb", border: "#b3e0f4" },
        app: {
          bg: "#F9FAFB",
          surface: "#FFFFFF",
          surface2: "#F3F4F6",
          text: "#1F2937",
          muted: "#6B7280",
          quiet: "#9CA3AF",
          border: "#E5E7EB",
          disabled: "#D1D5DB"
        },
        success: { DEFAULT: "#10B981", light: "#D1FAE5" },
        warning: { DEFAULT: "#fbbb21", light: "#fff8e6" },
        accent: { DEFAULT: "#fbbb21", light: "#fff8e6" },
        yellow: { DEFAULT: "#fbbb21", light: "#fff8e6" }
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(0,0,0,0.08)",
        "soft-inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)",
        glow: "0 0 20px rgba(0, 113, 255, 0.4)",
        "glow-ai": "0 0 25px rgba(103, 193, 233, 0.5)",
        tactile: "0 6px 0 0 rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "float": "mascot-float 4.8s ease-in-out infinite",
        "wave": "mascot-wave 1.9s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".8", transform: "scale(1.05)", boxShadow: "0 0 30px rgba(103, 193, 233, 0.6)" },
        }
      }
    }
  },
  plugins: []
};

export default config;
