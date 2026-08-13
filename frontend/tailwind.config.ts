import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#A3D3E1", hover: "#8FC5D5", light: "#E8F5F8", dark: "#6FAFBE" },
        ai: { DEFAULT: "#6FAFBE", light: "#E8F5F8", border: "#C5E3EA" },
        app: {
          bg: "#F8FAFB",
          surface: "#FFFFFF",
          surface2: "#F1F6F7",
          text: "#26363B",
          muted: "#66777C",
          quiet: "#94A3A8",
          border: "#DCE8EB",
          disabled: "#C7D4D8"
        },
        background: "#F8FAFB",
        surface: { DEFAULT: "#FFFFFF", secondary: "#F1F6F7" },
        text: { primary: "#26363B", secondary: "#66777C", muted: "#94A3A8" },
        border: "#DCE8EB",
        disabled: "#C7D4D8",
        success: { DEFAULT: "#7BC9A5", light: "#EAF8F1" },
        warning: { DEFAULT: "#F4D27A", light: "#FFF8E5" },
        accent: { DEFAULT: "#F3A69B", light: "#FFF0EE" }
      },
      boxShadow: {
        soft: "0 8px 24px rgba(38, 54, 59, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
