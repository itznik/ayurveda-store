import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
      },
      colors: {
        // NEW AYURVEDIC PALETTE
        luxury: {
          dark: "#0A1A15",      // Deepest Rainforest (Replaces Black)
          panel: "#112922",     // Slightly lighter green (For Cards/Nav)
          primary: "#3A5A40",   // Hunter Green (Main Brand Color)
          sage: "#A3B18A",      // Muted Sage (Accents)
          cream: "#DAD7CD",     // Earthy Text
          gold: "#D4AF37",      // Classic Gold (Kept for luxury touch)
        }
      },
      animation: {
        "blob": "blob 10s infinite", // Slower, more relaxing animation
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
