import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAFA",          // білий фон
        surface: "#FFFFFF",     // білі картки
        accent: "#FACC15",      // жовтий accent (Tailwind yellow-400)
        "accent-hover": "#EAB308", // yellow-500
        "accent-soft": "#FEF9C3", // yellow-100 для chips
        text: "#0A0A0A",        // чорний текст
        "text-muted": "#737373", // сірий другорядний
        border: "#E5E5E5",      // сірий border
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        iceland: ["Iceland", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
