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
        "pink-soft": "var(--pink-soft)",
        "pink-accent": "var(--pink-accent)",
        "pink-dark": "var(--pink-dark)",
        teal: "var(--teal)",
        cream: "var(--cream)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)"],
        mono: ["var(--font-dm-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
