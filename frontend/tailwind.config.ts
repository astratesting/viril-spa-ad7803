import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B",
        charcoal: "#1C1C1E",
        "charcoal-soft": "#161618",
        brass: "#C5A55A",
        "brass-bright": "#D8B978",
        burgundy: "#4B2A2C",
        ivory: "#F5F0EB",
        "warm-white": "#FAF8F5",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        satoshi: ["Satoshi", "system-ui", "sans-serif"],
        archivo: ['"Archivo Black"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
