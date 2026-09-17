import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        forest: {
          50: "#f2f8f5",
          100: "#dcefe7",
          200: "#b8ddcf",
          300: "#8bc4af",
          400: "#56a384",
          500: "#318064",
          600: "#1b6b50",
          700: "#145a43",
          800: "#0b3d2e",
          900: "#073529",
          950: "#062e24",
        },
      },
    },
  },
  plugins: [],
};

export default config;
